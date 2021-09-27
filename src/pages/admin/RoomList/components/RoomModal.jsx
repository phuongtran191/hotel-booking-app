import { Form, Input, Modal, Rate, Select } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./RoomModal.scss";

const RoomModal = ({ isShowRoomModal, setIsShowRoomModal, modifyRoomData, handleSubmitForm }) => {
  const [modifyRoomForm] = Form.useForm();
  const { typeList } = useSelector((state) => state.typeReducer);

  useEffect(() => {
    if (isShowRoomModal) {
      modifyRoomForm.resetFields();
    }
  }, [isShowRoomModal, modifyRoomForm]);

  function renderTypeOptions() {
    return typeList.data.map((typeItem) => (
      <Select.Option value={typeItem.id} key={`type-${typeItem.id}`}>
        {typeItem.name}
      </Select.Option>
    ));
  }

  return (
    <Modal
      title={isShowRoomModal === "create" ? "Create Room" : "Edit Room"}
      visible={!!isShowRoomModal}
      onOk={() => modifyRoomForm.submit()}
      onCancel={() => setIsShowRoomModal("")}
    >
      <Form
        form={modifyRoomForm}
        name="modify-room"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={modifyRoomData}
        onFinish={(values) => handleSubmitForm(values)}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input code of room!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Type Room"
          name="typeRoomId"
          rules={[{ required: true, message: "Please input type of room!" }]}
        >
          <Select placeholder="Please select your type room!">{renderTypeOptions()}</Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RoomModal;
