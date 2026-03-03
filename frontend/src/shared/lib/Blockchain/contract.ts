import axios from "axios";

export async function getContractAddress(): Promise<string> {
  const { data } = await axios.get("/api/contract/info", {
    withCredentials: true,
  });
  return data.contractAddress as string;
}
