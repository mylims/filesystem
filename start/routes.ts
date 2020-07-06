/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route';

const expiresIn = '10m';

Route.get('/sign_upload/:filename', async ({ params }) => {
  return Route.makeSignedUrl('signedUpload', {
    params: { filename: params.filename },
    expiresIn,
  });
});

Route.post('/upload/:filename', 'FilesController.upload').as('signedUpload');

Route.get('/sign_download/:filename', async ({ params }) => {
  return Route.makeSignedUrl('signedDownload', {
    params: { filename: params.filename },
    expiresIn,
  });
});

Route.get('/download/:filename', 'FilesController.download').as(
  'signedDownload',
);
