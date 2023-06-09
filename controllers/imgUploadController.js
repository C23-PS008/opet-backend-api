import { bucket } from "../config/multer.js";
import util from "util";

export const imgUpload = (image) => new Promise((resolve, reject) => {
    const { originalname, buffer } = image;
  
    const blob = bucket.file(originalname.replace(/ /g, "_"))
    const blobStream = blob.createWriteStream({
      resumable: false
    });
  
    blobStream.on('finish', () => {
      const publicUrl = util.format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );
      resolve(publicUrl);
    })
    .on('error', () => {
        reject(`Unable to upload image, something went wrong`);
    })
    .end(buffer);
  });