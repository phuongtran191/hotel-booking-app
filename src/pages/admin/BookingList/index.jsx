import { SearchOutlined } from "@ant-design/icons";
import { Input, Space, Table, Tag } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookingListAction, getDiscountListAction, getFilterUserListAction, getRoomListAction, getTypeListAction, getUserListAction } from "redux/actions";
import './BookingList.scss';
import BookingModal from "./components/BookingModal";
import ChangeStatus from "./components/ChangeStatus";


const BookingListPage = (props) => {
  const [isShowBookingModal, setIsShowBookingModal] = useState(false);
  const [modifyBookingData, setModifyBookingData] = useState({});
  // handle search
  const [ searchKey, setSearchKey ] = useState("");
  // const [ roomSelect, setRoomSelect ] = useState('');
  const { userList } = useSelector((state) => state.userReducer);
  const { discountList } = useSelector((state) => state.discountReducer);
  const { typeList } = useSelector((state) => state.typeReducer);
  const { bookingList } = useSelector((state) => state.bookingReducer);
  const { roomList } = useSelector((state) => state.roomReducer);
  const dispatch = useDispatch();

  const typeFilter = typeList.data.map((item, index) => {
    return {
      text: item.name,
      value: item.id,
    };
  });


  useEffect(() => {
    dispatch(getBookingListAction());
    dispatch(getTypeListAction());
    dispatch(getRoomListAction());
    dispatch(getUserListAction());
    dispatch(getDiscountListAction());
  }, [dispatch]);

  function handleSearchUser(value) {
    setSearchKey(value);
    dispatch(getFilterUserListAction({ params: { id_like: value } }));
  }

  const bookingData = bookingList.data.map((bookingItem, bookingIndex) => {
    return {
      key: bookingIndex,
      ...bookingItem,
    };
  });
  const bookingColumns = [
    { 
      title: "No.", 
      dataIndex: "id",
      key: "id",
      width: 80,
      fixed: "left",
      render: (value) => `#${value}` },
    {
      title: "Name",
      dataIndex: "userId",
      width: 200,
      key: "userId",
      sorter: (a, b) => {
        const user1 = userList.data.find((item) => item.id === a.userId);
        const user2 = userList.data.find((item) => item.id === b.userId);
        return user1.name.length - user2.name.length;
      },
      render: (id) => {
        const userData = userList.data.find((item) => item.id === id);
        if (userData) return userData.name;
      },
    },
    {
      title: "Phone",
      dataIndex: "userId",
      width: 120,
      key: "userId",
      render: (id) => {
        const userData = userList.data.find((item) => item.id === id);
        if (userData) return userData.phone;
      },
    },
    {
      title: "Email",
      dataIndex: "userId",
      width: 250,
      key: "userId",
      render: (id) => {
        const userData = userList.data.find((item) => item.id === id);
        if (userData) return userData.email;
      },
    },
    {
      title: "Type Room",
      dataIndex: "typeRoomId",
      key: "typeRoomId",
      filters: [...typeFilter],
      onFilter: (value, record) => {
        return record.typeRoomId === value;
      },
      width: 180,
      render: (id) => {
        const typeData = typeList.data.find((item) => item.id === id);
        if (typeData) return typeData.name;
      },
    },
    { 
      title: 'Check-In Date',
      dataIndex: 'checkIn',
      key: 'checkIn',
      width: 120,
      sorter: (a, b) => a.checkIn - b.checkIn,
      render: (value) => value && moment(value).format('DD/MM/YYYY'),
    },
    { 
      title: 'Check-Out Date',
      dataIndex: 'checkOut',
      key: 'checkOut',
      width: 140,
      sorter: (a, b) => a.checkOut - b.checkOut,
      render: (value) => value && moment(value).format('DD/MM/YYYY'),
    },
    { 
      title: 'Room',
      dataIndex: 'roomId',
      key: 'roomId',
      width: 80,
      render: (id) => {
        const roomData = roomList.data.find((item) => item.id === id);
        if (roomData) return (roomData.name ? roomData.name : "No room");
      },
    },
    {
      title: "Price",
      dataIndex: "typeRoomId",
      key: "typeRoomId",
      render: (id) => {
        const typeData = typeList.data.find((item) => item.id === id);
        if (typeData) return (typeData.price ? `$ ${typeData.price}` : "$ 0");
      },
    },
    {
      title: "Discount",
      dataIndex: "discountCode",
      key: "discountCode",
      render: (code) => {
        const discountData = discountList.data.find((item) => item.name === code);
        if (discountData) return (discountData.value ? `${discountData.value}%` : "0%");
      },
    },
    { 
      title: 'Total price',
      dataIndex: 'total',
      key: 'total',
      width: 80,
      render: (value) => (value ? `$ ${value}` : `$ 0`),
    },
    { 
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (value) => {
        if (value === "pending") return <Tag color="processing">Booked</Tag>;
        if (value === "check-in") return <Tag color="green">Checked-In</Tag>;
        if (value === "check-out") return <Tag color="yellow">Checked-Out</Tag>;
        if (value === "canceled") return <Tag color="red">Canceled</Tag>;
      },
    },
    {
      title: "Create At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 140,
      render: (value) => value && moment(value).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Update At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: 140,
      render: (value) => value && moment(value).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Change Booking Status",
      dataIndex: "action",
      width: 370,
      key: "action",
      render: (_, record) => {
        return (
          <ChangeStatus
            key={`status-${record.id}`}
            record={record}
            setIsShowBookingModal={setIsShowBookingModal}
            setModifyBookingData={setModifyBookingData}
          />
        )
      },
    },
  ];

  return (
    <div>
      <div className="booking-title">
        <p className="booking-list-title">Booking Manager</p>
        <Space>
          <Input
            className="roomType-search"
            prefix={<SearchOutlined />}
            placeholder="Search ..."
            onChange={(e) => handleSearchUser(e.target.value)}
          />
          {/* <Button
            className="add-booking-btn"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              dispatch(createBookingAction())
            }}
          >
            New Booking
          </Button> */}
        </Space>
      </div>

      <div className="booking-list">
        <Table
          size="small"
          dataSource={bookingData}
          columns={bookingColumns}
          loading={bookingList.load}
          scroll={{ x: 2150 }}
        />
      </div>

      <BookingModal
        isShowBookingModal={isShowBookingModal}
        setIsShowBookingModal={setIsShowBookingModal}
        modifyBookingData={modifyBookingData}
        handleCreateForm={null}
     
      />
    </div>
  );
};

export default BookingListPage;
