import axios from "axios";

export async function GetVideos(jwt_id) {
  if (!jwt_id) {
    console.error("User not logged in");
    throw new Error("User not logged in");
  }

  const getVideosEndpoint = `${process.env.REACT_APP_STORAGE_SERVICE}/api/videos`;

  try {
    const response = await axios.get(getVideosEndpoint, {
      headers: {
        Authorization: `Bearer ${jwt_id}`, // Send the JWT for authentication
      },
    });
    if (response.status !== 200) {
      throw new Error(response.data.message || "Something went wrong.");
    }
    
    return response.data;
  } catch (error) {
    alert(`Error: ${error.response?.data?.message || error.message}`);
  }
}
