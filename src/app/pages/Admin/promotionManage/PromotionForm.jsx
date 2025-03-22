import React, { useEffect } from "react";
import { Form, Input, InputNumber, Button, DatePicker, Modal } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const PromotionForm = ({ initialValues, onSubmit, onCancel }) => {
  const [form] = Form.useForm();

  // Reset form khi initialValues thay đổi
  useEffect(() => {
    if (!initialValues) {
      form.resetFields(); // Reset toàn bộ form nếu initialValues là null
    } else {
      form.setFieldsValue({
        ...initialValues,
        promotionDateRange: initialValues?.promotionStartDate
          ? [
              dayjs(initialValues.promotionStartDate),
              dayjs(initialValues.promotionEndDate),
            ]
          : null,
      });
    }
  }, [initialValues, form]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={(values) => {
        const formattedValues = {
          ...values,
          promotionStartDate: values.promotionDateRange
            ? values.promotionDateRange[0].toISOString()
            : null,
          promotionEndDate: values.promotionDateRange
            ? values.promotionDateRange[1].toISOString()
            : null,
        };
        delete formattedValues.promotionDateRange;
        onSubmit(formattedValues);
      }}
    >
      <Form.Item
        name="promotionName"
        label="Promotion Name"
        rules={[{ required: true, message: "Please enter the promotion name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="promotionCode"
        label="Promotion Code"
        rules={[{ required: true, message: "Please enter the promotion code!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="promotionDescription"
        label="Description"
        rules={[{ required: true, message: "Please enter the description!" }]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>
      <Form.Item
        name="discountRate"
        label="Discount Rate (%)"
        rules={[
          { required: true, message: "Please enter the discount rate!" },
          { type: "number", min: 0, max: 100, message: "Rate must be between 0 and 100!" },
        ]}
      >
        <InputNumber min={0} max={100} />
      </Form.Item>
      <Form.Item
        name="promotionDateRange"
        label="Promotion Validity Period"
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

const PromotionModal = ({ isModalOpen, setIsModalOpen, editingPromotion, handleSubmit }) => (
  <Modal
    title={editingPromotion ? "Edit Promotion" : "Add Promotion"}
    open={isModalOpen}
    footer={null}
    onCancel={() => setIsModalOpen(false)}
  >
    <PromotionForm
      initialValues={editingPromotion} // Nếu editingPromotion là null, form sẽ không có dữ liệu
      onSubmit={handleSubmit}
      onCancel={() => setIsModalOpen(false)}
    />
  </Modal>
);

export default PromotionForm;
export { PromotionModal };