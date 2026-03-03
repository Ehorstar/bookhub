import { useEffect, useState } from "react";
import { Card, Button, Statistic, message } from "antd";
import { ethers } from "ethers";

const ABI = [
  "function getBalance() view returns (uint256)",
  "function withdraw()",
  "function owner() view returns (address)",
];

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

export default function AdminMain() {
  const [balance, setBalance] = useState("0");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderStats, setOrderStats] = useState<{
    totalOrders: number;
    averageOrderValue: number;
  } | null>(null);

  const refreshBalance = async () => {
    try {
      if (!window.ethereum) return;

      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

      const bal = await contract.getBalance();
      setBalance(ethers.formatEther(bal));
    } catch (e) {
      console.error(e);
    }
  };

  const withdraw = async () => {
    try {
      if (!window.ethereum) throw new Error("Metamask not found");

      setLoading(true);
      setStatus("Withdrawing...");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const tx = await contract.withdraw();
      await tx.wait();

      message.success("Withdraw success");
      setStatus("Withdraw success");

      await refreshBalance();
    } catch (e: any) {
      console.error(e);
      message.error(e.reason || e.message || "Withdraw failed");
      setStatus("Withdraw failed");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderStats = async () => {
    try {
      const res = await fetch("/api/admin/orders/stats", {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to load stats");

      const data = await res.json();
      setOrderStats(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    refreshBalance();
    fetchOrderStats();
  }, []);

  return (
    <Card title="Admin Dashboard">
      <Statistic title="Contract Balance (ETH)" value={balance} precision={6} />
      <div style={{ marginTop: 16 }}>
        <Button type="primary" onClick={withdraw} loading={loading}>
          Withdraw All
        </Button>
      </div>
      {orderStats && (
        <div style={{ marginTop: 24, display: "flex", gap: 40 }}>
          <Statistic title="Total Orders" value={orderStats.totalOrders} />

          <Statistic
            title="Average Order Value (ETH)"
            value={orderStats.averageOrderValue}
            precision={4}
          />
        </div>
      )}

      <div style={{ marginTop: 12, opacity: 0.7 }}>{status}</div>
    </Card>
  );
}
