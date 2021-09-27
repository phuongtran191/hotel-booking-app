import { Modal, Form, Input, Select, InputNumber, DatePicker, Button } from 'antd';
import React, { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import './CustomerModal.scss';
// import moment from 'moment';


const dateFormat = 'DD/MM/YYYY';


const CustomerModal = ({
  isShowUserModal,
  setIsShowUserModal,
  modifyUserData,
}) => {
  const [modifyUserForm] = Form.useForm();
  // const dispatch = useDispatch();


  useEffect(() => {
    if (isShowUserModal) {
      modifyUserForm.resetFields();
    }
  }, [isShowUserModal]);

  return (
    <Modal
      title={isShowUserModal === true && "Profile User"}
      visible={isShowUserModal}
      width={700}
      footer={[
        <Button
          type="primary"
          ghost
          onClick={() => setIsShowUserModal(false)}
        >
          OK
        </Button>
      ]}
      // onOk={() => modifyUserForm.submit()}
      // onCancel={() => setIsShowUserModal(false)}
    >
      <Form
        form={modifyUserForm}
        name="modify-user"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={modifyUserData}
        onFinish={(values) => console.log(values)}
      >
        <Form.Item
          label="Full Name"
          name="name"
          // rules={[{ required: true, message: "Please input full name!" }]}
        >
          <Input readOnly />
        </Form.Item>

        <Form.Item
          label="User Name"
          name="username"
          // rules={[{ required: true, message: "Please input username!" }]}
        >
          <Input readOnly />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          // rules={[{ required: true, message: "Please input user email!" }]}
        >
          <Input readOnly />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          // rules={[{ required: true, message: "Please input user phone number!" }]}
        >
          <InputNumber readOnly style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Age"
          name="age"
          // rules={[{ required: true, message: "Please input age of user!" }]}
          >
          <InputNumber readOnly style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          // rules={[{ required: true, message: "Please input user gender!" }]}
        >
          <Select disabled placeholder="Please select user gender!">
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          // rules={[{ required: true, message: "Please input user address!" }]}
        >
          <Input readOnly />
        </Form.Item>

        <Form.Item
          label="Birthday"
          name="birthday"
          // rules={[{ required: true, message: "Please input user birthday!" }]}
        >
        <DatePicker disabled format={dateFormat} style={{ width: "100%" }} />
         
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please input user status!" }]}
        >
          <Select disabled placeholder="Please select user status!">
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="inactive">Inactive</Select.Option>
          </Select>
        </Form.Item>
    
        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please input user role!" }]}
        >
          <Select disabled placeholder="Please select user role!">
            <Select.Option value="admin">Admin</Select.Option>
            <Select.Option value="staff">Staff</Select.Option>
            <Select.Option value="user">User</Select.Option>
          </Select>
        </Form.Item>
        
      </Form>
    </Modal>
  );
}

export default CustomerModal;
