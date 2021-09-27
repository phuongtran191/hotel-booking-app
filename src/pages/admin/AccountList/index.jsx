import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Popconfirm, Space, Table, Tag } from "antd";
import { ROUTER_URL } from 'constants/index';
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserListAction, editUserAction, getFilterUserListAction } from 'redux/actions/index';
import history from 'utils/history';
import AvatarItem from './components/AvatarItem';
import AccountModal from "./components/AccountModal";
import './AccountList.scss';
// import AccountAction from './components/AccountAction';


function AccountListPage() {
  const [isShowAccountModal, setIsShowAccountModal] = useState(false);
  const [modifyAccountData, setModifyAccountData] = useState({});
  // handle search
  const [ searchKey, setSearchKey ] = useState("");

  const { userList } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserListAction());
  }, [dispatch]);

  function handleSearchUser(value) {
    setSearchKey(value);
    dispatch(getFilterUserListAction({ searchKey: value }));
  }
  
  const roleFilter = userList.data.map((item, index) => {
    return {
      text: item.role,
      value: item.id,
    };
  });


  const userData = userList.data.map((userItem, userIndex) => {
    return {
      key: userIndex,
      ...userItem,
    };
  });
  const userColumns = [
    { title: 'No.', dataIndex: 'id', key: 'id', width: 50, fixed: "left", },
    {
      title: 'Full Name',
      dataIndex: 'name',
      width: 250,
      fixed: "left",
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      render: (value, record) => {
        return <AvatarItem avatar={record.avatar} value={value} key={`avatar-${record.id}`} />;
      }
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 220,
      key: 'email',
    },
    {
      title: 'Phone number',
      dataIndex: 'phone',
      width: 120,
      key: 'phone',
    },
    { 
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: 80,
      filters: [
        {text: "Admin", value: "admin"},
        {text: "User", value: "user"},
      ],
      onFilter: (value, record) => {
        return record.role === value;
      },
      render: (value) => {
        if (value === "user") return <Tag color="green">{value}</Tag>;
        return <Tag color="gold">{value}</Tag>
      },
    },
    { 
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (value) => {
        if (value === "active") return <Tag color="green">{value}</Tag>;
        return <Tag color="red">{value}</Tag>
      }
    },
    {
      title: 'Create At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      render: (value) => value && moment(value).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Update At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 120,
      render: (value) => value && moment(value).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: 240,
      key: 'action',
      render: (_, record) => {
        return (
          <Space>
            <Button
              className="user-btn"
              style={{ color:"#4BB543", borderColor:"#4BB543" }}
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
                // setStatus(record.status);
              }}
              onCancel={() => null}
              okText="Yes"
              cancelText="No"
            >
              {record.status === "active" 
              ? (
                <Button className="user-btn" danger>
                  Inactive
                </Button>
              )
              : (
                <Button className="user-btn"
                  style={{ color:"#4BB543", borderColor:"#4BB543" }}
                  ghost
                >
                  Active
                </Button>
              )
              }
            </Popconfirm>
          </Space>
        )
        // return (
        //   <AccountAction
        //     key={`account-${record.id}`}
        //     record={record}
        //     setIsShowAccountModal={setIsShowAccountModal}
        //     setModifyAccountData={setModifyAccountData}
        //   />
        // )
      }
    },
  ];

  return (
    <div>
      <div className="user-title">
        <p className="user-list-title">Account Manager</p>
        <Space>
          <Input
            className="user-search"
            prefix={<SearchOutlined />}
            placeholder="Search ..."
            onChange={(e) => handleSearchUser(e.target.value)}
          />
          <Button
            className="add-user-btn"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              history.push(`${ROUTER_URL.ADMIN}${ROUTER_URL.CREATE_USER}`);
            }}
          >
            Add User
          </Button>
        </Space>
      </div>

      <div className="user-list">
        <Table
          size="small"
          dataSource={userData}
          columns={userColumns}
          loading={userList.load}
          scroll={{ x: 1300 }}
        />
      </div>

      <AccountModal
        isShowAccountModal={isShowAccountModal}
        setIsShowAccountModal={setIsShowAccountModal}
        modifyAccountData={modifyAccountData}
        setModifyAccountData={setModifyAccountData}
      />
    </div>
  );
};

export default AccountListPage;