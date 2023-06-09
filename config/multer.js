import { Storage } from '@google-cloud/storage';

export const storage = new Storage({
  projectId: 'capstone-opet',
  keyFilename: './config/keyFile.json'
});

export const bucket = storage.bucket('bucket_for_pet_photos');