import { Button, Col, DatePicker, Form, Image, Input, InputNumber, Row, Select, Space, Upload } from "antd";
import { CloseOutlined, UploadOutlined } from '@ant-design/icons';
import { ROUTER_URL } from "constants/index";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { createUserAction, editUserAction, getUserDetailAction } from "redux/actions";
import { convertFileToBase64 } from "utils/common";
import history from "utils/history";
import "./AddEditUser.scss";


const dateFormat = 'DD/MM/YYYY';

const AddEditUserPage = (props) => {
  // change Image upload
  const [ uploadAvatar, setUploadAvatar ] = useState([]);
  const [ uploadError, setUploadError ] = useState("");
 
  const [modifyUserForm] = Form.useForm();

  const { userDetail } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const params = useParams();
  const userId = params.id;

  const initialValues = userId 
    ? {...userDetail.data, birthday: moment(userDetail.data.birthday)}
    : {};

  useEffect(() => {
    if (userId) {
      dispatch(getUserDetailAction({ id: userId }));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (userDetail.data.id) {
      modifyUserForm.resetFields();
      setUploadAvatar([...userDetail.data.avatar]);
    }
  }, [userDetail.data, modifyUserForm]);

  useEffect(() => {
    if (userDetail.data.id) {
      modifyUserForm.resetFields();
      setUploadAvatar([...userDetail.data.avatar]);
    } else {
      setUploadAvatar([]);
    }
  }, [userDetail.data, modifyUserForm], [userId]);


  async function handleUploadAvatar(value) {
    if (!["image/png", "image/jpeg", "image/jpg"].includes(value.file.type)) {
      return setUploadError("File image is not in correct format!");
    }
    if (value.file.size > 3072000) {
      return setUploadError("Image is too large. It's not over 3Mb!");
    };
    setUploadError("");
    const imageBase64 = await convertFileToBase64(value.file);
    await setUploadAvatar([
      ...uploadAvatar,
      imageBase64,
    ])
  }

  function handleSubmitForm(values) {
    if (uploadAvatar.length === 0) {
      return setUploadError('Image is required!');
    }
    const newValues = {...values};
    newValues.birthday = moment(newValues.birthday).valueOf();
    if (userId) {
      dispatch(
        editUserAction({
          id: userId,
          data: {
            ...newValues,
            avatar: uploadAvatar
          },
        })
      );
    } else {
      dispatch(
        createUserAction({
          data: {
            ...newValues,
            avatar: uploadAvatar
          },
        })
      );
    }
  }

  function renderUserAvatar() {
    return uploadAvatar.map((avatarItem, avatarIndex) => (
      <Col span={6}>
        <Image
          key={`avatar-${avatarIndex}`}
          width="100%"
          src={avatarItem}
        />
        <span
          className="avatar-delete"
          onClick={() => {
            const newUploadAvatar = [...uploadAvatar]
            newUploadAvatar.splice(avatarIndex, 1)
            // console.log(newUploadAvatar)
            setUploadAvatar(newUploadAvatar)
          }}
        >
          <CloseOutlined />
        </span>
      </Col>
    ));
  };

  return (
    <div>
      <Row justify="space-between" className="user-form-title">
        <h3 style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          {userId ? "Edit User" : "Create User"}
        </h3>
        <Space>
          <Button
            onClick={() =>
              history.push(`${ROUTER_URL.ADMIN}${ROUTER_URL.USERS}`)
            }
          >
            Cancel
          </Button>

          <Button type="primary" onClick={() => modifyUserForm.submit()}>
            Save
          </Button>
        </Space>
      </Row>

      <div className="user-form-content">
        <Form
          form={modifyUserForm}
          name="modify-user"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={initialValues}
          onFinish={(values) => handleSubmitForm(values)}
        >
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Please input full name!" }]}
          >
            <Input />
          </Form.Item>

          <Row className="form-item-upload">
            <Col span={6} style={{ textAlign: "right" }}>
              <Space style={{ marginTop: 4 }} size={0}>
                <div
                  style={{
                    display: "inline-block",
                    marginRight: "4px",
                    color: "#ff4d4f",
                    fontSize: "14px",
                    fontFamily: "SimSun, sans-serif",
                    lineHeight: 1,
                  }}
                >
                  *
                </div>
                <div style={{ marginRight: 8 }}>Images :</div>
              </Space>
            </Col>
            <Col span={18}>
              <Upload
                accept="image/*"
                listType="picture"
                beforeUpload={() => false}
                onChange={(value) => handleUploadAvatar(value)}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
              {uploadAvatar.length > 0 && (
                <Row gutter={[4, 4]} style={{ marginTop: 8 }}>
                  {renderUserAvatar()}
                </Row>
              )}
              <div style={{ height: 24, color: "#ff4d4f" }}>{uploadError}</div>
            </Col>
          </Row>

          <Form.Item
            label="User Name"
            name="username"
            rules={[{ required: true, message: "Please input username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input user email!" },
              { type: "email", message: "Please input the valid email!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter a valid password!" },
              { min: 6, message: "Must be a minimum of 6 characters" },
            ]}
          >
            <Input.Password style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              { required: true, message: "Please input user phone number!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Age"
            name="age"
            // rules={[{ required: true, message: "Please input age of user!" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please input user gender!" }]}
          >
            <Select placeholder="Please select user gender!">
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            // rules={[{ required: true, message: "Please input user address!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Birthday" name="birthday">
            <DatePicker format={dateFormat} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please input user status!" }]}
          >
            <Select placeholder="Please select user status!">
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please input user role!" }]}
          >
            <Select placeholder="Please select user role!">
              <Select.Option value="admin">Admin</Select.Option>
              {/* <Select.Option value="staff">Staff</Select.Option> */}
              <Select.Option value="user">User</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddEditUserPage;
