import React from "react";
import { Form, Input, InputNumber, DatePicker, Button } from "antd";

const { RangePicker } = DatePicker;

const VoucherForm = ({ initialValues, onSubmit, onCancel }) => {
  const [form] = Form.useForm();

  // Khi mở form, đặt giá trị ban đầu
  React.useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues); // Đặt giá trị ban đầu từ initialValues
    } else {
      form.resetFields(); // Reset form nếu không có initialValues
    }
  }, [initialValues, form]);

  const handleFinish = (values) => {
    onSubmit(values); // Gửi dữ liệu khi submit
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={initialValues} // Đặt giá trị ban đầu
    >
      <Form.Item
        label="Voucher Name"
        name="voucherName"
        rules={[{ required: true, message: "Please enter voucher name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="voucherDescription"
        rules={[{ required: true, message: "Please enter description!" }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="Discount Rate (%)"
        name="voucherRate"
        rules={[
          { required: true, message: "Please enter discount rate!" },
          { type: "number", min: 0, max: 100, message: "Rate must be between 0 and 100!" },
        ]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Quantity"
        name="quantity"
        rules={[{ required: true, message: "Please enter quantity!" }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Voucher Validity Period"
        name="voucherValidityPeriod"
        rules={[{ required: true, message: "Please select validity period!" }]}
      >
        <RangePicker showTime />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
          Submit
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </Form.Item>
    </Form>
  );
};

export default VoucherForm;