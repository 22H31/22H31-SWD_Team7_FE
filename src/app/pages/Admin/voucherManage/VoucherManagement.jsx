import React, { useEffect, useState } from "react";
import { Table, Button, Modal, message, Popconfirm } from "antd";
import {
  APIGetVouchers,
  APICreateVoucher,
  APIUpdateVoucher,
  APIDeleteVoucher,
} from "../../../api/api";
import VoucherForm from "./VoucherForm";

const VoucherManagement = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState(null);

  const fetchVouchers = async () => {
    setLoading(true);
    try {
      const { data } = await APIGetVouchers();
      setVouchers(data);
    } catch (error) {
      message.error("Failed to fetch vouchers!");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingVoucher(null);
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditingVoucher(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await APIDeleteVoucher(id);
      message.success("Voucher deleted successfully!");
      fetchVouchers();
    } catch (error) {
      message.error("Failed to delete voucher!");
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingVoucher) {
        await APIUpdateVoucher(editingVoucher.id, values);
        message.success("Voucher updated successfully!");
      } else {
        await APICreateVoucher(values);
        message.success("Voucher created successfully!");
      }
      setIsModalOpen(false);
      fetchVouchers();
    } catch (error) {
      message.error("Failed to save voucher!");
    }
  };

  const handleGetVouchersByProductIds = async () => {
    const productIds = ["3fa85f64-5717-4562-b3fc-2c963f66afa6"]; // Thay bằng danh sách productIds thực tế
    try {
      const { data } = await APIGetVouchersByProductIds(productIds);
      console.log("Vouchers for products:", data);
      message.success("Fetched vouchers successfully!");
    } catch (error) {
      message.error("Failed to fetch vouchers for products!");
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "voucherName",
      key: "voucherName",
    },
    {
      title: "Discount",
      dataIndex: "voucherRate",
      key: "voucherRate",
    },
    {
      title: "Quantity",
      dataIndex: "voucherQuantity",
      key: "voucherQuantity",
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
            title="Are you sure to delete this voucher?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
          {/* Xóa nút Apply */}
          {/* <Button type="link" onClick={() => handleApplyVoucher(record.id)}>
            Apply
          </Button> */}
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Voucher Management</h1>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Voucher
      </Button>
      {/* Xóa nút này */}
      {/* <Button
        type="default"
        onClick={handleGetVouchersByProductIds}
        style={{ marginBottom: 16, marginLeft: 8 }}
      >
        Get Vouchers by Product IDs
      </Button> */}
      <Table
        dataSource={vouchers}
        columns={columns}
        rowKey="id"
        loading={loading}
      />
      <Modal
        title={editingVoucher ? "Edit Voucher" : "Add Voucher"}
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <VoucherForm
          initialValues={editingVoucher}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default VoucherManagement;