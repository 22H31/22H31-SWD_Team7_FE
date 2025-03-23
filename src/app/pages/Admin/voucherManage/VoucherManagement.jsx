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
      setVouchers(data); // Lưu danh sách voucher từ API
    } catch (error) {
      console.error("Lỗi khi lấy danh sách voucher:", error.response?.data || error.message);
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
    console.log("Voucher cần chỉnh sửa:", record); // Log dữ liệu voucher để kiểm tra
    setEditingVoucher(record); // Lưu voucher hiện tại để chỉnh sửa
    setIsModalOpen(true); // Mở modal chỉnh sửa
  };

  const handleDelete = async (voucherId) => {
    console.log("Voucher ID cần xóa:", voucherId); // Log voucherId để kiểm tra
    if (!voucherId) {
      message.error("Voucher ID không hợp lệ!");
      return;
    }

    try {
      await APIDeleteVoucher(voucherId); // Gọi API xóa voucher
      message.success("Voucher deleted successfully!");
      fetchVouchers(); // Cập nhật danh sách voucher sau khi xóa
    } catch (error) {
      console.error("Lỗi khi xóa voucher:", error.response?.data || error.message);
      message.error(
        error.response?.data?.message || "Failed to delete voucher!"
      );
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingVoucher) {
        // Cập nhật voucher
        await APIUpdateVoucher(editingVoucher.voucherId, values);
        message.success("Voucher updated successfully!");
      } else {
        // Tạo mới voucher
        await APICreateVoucher(values);
        message.success("Voucher created successfully!");
      }
      setIsModalOpen(false); // Đóng modal
      fetchVouchers(); // Cập nhật danh sách voucher
    } catch (error) {
      console.error("Lỗi khi lưu voucher:", error.response?.data || error.message);
      message.error(
        error.response?.data?.message || "Failed to save voucher!"
      );
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
      dataIndex: "quantity",
      key: "quantity",
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
            onConfirm={() => handleDelete(record.voucherId)} // Truyền voucherId vào hàm xóa
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
      <h1>Voucher Management</h1>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Voucher
      </Button>
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
          initialValues={editingVoucher} // Truyền dữ liệu voucher hiện tại vào form
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default VoucherManagement;