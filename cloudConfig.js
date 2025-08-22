const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY,
    
}); 

const storage = new CloudinaryStorage({
  cloudinary:cloudinary,
  params: {
    folder: 'EiraStay_DEV',
    allowedFormats: ['jpg', 'png', 'jpeg'],
  },
});

module.exports={
    cloudinary,
    storage

}