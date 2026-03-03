import {
  Table,
  Button,
  Tag,
  Space,
  Image,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import {
  useAddAdminBookMutation,
  useDeleteAdminBookMutation,
  useGetAdminBooksQuery,
  useUpdateAdminBookMutation,
  type AdminBookListItem,
  type AdminBookUpdate,
} from "../../../features/admin/api/admin-books.api";

export default function AdminBooksPage() {
  const { data, isLoading } = useGetAdminBooksQuery();

  const [addBook, { isLoading: isCreating }] = useAddAdminBookMutation();
  const [updateBook, { isLoading: isUpdating }] = useUpdateAdminBookMutation();
  const [deleteBook, { isLoading: isDeleting }] = useDeleteAdminBookMutation();

  const [open, setOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<AdminBookListItem | null>(
    null,
  );

  const [form] = Form.useForm<AdminBookUpdate>();

  const openCreate = () => {
    setEditingBook(null);
    form.resetFields();
    form.setFieldsValue({
      categories: [],
      images: [],
      language: "UA",
      publisher: "Unknown",
      year: 2025,
      pages: 0,
      binding: "Unknown",
    });
    setOpen(true);
  };

  const openEdit = (book: AdminBookListItem) => {
    setEditingBook(book);
    form.setFieldsValue({
      title: book.title,
      author: book.author,
      description: "",
      categories: book.categories ?? [],
      price: book.price,
      oldPrice: book.oldPrice,
      stockCount: book.stockCount,
      coverImage: book.coverImage,
      images: [book.coverImage],
      language: "UA",
      publisher: "Unknown",
      year: 2025,
      pages: 0,
      binding: "Unknown",
      slug: book.slug,
    });
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setEditingBook(null);
    form.resetFields();
  };

  const handleOk = async () => {
    const values = await form.validateFields();

    const stockCount = values.stockCount ?? 0;

    const payload: AdminBookUpdate & { inStock: boolean } = {
      ...values,
      images: values.images?.length ? values.images : [values.coverImage],
      inStock: stockCount > 0,
    };

    if (editingBook) {
      await updateBook({ id: editingBook.id, body: payload }).unwrap();
    } else {
      await addBook(payload).unwrap();
    }

    closeModal();
  };

  const deleteHandler = async (id: string) => {
    if (isDeleting) return;
    await deleteBook(id).unwrap();
  };

  const columns: ColumnsType<AdminBookListItem> = [
    {
      title: "Cover",
      dataIndex: "coverImage",
      render: (url: string) => <Image src={url} width={50} />,
    },
    { title: "Title", dataIndex: "title" },
    { title: "Author", dataIndex: "author" },
    {
      title: "Price",
      render: (_, record) => (
        <>
          <strong>{record.price} ETH</strong>
          {typeof record.oldPrice === "number" && (
            <span style={{ marginLeft: 8, textDecoration: "line-through" }}>
              {record.oldPrice} ETH
            </span>
          )}
        </>
      ),
    },
    {
      title: "Stock",
      render: (_, record) =>
        record.inStock ? (
          <Tag color="green">{record.stockCount} in stock</Tag>
        ) : (
          <Tag color="red">Out of stock</Tag>
        ),
    },
    {
      title: "Genres",
      dataIndex: "categories",
      render: (cats: string[]) =>
        cats?.length ? (
          <Space wrap>
            {cats.map((c) => (
              <Tag key={c}>{c}</Tag>
            ))}
          </Space>
        ) : (
          "-"
        ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => openEdit(record)} />
          <Button
            danger
            loading={isDeleting}
            icon={<DeleteOutlined />}
            onClick={() => deleteHandler(record.id)}
          />
        </Space>
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
        <h2 style={{ margin: 0 }}>Books</h2>

        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
          Add book
        </Button>
      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingBook ? "Edit Book" : "Create Book"}
        open={open}
        onCancel={closeModal}
        onOk={handleOk}
        okText={editingBook ? "Save" : "Create"}
        confirmLoading={isCreating || isUpdating}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ categories: [], images: [] }}
        >
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="author" label="Author" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            name="categories"
            label="Genres"
            rules={[
              {
                required: true,
                type: "array",
                min: 1,
                message: "Add at least 1 genre",
              },
            ]}
          >
            <Select mode="tags" tokenSeparators={[","]} />
          </Form.Item>

          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="oldPrice" label="Old price">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="stockCount"
            label="Stock Count"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="coverImage"
            label="Cover image URL"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.List name="images">
            {(fields, { add, remove }) => (
              <>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  style={{ marginBottom: 8 }}
                >
                  Add image
                </Button>

                {fields.map((field) => (
                  <Space
                    key={field.key}
                    style={{ display: "flex", marginBottom: 8 }}
                  >
                    <Form.Item
                      {...field}
                      rules={[{ required: true }]}
                      style={{ margin: 0 }}
                    >
                      <Input placeholder="Image URL" />
                    </Form.Item>
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => remove(field.name)}
                    />
                  </Space>
                ))}
              </>
            )}
          </Form.List>

          <Form.Item
            name="language"
            label="Language"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="publisher"
            label="Publisher"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="year" label="Year" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="pages" label="Pages" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="binding"
            label="Binding"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="slug" label="Slug" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
