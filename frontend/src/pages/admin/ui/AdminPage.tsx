import { Tabs } from "antd";
import type { TabsProps } from "antd";
import AdminBooksPage from "../../../widgets/admin/ui/AdminBooksPage";
import AdminOrdersPage from "../../../widgets/admin/ui/AdminOrdersPage";
import AdminUsersPage from "../../../widgets/admin/ui/AdminUsersPage";
import styles from "./AdminPage.module.css";
import AdminMain from "../../../widgets/admin/ui/AdminMain";

export default function AdminPage() {
  const items: TabsProps["items"] = [
    {
      key: "main",
      label: "Main",
      children: <AdminMain />,
    },
    {
      key: "books",
      label: "Books",
      children: <AdminBooksPage />,
    },
    {
      key: "users",
      label: "Users",
      children: <AdminUsersPage />,
    },
    {
      key: "orders",
      label: "Orders",
      children: <AdminOrdersPage />,
    },
  ];

  return (
    <div className="container">
      <h1 className={styles.title}>Admin</h1>
      <Tabs defaultActiveKey="main" items={items} />
    </div>
  );
}
