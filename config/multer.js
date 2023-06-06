import multer from 'multer';
import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  projectId: 'capstone-opet',
});

const bucketName = 'bucket_for_pet_photos';

const multerStorage = multer.memoryStorage();

const upload = multer({
  storage: multerStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // batasan ukuran file (opsional)
  },
});

export const fileUpload = upload.single('file');

export const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const bucket = storage.bucket(bucketName);
    const fileData = req.file;

    const blob = bucket.file(fileData.originalname);

    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: fileData.mimetype,
    });

    blobStream.on('error', (err) => {
      console.log(err);
      next(err);
    });

    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
      res.status(200).json({ url: publicUrl });
    });

    blobStream.end(fileData.buffer);
  } catch (err) {
    console.log(err);
    next(err);
  }
};