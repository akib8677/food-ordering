"use client"
// import { google } from 'googleapis';
// import auth from '@/libs/googleDrive';
// const fs = require('fs');

// const drive = google.drive({ version: 'v3', auth });

const UploadImage = (data) => {
  console.log(data)
  debugger
  // { name, type }
  // const fileMetadata = {
  //   name: name,
  // };

  // const media = {
  //   mimeType: type,
  //   body: fs.createReadStream(name),
  // };

  // drive.files.create(
  //   {
  //     resource: fileMetadata,
  //     media: media,
  //     fields: 'id',
  //   },
  //   (err, file) => {
  //     if (err) {
  //       console.error('Error uploading image:', err);
  //     } else {
  //       console.log('Image uploaded successfully. File ID:', file.data.id);
  //       return file
  //     }
  //   }
  // );
};

export default UploadImage;
