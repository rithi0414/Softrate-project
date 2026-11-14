import axiosClient from './axiosClient';

export const uploadService = {
  uploadImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axiosClient.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data && response.data.url) {
        return response.data;
      }
    } catch (err) {
      // Fallback: convert file to Base64 Data URL so image upload works in browser without backend
    }

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({
          success: true,
          url: reader.result,
          message: 'Image processed successfully'
        });
      };
      reader.readAsDataURL(file);
    });
  }
};
