import { Button, Checkbox, Col, Form, Image, Input, InputNumber, Rate, Row, Space, Upload } from "antd";
import { CloseOutlined, UploadOutlined } from '@ant-design/icons';
import { ROUTER_URL } from "constants/index";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { createTypeAction, editTypeAction, getTypeDetailAction } from "redux/actions";
import { convertFileToBase64 } from "utils/common";
import history from "utils/history";
import "./AddEditRoom.scss";


const { TextArea } = Input;

const AddEditTypePage = (props) => {
  // change Image upload
  const [ uploadImages, setUploadImages ] = useState([]);
  const [ uploadError, setUploadError ] = useState("");

  const [modifyRoomForm] = Form.useForm();
  
  const { typeDetail } = useSelector((state) => state.typeReducer);
  const dispatch = useDispatch();
  const params = useParams();
  const typeRoomId = params.id;

  const initialValues = typeRoomId ? typeDetail.data : {};

  useEffect(() => {
    if (typeRoomId) {
      dispatch(getTypeDetailAction({ id: typeRoomId }));
    }
  }, [dispatch, typeRoomId]);

  useEffect(() => {
    if (typeDetail.data.id) {
      modifyRoomForm.resetFields();
      setUploadImages([...typeDetail.data.images]);
    }
  }, [typeDetail.data, modifyRoomForm]);

  useEffect(() => {
    if (typeDetail.data.id && typeRoomId) {
      modifyRoomForm.resetFields();
      setUploadImages([...typeDetail.data.images]);
    }
    else setUploadImages([]);
  }, [typeDetail.data, modifyRoomForm], [typeRoomId]);


  async function handleUploadImages(value) {
    if (!["image/png", "image/jpeg", "image/jpg"].includes(value.file.type)) {
      return setUploadError("File image is not in correct format!");
    }
    if (value.file.size > 3072000) {
      return setUploadError("Image is too large. It's not over 3Mb!");
    };
    setUploadError("");
    const imageBase64 = await convertFileToBase64(value.file);
    await setUploadImages([
      ...uploadImages,
      imageBase64,
    ])
  }

  function handleSubmitForm(values) {
    if (uploadImages.length === 0) {
      return setUploadError('Image is required!');
    }
    // const newValues = {...values};
    // newValues.utilities.push({ 'view': newValues.view });
    // const listImage = newValues.images.trim().split(",");
    // newValues.images = listImage;
    if (typeRoomId) {
      dispatch(editTypeAction({
        id: typeRoomId,
        data: {
          ...values,
          images: uploadImages,
        },
      }));
    } else {
      dispatch(createTypeAction({
        data: {
          ...values,
          images: uploadImages,
        },
      }));
    }
  };

  function renderTypeImages() {
    return uploadImages.map((imageItem, imageIndex) => (
      <Col span={6}>
        <Image
          key={`image-${imageIndex}`}
          width="100%"
          src={imageItem}
        />
        <span
          className="image-delete"
          onClick={() => {
            const newUploadImages = [...uploadImages]
            newUploadImages.splice(imageIndex, 1)
            // console.log(newUploadImages)
            setUploadImages(newUploadImages)
          }}
        >
          <CloseOutlined />
        </span>
      </Col>
    ));
  };

  return (
    <div>
      <Row className="room-form-title">
        <h3 style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          {typeRoomId ? "Edit Room Type" : "Create Room Type"}
        </h3>
        <Space>
          <Button
            onClick={() => {
              history.push(`${ROUTER_URL.ADMIN}${ROUTER_URL.ROOM_TYPES}`);
            }}
          >
            Cancel
          </Button>

          <Button
            type="primary"
            loading={typeDetail.load}
            onClick={() => modifyRoomForm.submit()}
          >
            Save
          </Button>
        </Space>
      </Row>

      <div className="room-form-content">
        <Form
          form={modifyRoomForm}
          name="modify-room"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={initialValues}
          onFinish={(values) => handleSubmitForm(values)}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please input name of type room!" },
            ]}
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
                onChange={(value) => handleUploadImages(value)}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
              {uploadImages.length > 0 && (
                <Row gutter={[4, 4]} style={{ marginTop: 8 }}>
                  {renderTypeImages()}
                </Row>
              )}
              <div style={{ height: 24, color: "#ff4d4f" }}>{uploadError}</div>
            </Col>
          </Row>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input description of room!" },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Max Guest"
            name="maxGuest"
            rules={[
              { required: true, message: "Please input the number of room!" },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Utilities"
            name="utilities"
            rules={[
              {
                required: true,
                message: "Please input the utilities of room!",
              },
            ]}
          >
            <Checkbox.Group>
              <Row>
                <Col span={8}>
                  <Checkbox
                    value={{ wifi: "Free Wi-Fi" }}
                    style={{ lineHeight: "32px" }}
                  >
                    Free Wi-Fi
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox
                    value={{ bed: "1 double bed" }}
                    style={{ lineHeight: "32px" }}
                  >
                    1 double bed
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox
                    value={{ roomSize: "Room size: 17 m²/183 ft²" }}
                    style={{ lineHeight: "32px" }}
                  >
                    Room size: 17 m²/183 ft²
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox
                    value={{ view: "City view" }}
                    style={{ lineHeight: "32px" }}
                  >
                    Minibar
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox
                    value={{ smoking: "Non-smoking" }}
                    style={{ lineHeight: "32px" }}
                  >
                    Non-smoking
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox
                    value={{ shower: "Shower" }}
                    style={{ lineHeight: "32px" }}
                  >
                    Shower
                  </Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              { required: true, message: "Please input the price of room!" },
            ]}
          >
            <InputNumber
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="Rating"
            name="rating"
            // rules={[
            //   { required: true, message: "Please input the rating of room!" },
            // ]}
          >
            <Rate allowHalf defaultValue={5} />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddEditTypePage;
