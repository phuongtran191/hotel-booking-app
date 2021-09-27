import React, { useEffect } from 'react';
import { Form, Input, Modal } from "antd";

function RoomTypesModal({
  isShowTypeModal,
  setIsShowTypeModal,
  modifyTypeData,
  handleSubmitForm,
}) {
  const [modifyTypeForm] = Form.useForm();

  useEffect(() => {
    if (isShowTypeModal) {
      modifyTypeForm.resetFields();
    }
  }, [isShowTypeModal]);

  return (
    <Modal
      title={isShowTypeModal === "create" ? "Create Room Type" : "Edit Room Type"}
      visible={!!isShowTypeModal}
      onOk={() => modifyTypeForm.submit()}
      onCancel={() => setIsShowTypeModal('')}
    >
      <Form
        form={modifyTypeForm}
        name="modify-roomType"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={modifyTypeData}
        onFinish={(values) => handleSubmitForm(values)}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input the room type!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default RoomTypesModal;
