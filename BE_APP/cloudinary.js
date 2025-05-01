const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: 'dgqqakvn6',
  api_key: '371672855525268',
  api_secret: '2amnoQSm8MKi5-3ttS1PwwiNRkU',
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'recipe-app',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const uploadCloud = multer({ storage: storage });

module.exports = { cloudinary, uploadCloud };
