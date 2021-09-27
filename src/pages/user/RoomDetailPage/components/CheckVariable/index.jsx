import React from "react";
import { Form, DatePicker, Button, Select, Row, Col} from "antd";
import "./CheckVariable.scss";
const { Option } = Select;

const { RangePicker } = DatePicker;
function CheckVariable(props) {
  const onFinish = (fieldsValue) => {
    // Should format date value before submit.
    const rangeValue = fieldsValue["Dates"];
    const values = {
      ...fieldsValue,
      "Dates": [rangeValue[0].format("YYYY-MM-DD"), rangeValue[1].format("YYYY-MM-DD")],
    };
  };
  return (
    <div>
      <Row>
        <Col span={20} offset={4}>
          <div className="check-variable">
            <Col offset={4}>
              <div className="check-variable__title">Check variable</div>
            </Col>
            <Form name="check-variable__form" onFinish={onFinish} layout="vertical">
              <Form.Item
                className="labelName"
                name="Dates"
                label="Dates"
                rules={[{ type: "array", required: true, message: "Please select time!" }]}
              >
                <RangePicker />
              </Form.Item>
              <Form.Item
                className="labelName"
                name="Guest"
                label="Guest"
                rules={[{ required: true, message: "please select number people!" }]}
              >
                <Select placeholder="Choice of number people">
                  {" "}
                  <Option value="1">1 people</Option>
                  <Option value="2">2 people</Option>
                  <Option value="3">3 people</Option>
                  <Option value="4">4 people</Option>
                  <Option value="5">5 people</Option>
                </Select>
              </Form.Item>
              <Col offset={4}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Check Variable
                  </Button>
                </Form.Item>
              </Col>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default CheckVariable;
