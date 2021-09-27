import {
  Form, Input, Modal
} from "antd";
import { useEffect } from 'react';

function ModifyLocationModal({
  isShowLocationModal,
  setIsShowLocationModal,
  modifyLocationData,
  handleSubmitForm,
}) {
  const [modifyLocationForm] = Form.useForm();

  useEffect(() => {
    if (isShowLocationModal) {
      modifyLocationForm.resetFields();
    }
  }, [isShowLocationModal,modifyLocationForm]);

  return (
    <Modal
      title={isShowLocationModal === "create" ? "Create Location" : "Edit Location"}
      visible={!!isShowLocationModal}
      onOk={() => modifyLocationForm.submit()}
      onCancel={() => setIsShowLocationModal('')}
    >
      <Form
        form={modifyLocationForm}
        name="modify-location"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={modifyLocationData}
        onFinish={(values) => handleSubmitForm(values)}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input the name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input the address!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModifyLocationModal;
