import { Form, Input, Radio, Select, Row, Col } from "antd";
const { Option } = Select;

const ShippingInfo = () => {
  return (
    <div className="shipping-info">
    <div className="custom-card">
      <Form layout="vertical">
        <Form.Item label="Loại địa chỉ">
          <Radio.Group defaultValue="home">
            <Radio value="home">Nhà riêng</Radio>
            <Radio value="company">Công ty</Radio>
          </Radio.Group>
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Họ">
              <Input placeholder="Họ của bạn" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Tên">
              <Input placeholder="Tên của bạn" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Số điện thoại">
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Tỉnh/Thành phố">
              <Select placeholder="-- Lựa chọn --">
                <Option value="hanoi">Hà Nội</Option>
                <Option value="hcm">TP. Hồ Chí Minh</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Quận/Huyện">
              <Select placeholder="-- Lựa chọn --">
                <Option value="quan1">Quận 1</Option>
                <Option value="quan2">Quận 2</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Địa chỉ">
          <Input placeholder="Nhập số nhà, tên đường, tòa nhà..." />
        </Form.Item>

        <Form.Item label="Ghi chú đơn hàng">
          <Input.TextArea rows={2} placeholder="Nhập ghi chú" />
        </Form.Item>
      </Form>
    </div>
    </div>
  );
};

export default ShippingInfo;
