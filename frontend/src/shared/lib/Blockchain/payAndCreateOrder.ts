import axios from "axios";
import { ethers } from "ethers";
import type { OrderRequest } from "../../../entities/Order/model/types";

export async function payAndCreateOrder(
  contractAddress: string,
  totalToPayEth: string,
  payload: OrderRequest,
) {
  if (!window.ethereum) throw new Error("MetaMask not found");
  if (!contractAddress) throw new Error("Contract address is empty");

  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();

  const tx = await signer.sendTransaction({
    to: contractAddress,
    value: ethers.parseEther(totalToPayEth),
  });

  await tx.wait();

  await axios.post(
    "/api/orders/checkout",
    { ...payload, txHash: tx.hash },
    { withCredentials: true },
  );

  return tx.hash;
}
