import axios from "axios";

export async function AddVideo(jwt_id, videoFile, videoName, videoDescription) {
  if (!jwt_id){
    console.error("User not logged in");
  }
  const endpoint = `${process.env.REACT_APP_STORAGE_SERVICE}/api/upload`;

  const formData = new FormData();
  formData.append("file", videoFile);
  formData.append("title", videoName);
  formData.append("description", videoDescription);

  try {
    const response = await axios.post(endpoint, formData, {
      headers: {
        'Authorization': `Bearer ${jwt_id}`, // Send the JWT for authentication
        'Content-Type': 'multipart/form-data', // Set content type for file upload
      },
    });
    if (response.status !== 200) {
      throw new Error(response.data.message || "Something went wrong.");
    }
    return response.data; // Return the response data (e.g., URL of the uploaded video)
  } catch (error) {
    console.error('Error uploading video:', error.response?.data || error.message);
    throw error;
  }
};
