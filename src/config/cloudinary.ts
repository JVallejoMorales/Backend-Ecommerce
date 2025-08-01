import { v2 as cloudinary } from 'cloudinary';
import { config as dotenvconfig } from 'dotenv';

dotenvconfig({ path: '.env.development' });

export const CloudinaryConfig = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  },
};
