import React, { useEffect, useState } from "react";
import { Table, Button, Modal, message, Popconfirm } from "antd";
import {
  APIGetPromotions,
  APICreatePromotion,
  APIUpdatePromotion,
  APIDeletePromotion,
} from "../../../api/api";
import PromotionForm from "./PromotionForm";

const PromotionManagement = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState(null);

  const fetchPromotions = async () => {
    setLoading(true);
    try {
      const { data } = await APIGetPromotions();
      if (data && data.success) {
        setPromotions(data.data); // Lấy danh sách promotion từ trường "data"
      } else {
        setPromotions([]);
        message.error(data.message || "Failed to fetch promotions!");
      }
    } catch (error) {
      message.error("Failed to fetch promotions!");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingPromotion(null); // Reset editingPromotion về null
    setIsModalOpen(true); // Mở modal
  };

  const handleEdit = (record) => {
    setEditingPromotion(record); // Gán dữ liệu promotion cần chỉnh sửa
    setIsModalOpen(true); // Mở modal
  };

  const handleDelete = async (id) => {
    try {
      await APIDeletePromotion(id);
      message.success("Promotion deleted successfully!");
      fetchPromotions();
    } catch (error) {
      message.error("Failed to delete promotion!");
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingPromotion) {
        await APIUpdatePromotion(editingPromotion.promotionId, values);
        message.success("Promotion updated successfully!");
      } else {
        await APICreatePromotion(values);
        message.success("Promotion created successfully!");
      }
      setIsModalOpen(false);
      fetchPromotions();
    } catch (error) {
      message.error("Failed to save promotion!");
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "promotionName",
      key: "promotionName",
    },
    {
      title: "Code",
      dataIndex: "promotionCode",
      key: "promotionCode",
    },
    {
      title: "Discount",
      dataIndex: "discountRate",
      key: "discountRate",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this promotion?"
            onConfirm={() => handleDelete(record.promotionId)}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Promotion Management</h1>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Promotion
      </Button>
      <Table
        dataSource={promotions}
        columns={columns}
        rowKey="promotionId"
        loading={loading}
      />
      <Modal
        title={editingPromotion ? "Edit Promotion" : "Add Promotion"}
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <PromotionForm
          initialValues={editingPromotion}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default PromotionManagement;