import { Select, DatePicker, Form, Input, InputNumber, Modal } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './DiscountModal.scss';


const dateFormat = 'DD/MM/YYYY';

const DiscountModal = ({
  isShowDiscountModal,
  setIsShowDiscountModal,
  modifyDiscountData,
  handleSubmitForm,
}) => {
  const [modifyDiscountForm] = Form.useForm();
  const { typeList } = useSelector((state) => state.typeReducer);


  useEffect(() => {
    if (isShowDiscountModal) {
      modifyDiscountForm.resetFields();
    }
  }, [isShowDiscountModal,modifyDiscountForm]);

  function renderTypeOptions() {
    return typeList.data.map((typeItem, typeIndex) => (
      <Select.Option value={typeItem.id} key={`type-${typeItem.id}`}>
        {typeItem.name}
      </Select.Option>
    ));
  }

  return (
    <Modal
      title={isShowDiscountModal === "create" ? "Create Discount" : "Edit Discount"}
      visible={!!isShowDiscountModal}
      onOk={() => modifyDiscountForm.submit()}
      onCancel={() => setIsShowDiscountModal("")}
    >
      <Form
        form={modifyDiscountForm}
        name="modify-discount"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={modifyDiscountData}
        onFinish={(values) => handleSubmitForm(values)}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input name of discount!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Start Date"
          name="start"
          rules={[{ required: true, message: "Please input the start date of discount!" }]}
          >
          <DatePicker format={dateFormat} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="End Date"
          name="end"
          rules={[{ required: true, message: "Please input the end date of discount!" }]}
          >
          <DatePicker format={dateFormat} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Value"
          name="value"
          rules={[
            { required: true, message: "Please input your discount value!" },
          ]}
        >
          <InputNumber 
            style={{ width: "100%" }}
            formatter={value => `% ${value}`}
            min={0} max={90} 
          />
        </Form.Item>

        <Form.Item
          label="Type of Room"
          name="typeRoomId"
          rules={[{ required: true, message: "Please input type of room!" }]}
        >
          <Select placeholder="Please select a type of room!">
            {renderTypeOptions()}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default DiscountModal;