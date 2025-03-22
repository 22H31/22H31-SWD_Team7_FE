import React from "react";
import { Form, Input, InputNumber, Button, DatePicker } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const VoucherForm = ({ initialValues, onSubmit, onCancel }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    const formattedValues = {
      ...values,
      voucherStartDate: values.voucherDateRange
        ? values.voucherDateRange[0].toISOString()
        : null,
      voucherEndDate: values.voucherDateRange
        ? values.voucherDateRange[1].toISOString()
        : null,
    };
    delete formattedValues.voucherDateRange;
    onSubmit(formattedValues);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        ...initialValues,
        voucherDateRange: initialValues?.voucherStartDate
          ? [
              dayjs(initialValues.voucherStartDate),
              dayjs(initialValues.voucherEndDate),
            ]
          : null,
      }}
      onFinish={handleFinish}
    >
      <Form.Item
        name="voucherName"
        label="Voucher Name"
        rules={[{ required: true, message: "Please enter the voucher name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="voucherDescription"
        label="Description"
        rules={[{ required: true, message: "Please enter the description!" }]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>
      <Form.Item
        name="voucherRate"
        label="Discount Rate (%)"
        rules={[
          { required: true, message: "Please enter the discount rate!" },
          { type: "number", min: 0, max: 100, message: "Rate must be between 0 and 100!" },
        ]}
      >
        <InputNumber min={0} max={100} />
      </Form.Item>
      <Form.Item
        name="voucherQuantity"
        label="Quantity"
        rules={[
          { required: true, message: "Please enter the quantity!" },
          { type: "number", min: 1, message: "Quantity must be at least 1!" },
        ]}
      >
        <InputNumber min={1} />
      </Form.Item>
      <Form.Item
        name="voucherDateRange"
        label="Voucher Validity Period"
        rules={[{ required: true, message: "Please select the date range!" }]}
      >
        <RangePicker showTime />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button style={{ marginLeft: "10px" }} onClick={onCancel}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default VoucherForm;