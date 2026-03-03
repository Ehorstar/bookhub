import { ethers } from "ethers";

const ABI = ["function withdraw()"];

export async function withdraw(contractAddress: string) {
  try {
    if (!window.ethereum) throw new Error("Metamask not found");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(contractAddress, ABI, signer);

    const tx = await contract.withdraw();
    await tx.wait();

    return { success: true };
  } catch (e: any) {
    console.error(e);
    return {
      success: false,
      error: e.reason || e.message || "Withdraw failed",
    };
  }
}
