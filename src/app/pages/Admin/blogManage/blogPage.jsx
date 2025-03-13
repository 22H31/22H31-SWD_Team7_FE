import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  message,
  Modal,
  Pagination,
  Row,
  Typography,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import "./blogPage.module.css"; // Import file CSS

const API_URL = "https://beteam720250214143214.azurewebsites.net/api/blogs";
const { confirm } = Modal;
const { Title, Paragraph } = Typography;

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [form] = Form.useForm();
  const [blogImages, setBlogImages] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Trạng thái trang hiện tại
  const pageSize = 12; // Số blog mỗi trang

  // Lấy danh sách blog từ API khi component load
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Lọc blog theo từ khóa tìm kiếm
  useEffect(() => {
    if (searchTerm) {
      setFilteredBlogs(
        blogs.filter((blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredBlogs(blogs);
    }
  }, [searchTerm, blogs]);

  // Lấy danh sách blog từ API
  const fetchBlogs = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setBlogs(data);
      setFilteredBlogs(data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách blog:", error); // Sử dụng biến error
      message.error("Lỗi khi tải danh sách blog");
    }
  };

  // Hàm thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Xử lý tạo hoặc chỉnh sửa blog
  const handleCreateOrUpdate = async (values) => {
    const method = editingBlog ? "PUT" : "POST";
    const url = editingBlog ? `${API_URL}/${editingBlog.blogId}` : API_URL;
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          subTitle: values.subTitle || "",
          content1: values.content1 || "",
          content2: values.content2 || "", // Đảm bảo content2 được gửi lên
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error("Lỗi khi lưu blog");
      message.success("Lưu blog thành công!");
      setEditingBlog(result);
      setAvatarUrl(null);
      setBlogImages([]);
      setAvatarModalVisible(true);
      setModalVisible(false);
      form.resetFields(); // Clear form data
      fetchBlogs();
    } catch (error) {
      console.error("Lỗi khi lưu blog:", error); // Sử dụng biến error
      message.error("Lỗi khi lưu blog");
    }
  };

  // Tải ảnh đại diện cho blog
  const uploadAvatar = async ({ file }) => {
    if (!editingBlog) return;
    const formData = new FormData();
    formData.append("fileDtos", file);
    await fetch(`${API_URL}/${editingBlog.blogId}/blog_avartar_images`, {
      method: "POST",
      body: formData,
    });
    message.success("Tải ảnh đại diện thành công!");
    setAvatarUrl(URL.createObjectURL(file));
  };

  // Tải ảnh blog lên API
  const uploadBlogImages = async ({ file }) => {
    if (!editingBlog || blogImages.length >= 2) {
      message.warning("Chỉ được tải lên tối đa 2 ảnh!");
      return;
    }
    const formData = new FormData();
    formData.append("fileDtos", file);
    await fetch(`${API_URL}/${editingBlog.blogId}/blog_images`, {
      method: "POST",
      body: formData,
    });
    message.success("Tải ảnh blog thành công!");
    setBlogImages((prevImages) => [...prevImages, URL.createObjectURL(file)]);
  };

  // Xóa blog
  const handleDelete = (blogId) => {
    confirm({
      title: "Bạn có chắc muốn xóa blog này?",
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        const response = await fetch(`${API_URL}/${blogId}`, { method: "DELETE" });
        if (response.ok) {
          message.success("Xóa blog thành công!");
          fetchBlogs();
        } else {
          message.error("Xóa blog thất bại!");
        }
      },
    });
  };

  // Lấy các blog theo trang hiện tại
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="pageContainer">
      <Row justify="space-between" className="header">
        <Col span={9}>
          <Input
            className="searchInput"
            placeholder="Tìm kiếm blog..."
            allowClear
            enterButton={<SearchOutlined />}
            onSearch={(value) => setSearchTerm(value)}
            style={{ width: "100%", marginBottom: "40px" }}
          />
        </Col>
        <Col span={3}>
          <Button
            className="addButton"
            type="primary"
            onClick={() => {
              setModalVisible(true);
              setEditingBlog(null);
              form.resetFields();
              setAvatarUrl(null);
              setBlogImages([]);
            }}
          >
            <PlusOutlined /> Thêm Blog
          </Button>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="blogList">
        {paginatedBlogs.map((blog) => (
          <Col key={blog.blogId} xs={24} sm={12} md={8} lg={6}>
            <Card
              className="blogItem"
              cover={
                <Image
                  alt="blog-cover"
                  src={blog.avartarBlogUrl || "https://via.placeholder.com/300"}
                  style={{
                    height: 200,
                    objectFit: "cover",
                    borderRadius: "8px 8px 0 0",
                  }}
                />
              }
              actions={[
                <Button
                  key="edit"
                  icon={<EditOutlined />}
                  onClick={() => {
                    setEditingBlog(blog);
                    setModalVisible(true);
                    form.setFieldsValue(blog);
                  }}
                />,
                <Button
                  key="delete"
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(blog.blogId)}
                  danger
                />,
              ]}
            >
              <Card.Meta
                title={<Title level={4}>{blog.title}</Title>}
                description={
                  <>
                    <Paragraph ellipsis={{ rows: 2 }}>{blog.subTitle}</Paragraph>
                    <Paragraph type="secondary">
                      {new Date(blog.blogCreatedAt).toLocaleDateString()}
                    </Paragraph>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredBlogs.length}
        onChange={handlePageChange}
        showSizeChanger={false}
        style={{ textAlign: "center", marginTop: 20 }}
      />

      {/* Modals for handling form and image uploads */}
      {/* Popup thêm/sửa blog */}
      <Modal
        title={editingBlog ? "Chỉnh sửa Blog" : "Thêm Blog"}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
        width={800}
        footer={[
          <Button key="back" onClick={() => setModalVisible(false)}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Lưu
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateOrUpdate}
          initialValues={editingBlog || { content1: "", content2: "" }}
        >
          <Form.Item name="title" label="Tiêu đề">
            <Input className="inputField" />
          </Form.Item>
          <Form.Item name="subTitle" label="Mô tả">
            <Input className="inputField" />
          </Form.Item>
          <Form.Item name="content1" label="Nội dung 1">
            <Input.TextArea className="textArea" autoSize={{ minRows: 3, maxRows: 6 }} />
          </Form.Item>
          <Form.Item name="content2" label="Nội dung 2">
            <Input.TextArea className="textArea" autoSize={{ minRows: 3, maxRows: 6 }} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Popup upload ảnh đại diện */}
      <Modal
        title="Tải Ảnh Đại Diện"
        open={avatarModalVisible}
        onCancel={() => setAvatarModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setAvatarModalVisible(false)}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              setAvatarModalVisible(false);
              setImageModalVisible(true);
            }}
          >
            Tiếp tục
          </Button>,
        ]}
        width={600}
      >
        <Upload customRequest={uploadAvatar} showUploadList={false}>
          <Button icon={<UploadOutlined />}>Tải ảnh đại diện</Button>
        </Upload>
        {avatarUrl && (
          <Image
            src={avatarUrl}
            style={{ marginTop: 20, width: "100%", borderRadius: 8 }}
          />
        )}
      </Modal>

      {/* Popup upload ảnh blog */}
      <Modal
        title="Tải Ảnh Blog"
        open={imageModalVisible}
        onCancel={() => setImageModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setImageModalVisible(false)}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              setImageModalVisible(false);
              setAvatarUrl(null);
              setBlogImages([]);
            }}
          >
            Hoàn thành
          </Button>,
        ]}
        width={600}
      >
        <Upload customRequest={uploadBlogImages} showUploadList={false} multiple>
          <Button icon={<UploadOutlined />} disabled={blogImages.length >= 2}>
            Tải ảnh blog (tối đa 2)
          </Button>
        </Upload>
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          {blogImages.map((img, index) => (
            <Image
              key={index}
              src={img}
              style={{
                width: 150,
                height: 150,
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default BlogPage;