import { Form, Modal, Select } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./BookingModal.scss";
import { checkVariable } from "redux/constants";
import { editBookingAction, getBookingListAction, getRoomListAction } from "redux/actions";

const BookingModal = ({
  isShowBookingModal,
  setIsShowBookingModal,
  modifyBookingData,
}) => {
  console.log("🚀 ~ file: BookingModal.jsx ~ line 14 ~ modifyBookingData", modifyBookingData)
 
  const [modifyBookingForm] = Form.useForm();
  
  const { bookingList } = useSelector((state) => state.bookingReducer);
  const { roomList } = useSelector((state) => state.roomReducer);
  const dispatch = useDispatch();

  const checkIn = modifyBookingData.checkIn;
  const checkOut = modifyBookingData.checkOut;
  const typeRoomId = modifyBookingData.typeRoomId;

  const listVariable = checkVariable(checkIn, checkOut, bookingList.data, roomList.data);
  

  useEffect(() => {
    dispatch(getRoomListAction());
    dispatch(getBookingListAction());
  }, [dispatch]);

  useEffect(() => {
    if (isShowBookingModal) {
      modifyBookingForm.resetFields();
    }
  }, [isShowBookingModal]);

  // function renderTypeOptions() {
  //   return typeList.data.map((typeItem, typeIndex) => (
  //     <Select.Option value={typeItem.id} key={`type-${typeItem.id}`}>
  //       {typeItem.name}
  //     </Select.Option>
  //   ));
  // }
  function renderRoomName(roomId) {
    const room = roomList.data.find((item) => {
      return item.id === roomId;
    });
    return room?.name;
  }
  function renderRoomCode() {
    if (listVariable) {
      const listId = listVariable[`${typeRoomId}`] || [];
      return listId.map((roomId, index) => (
        <Select.Option value={renderRoomName(roomId)}  key={`choose-${roomId}`}>
          {renderRoomName(roomId)}
        </Select.Option>
      ));
    }
  }
  function handleSubmitForm(values) {
    dispatch(editBookingAction({
      data: {
        ...modifyBookingData,
        ...values,
      },
      params: { _expand:[ "typeRoom", "room", "user"] }
    }));
    setIsShowBookingModal(false);
  };

  return (
    <Modal
      title={isShowBookingModal === true && "Change Room"}
      visible={isShowBookingModal}
      onOk={() => modifyBookingForm.submit()}
      onCancel={() => setIsShowBookingModal(false)}
    >
      <Form
        form={modifyBookingForm}
        name="modify-room"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{
          ...modifyBookingData,
          roomId: renderRoomName(modifyBookingData.roomId)
        }}
        onFinish={(values) => handleSubmitForm(values)}
      >
        <Form.Item
          label="Name"
          name="roomId"
          rules={[{ required: true, message: "Please input code of room!" }]}
        >
          <Select placeholder="Please select a room code!">
            {renderRoomCode()}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BookingModal;
