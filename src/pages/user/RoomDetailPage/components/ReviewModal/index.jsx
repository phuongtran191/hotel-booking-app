import { InboxOutlined } from "@ant-design/icons";
import { Col, Form, Input, Modal, Rate, Row, Upload } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { addCommentAction, getCommentListAction } from "redux/actions";
import "./ReviewModal.scss";

const { TextArea } = Input;
const { Dragger } = Upload;

const ReviewModal = ({ isShowReviewModal, setIsShowReviewModal }) => {
  const dispatch = useDispatch();
  const roomId = useParams().id;
  const [reviewForm] = Form.useForm();
 ;
  const userInfo = useSelector((state) => state.userReducer.userInfo);

  useEffect(() => {
    if (isShowReviewModal) {
      reviewForm.resetFields();
    }
  }, [isShowReviewModal,reviewForm]);
  const handleSubmit = (values) => {
    const review = {
      typeRoomId: roomId,
      userId: userInfo.data.user.id,
      rating: values.rating,
      title: values.title,
      review: values.review,
      stars: {
        service: values.service,
        room: values.room,
        food: values.food,
        cleanness: values.cleanness,
      },
      image: values.photoReview || [],
    };
    dispatch(addCommentAction({ params: review }));

    setIsShowReviewModal(false);
    dispatch(getCommentListAction({ id: roomId, params: {} }));
  };
  console.log("hollo");
  return (
    <Modal
      title={isShowReviewModal === true && "Write your review here"}
      visible={!!isShowReviewModal}
      width={900}
      onOk={() => reviewForm.submit()}
      onCancel={() => setIsShowReviewModal(false)}
    >
      <Form
        className="review-modal"
        form={reviewForm}
        name="create-review"
        labelCol={{ span: 24 }}
        
        onFinish={(values) => handleSubmit(values)}
      >
        <Form.Item
          label="Overall Rating"
          name="rating"
          rules={[{ required: true, message: "Please input overall rating!" }]}
        >
          <Rate />
        </Form.Item>

        <Form.Item
          label="Title of your review"
          name="title"
          rules={[{ required: true, message: "Please input your title review!" }]}
        >
          <Input placeholder="Enter your title review here ..." />
        </Form.Item>

        <Form.Item
          label="Details of your review"
          name="review"
          rules={[{ required: true, message: "Please input your detail review!" }]}
        >
          <TextArea
            rows={5}
            placeholder="Tell people about your experience: your room, location, ..."
          />
        </Form.Item>

        <Row>
          <Col span={6}>
            <Form.Item
              label="Service"
              name="service"
              rules={[{ required: true, message: "Please input service rating!" }]}
            >
              <Rate />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="Room"
              name="room"
              rules={[{ required: true, message: "Please input room rating!" }]}
            >
              <Rate />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="Cleanliness"
              name="cleanness"
              rules={[{ required: true, message: "Please input cleanliness rating!" }]}
            >
              <Rate />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="Food"
              name="food"
              rules={[{ required: true, message: "Please input food rating!" }]}
            >
              <Rate />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Do You have photos to share? (Optional)" name="photoReview">
          <Dragger maxCount={4}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Drag or drop to your image assets or browse</p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Maximum 4 photos.
            </p>
          </Dragger>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ReviewModal;
