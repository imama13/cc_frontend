import axios from "axios";

export async function deleteVideo(jwt_id, videoId) {
  const apiUrl = `https://stor-serv-784197206225.us-central1.run.app/api/videos/${videoId}`;
  try {
    const response = await axios.delete(apiUrl, {
      headers: {
        Authorization: `Bearer ${jwt_id}`, // Send the JWT for authentication
      },
    });

    return response.data; // Return the response data for further handling
  } catch (error) {
    console.error('Error deleting video:', error.response?.data || error.message);
    throw error;
  }
}
