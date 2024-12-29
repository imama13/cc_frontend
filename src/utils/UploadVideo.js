import axios from "axios";

export async function UploadVideo(videoFile, videoSize, username) {
  // get username
  
  if (!username) {
    console.error("User not logged in");
    throw new Error("User not logged in");
  }

  const addUsageEndpoint = "https://usagemnt-serv-784197206225.us-central1.run.app/api/addUsage"
  const getUsageEndpoint = "https://usagemnt-serv-784197206225.us-central1.run.app/api/getUsage"

  // Make json with username and videoSize
  const metadata = {
    "user_id": username,
    "usage": videoSize,
  };

  try {
    const response = await axios.post(addUsageEndpoint, metadata, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status > 205) {
      throw new Error(response.data.message || "Something went wrong.");
    }
  } catch (error) {
    alert(`Error: ${error.response?.data?.message || error.message}`);
  }

}
