const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const cloudinaryClient = {
  async uploadImage(file) {
    try {
      if (!CLOUD_NAME || !UPLOAD_PRESET) {
        throw new Error('Cloudinary credentials not configured. Please check your .env file.');
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', UPLOAD_PRESET);
      formData.append('folder', 'gallery');

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Cloudinary error response:', errorData);
        throw new Error(errorData.error?.message || 'Upload failed');
      }

      const data = await response.json();
      
      const optimizedUrl = data.secure_url.replace('/upload/', '/upload/f_webp,q_auto/');

      return {
        success: true,
        imageUrl: optimizedUrl,
        publicId: data.public_id,
        originalUrl: data.secure_url,
      };
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw error;
    }
  },

  getOptimizedUrl(publicId) {
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_webp,q_auto/${publicId}`;
  },

  getThumbnailUrl(publicId, width = 300, height = 300) {
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_${width},h_${height},c_fill,f_webp,q_auto/${publicId}`;
  },
};
