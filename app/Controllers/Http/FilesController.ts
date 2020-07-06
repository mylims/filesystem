import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { StorageManager, LocalFileSystemStorage } from '@slynova/flydrive';

const storageConfig = {
  default: 'local',
  disks: {
    local: { driver: 'local', config: { root: `${process.cwd()}/data` } },

    s3: {
      driver: 's3',
      config: {
        key: 'AWS_S3_KEY',
        secret: 'AWS_S3_SECRET',
        region: 'AWS_S3_REGION',
        bucket: 'AWS_S3_BUCKET',
      },
    },
  },
};

export default class FilesController {
  private storage = new StorageManager(storageConfig).disk<
    LocalFileSystemStorage
  >('local');

  public async upload({ request, params }: HttpContextContract) {
    if (!request.hasValidSignature()) return { error: 'url not valid' };

    const { filename } = params;
    if (!filename) return { error: 'filename is required' };
    request.multipart.onFile(filename, {}, async (file) => {
      await this.storage.put(filename, file);
    });
    await request.multipart.process();

    return { data: `${filename} uploaded` };
  }

  public async download({ request, params }: HttpContextContract) {
    if (!request.hasValidSignature()) return { error: 'url not valid' };

    const { filename } = params;
    if (!filename) return { error: 'filename is required' };

    const file = await this.storage.get(filename);
    if (!file) return { error: `file ${filename} not founded` };
    return file;
  }
}
