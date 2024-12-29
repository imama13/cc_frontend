import axios from "axios";

export async function GetStorageInfo(username) {
  // get username
  
  if (!username) {
    console.error("User not logged in");
    throw new Error("User not logged in");
  }

  const getUsageEndpoint = "https://usagemnt-serv-784197206225.us-central1.run.app/api/getUsage"


  try {
    const response = await axios.get(getUsageEndpoint, {
        params: {
          "UserId": username
        }
    });
    if (response.status !== 200) {
      throw new Error(response.data.message || "Something went wrong.");
    }
    
    return response.data;
  } catch (error) {
    alert(`Error: ${error.response?.data?.message || error.message}`);
  }

}
