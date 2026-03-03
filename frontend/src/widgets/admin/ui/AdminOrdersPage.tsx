import { Table, Button, Modal, message, Select, Image } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";
import {
  useGetAdminOrdersQuery,
  useDeleteAdminOrderMutation,
  useUpdateAdminOrderMutation,
  type AdminOrderDto,
} from "../../../features/admin/api/admin-orders.api";

const STATUS_OPTIONS = ["Pending", "Paid", "Completed", "Cancelled"];

export default function AdminOrdersPage() {
  const { data, isLoading } = useGetAdminOrdersQuery();

  const [deleteOrder, { isLoading: isDeleting }] =
    useDeleteAdminOrderMutation();
  const [updateStatus, { isLoading: isUpdatingStatus }] =
    useUpdateAdminOrderMutation();

  const handleDelete = (order: AdminOrderDto) => {
    Modal.confirm({
      title: "Видалити замовлення?",
      content: order.id,
      okText: "Видалити",
      okButtonProps: { danger: true, loading: isDeleting },
      cancelText: "Скасувати",
      onOk: async () => {
        try {
          await deleteOrder(order.id).unwrap();
          message.success("Замовлення видалено");
        } catch {
          message.error("Помилка видалення");
        }
      },
    });
  };

  const handleChangeStatus = async (order: AdminOrderDto, status: string) => {
    try {
      await updateStatus({ id: order.id, status }).unwrap();
      message.success("Статус оновлено");
    } catch (e: any) {
      message.error(
        e?.data?.message || e?.message || "Не вдалося оновити статус",
      );
    }
  };

  const columns: ColumnsType<AdminOrderDto> = [
    { title: "Order ID", dataIndex: "id" },
    { title: "UserId", dataIndex: "userId" },
    {
      title: "Total",
      dataIndex: "totalPrice",
      render: (price: number) => <strong>{price} ETH</strong>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (_: string, record) => (
        <Select
          value={record.status}
          style={{ width: 140 }}
          options={STATUS_OPTIONS.map((s) => ({ label: s, value: s }))}
          onChange={(value) => handleChangeStatus(record, value)}
          loading={isUpdatingStatus}
        />
      ),
    },
    { title: "Created", dataIndex: "createdAt" },
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
      <h2>Orders</h2>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pagination={{ pageSize: 10 }}
        expandable={{
          expandedRowRender: (order) => (
            <Table
              rowKey={(it) => `${order.id}_${it.bookId}`}
              pagination={false}
              size="small"
              columns={[
                { title: "Book", dataIndex: "title" },
                {
                  title: "Cover",
                  dataIndex: "cover",
                  render: (url: string) => <Image src={url} width={50} />,
                },
                { title: "Qty", dataIndex: "quantity", width: 80 },
                {
                  title: "Price",
                  dataIndex: "price",
                  width: 120,
                  render: (p: number) => <strong>{p} ETH</strong>,
                },
                {
                  title: "Sum",
                  width: 120,
                  render: (_, it: any) => (
                    <strong>{it.price * it.quantity} ETH</strong>
                  ),
                },
              ]}
              dataSource={order.items || []}
            />
          ),
          rowExpandable: (order) => (order.items?.length ?? 0) > 0,
        }}
      />
    </>
  );
}
