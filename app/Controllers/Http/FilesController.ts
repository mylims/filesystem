import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import DataDrive from '@ioc:DataDrive';

export default class FilesController {
  public async upload({ request, params }: HttpContextContract) {
    if (!request.hasValidSignature()) return { error: 'url not valid' };

    const { filename } = params;
    if (!filename) return { error: 'filename is required' };

    request.multipart.onFile(filename, {}, async (file) => {
      await DataDrive.drive('./data').put(filename, file);
    });
    await request.multipart.process();

    return { data: `${filename} uploaded` };
  }
}
