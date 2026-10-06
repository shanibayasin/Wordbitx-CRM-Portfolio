import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  format: string;
  resource_type: string;
  bytes: number;
}

/**
 * Upload a base64 string or file URL to Cloudinary
 */
export async function uploadToCloudinary(
  fileData: string,
  folder: string = 'nexacrm'
): Promise<CloudinaryUploadResult> {
  requireCloudinaryConfiguration();

  const result = await cloudinary.uploader.upload(fileData, {
    folder,
    resource_type: 'auto',
  });

  return {
    secure_url: result.secure_url,
    public_id: result.public_id,
    format: result.format,
    resource_type: result.resource_type,
    bytes: result.bytes,
  };
}

/**
 * Delete a resource from Cloudinary
 */
export async function deleteFromCloudinary(publicId: string) {
  requireCloudinaryConfiguration();
  return cloudinary.uploader.destroy(publicId);
}

function requireCloudinaryConfiguration(): void {
  const missingVariables = [
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET',
  ].filter((name) => !process.env[name]);

  if (missingVariables.length > 0) {
    throw new Error(`Cloudinary is not configured. Set: ${missingVariables.join(', ')}`);
  }
}

export { cloudinary };
export default cloudinary;
