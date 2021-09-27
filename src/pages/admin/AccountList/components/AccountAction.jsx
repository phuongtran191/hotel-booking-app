import { Button, Popconfirm, Space } from "antd";
import { ROUTER_URL } from "constants/index";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editUserAction } from "redux/actions";
import history from "utils/history";


const AccountAction = (props) => {
  const { record, setIsShowAccountModal, setModifyAccountData } = props;
  const [disable, setDisable] = useState(false);
  
  const userData = JSON.parse(localStorage.getItem("userData"));
  const currentEmail = userData.user.email;
  console.log("🚀 ~ file: AccountAction.jsx ~ line 15 ~ AccountAction ~ record", record)
  if (currentEmail === record.email) {
    setDisable(true);
  }
  setDisable(false);

  const dispatch = useDispatch();
  return (
    <Space>
      <Button
        className="user-btn"
        style={{ color: "#4BB543", borderColor: "#4BB543" }}
        ghost
        onClick={() => {
          setIsShowAccountModal(true);
          setModifyAccountData({
            ...record,
            birthday: moment(record.birthday),
          });
        }}
      >
        View
      </Button>
      <Button
        className="user-btn"
        type="primary"
        ghost
        onClick={() => {
          history.push(
            `${ROUTER_URL.ADMIN}${ROUTER_URL.USERS}/${record.id}${ROUTER_URL.EDIT}`
          );
        }}
      >
        Edit
      </Button>
      <Popconfirm
        title={
          record.status === "active"
            ? "Are you sure to inactive user?"
            : "Are you sure to active user?"
        }
        onConfirm={() => {
          if (record.status === "active") {
            record.status = "inactive";
          } else {
            record.status = "active";
          }
          dispatch(editUserAction({ id: record.id, data: record }));
        }}
        onCancel={() => null}
        okText="Yes"
        cancelText="No"
      >
        {record.status === "active" ? (
          <Button className="user-btn" danger disabled={disable}>
            Inactive
          </Button>
        ) : (
          <Button
            className="user-btn"
            style={{ color: "#4BB543", borderColor: "#4BB543" }}
            ghost
          >
            Active
          </Button>
        )}
      </Popconfirm>
    </Space>
  );
};

export default AccountAction;
