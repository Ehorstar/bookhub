import { Table, Button, Space, Tag, Modal, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";
import {
  useDeleteAdminUserMutation,
  useGetAdminUsersQuery,
  type AdminUserDto,
} from "../../../features/admin/api/admin-users.api";

export default function AdminUsersPage() {
  const { data, isLoading } = useGetAdminUsersQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteAdminUserMutation();

  const handleDelete = (u: AdminUserDto) => {
    Modal.confirm({
      title: "Видалити користувача?",
      content: u.email,
      okText: "Видалити",
      okButtonProps: { danger: true, loading: isDeleting },
      cancelText: "Скасувати",
      onOk: async () => {
        try {
          await deleteUser(u.id).unwrap();
          message.success("Користувача видалено");
        } catch {
          message.error("Не вдалося видалити користувача");
        }
      },
    });
  };

  const columns: ColumnsType<AdminUserDto> = [
    { title: "Email", dataIndex: "email" },
    {
      title: "Roles",
      dataIndex: "roles",
      render: (roles: string[]) =>
        roles?.length ? (
          <Space wrap>
            {roles.map((r) => (
              <Tag key={r}>{r}</Tag>
            ))}
          </Space>
        ) : (
          "-"
        ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          loading={isDeleting}
          onClick={() => handleDelete(record)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h2 style={{ margin: 0 }}>Users</h2>
      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
}
