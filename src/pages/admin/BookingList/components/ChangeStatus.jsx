import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Popconfirm, Space } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  cancelBookingAction,
  checkInBookingAction,
  checkOutBookingAction,
  pendingBookingAction
} from "redux/actions";


const ChangeStatus = (props) => {
  const { record, setIsShowBookingModal, setModifyBookingData } = props;
  const [disable, setDisable] = useState(false);
  
  const dispatch = useDispatch();

  const BOOKING_STATUS_MENU = (
    <Menu>
      <Menu.Item
        key="1"
        onClick={() => {
          dispatch(pendingBookingAction({ id: record.id }));
          setDisable(false)
        }}
      >
        Booked
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => {
          dispatch(checkInBookingAction({ id: record.id }));
          setDisable(false)
        }}
      >
        Checked-In
      </Menu.Item>
      <Menu.Item
        key="3"
        onClick={() => {
          dispatch(checkOutBookingAction({ id: record.id }));
          setDisable(false)
        }}
      >
        Checked-Out
      </Menu.Item>
    </Menu>
  );
  return (
    <Space>
      <Button
        className="edit-booking-btn"
        style={{ color: "#0275d8", borderColor: "#0275d8" }}
        ghost
        disabled={disable}
        onClick={() => {
          setIsShowBookingModal(true);
          setModifyBookingData(record);
        }}
      >
        Change Room
      </Button>

      <Dropdown overlay={BOOKING_STATUS_MENU}>
        <Button type="primary" ghost>
          Change Status <DownOutlined />
        </Button>
      </Dropdown>

      <Popconfirm
        title="Are you sure to cancel this booking?"
        onConfirm={() => {
          dispatch(cancelBookingAction({ id: record.id }));
          setDisable(true);
        }}
        onCancel={() => null}
        okText="Yes"
        cancelText="No"
      >
        <Button className="booking-btn" danger>
          Cancel
        </Button>
      </Popconfirm>
    </Space>
  );
};

export default ChangeStatus;
