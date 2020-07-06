import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import DataDrive from '@ioc:DataDrive';

export default class FilesController {
  private dataPath = './data';

  public async upload({ request, params }: HttpContextContract) {
    if (!request.hasValidSignature()) return { error: 'url not valid' };

    const { filename } = params;
    if (!filename) return { error: 'filename is required' };

    request.multipart.onFile(filename, {}, async (file) => {
      await DataDrive.drive(this.dataPath).put(filename, file);
    });
    await request.multipart.process();

    return { data: `${filename} uploaded` };
  }

  public async download({ request, params }: HttpContextContract) {
    if (!request.hasValidSignature()) return { error: 'url not valid' };

    const { filename } = params;
    if (!filename) return { error: 'filename is required' };

    const file = await DataDrive.drive(this.dataPath).get(filename);
    if (!file) return { error: `file ${filename} not founded` };
    return { data: file };
  }
}
