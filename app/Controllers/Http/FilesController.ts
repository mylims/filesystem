import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import DataDrive from '@ioc:DataDrive';

export default class FilesController {
  public async upload({ request, params }: HttpContextContract) {
    if (!request.hasValidSignature()) return { error: 'url not valid' };

    const { filename } = params;
    if (!filename) return { error: 'filename is required' };

    const content = request.file(filename);
    if (!content) return { error: `${filename} doesn't exist` };

    const drive = DataDrive.drive('base directory');
    const data = await drive.put(filename, content);
    return { data };
  }
}
