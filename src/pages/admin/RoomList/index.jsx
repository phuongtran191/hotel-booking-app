import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Popconfirm, Space, Table } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRoomAction, deleteRoomAction, editRoomAction, getFilterRoomListAction, getRoomListAction, getTypeListAction } from "redux/actions";
import RoomModal from "./components/RoomModal";
import './RoomList.scss';


function RoomListPage (props) {
  // "" "edit" "create"
  const [isShowRoomModal, setIsShowRoomModal] = useState('');
  // update Modal data
  const [modifyRoomData, setModifyRoomData] = useState({});
  // handle search
  const [ searchKey, setSearchKey ] = useState("");

  const { roomList } = useSelector((state) => state.roomReducer);
  const { typeList } = useSelector((state) => state.typeReducer);
  const dispatch = useDispatch();

  const typeFilter = typeList.data.map((item, index) => {
    return {
      text: item.name,
      value: item.id,
    };
  });

  useEffect(() => {
    dispatch(getTypeListAction());
    dispatch(getRoomListAction());
  }, [dispatch]);

  function handleSearchRoom(value) {
    setSearchKey(value);
    dispatch(getFilterRoomListAction({ params: { name_like: value } }));
  }

  function handleSubmitForm(values) {
    if (isShowRoomModal === 'create') {
      dispatch(createRoomAction({
        data: values,
      }));
    } else {
      dispatch(editRoomAction({
        id: modifyRoomData.id,
        data: values,
      }));
    }
    setIsShowRoomModal('');
  }


  const roomData = roomList.data.map((roomItem, roomIndex) => {
    return {
      key: roomIndex,
      ...roomItem,
    }
  });
  const roomColumns = [
    { title: 'No.', dataIndex: 'id', key: 'id', width: 80, fixed: "left" },
    {
      title: 'Name',
      dataIndex: 'name',
      width: 150,
      key: 'name',
    },
    {
      title: 'Type Room',
      dataIndex: 'typeRoomId',
      key: 'typeRoomId',
      filters: [...typeFilter],
      onFilter: (value, record) => {
        return record.typeRoomId === value;
      },
      render: (id) => {
        const typeData = typeList.data.find((item) => item.id === id);
        if (typeData) return typeData.name;
      }
    },
    {
      title: 'Create At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 200,
      render: (value) => value && moment(value).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Update At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 200,
      render: (value) => value && moment(value).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: 200,
      key: 'action',
      render: (_, record) => {
        return (
          <Space>
            <Button
              className="edit-room-btn"
              type="primary"
              ghost
      
              onClick={() => 
                {
                  setIsShowRoomModal('edit');
                  setModifyRoomData(record);
                }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure to delete this room?"
              onConfirm={() => dispatch(deleteRoomAction({ id: record.id }))}
              onCancel={() => null}
              okText="Yes"
              cancelText="No"
              
            >
              <Button className="room-btn" danger>Delete</Button>
            </Popconfirm>
          </Space>
        )
      }
    },
  ];

  return (
    <div>
      <div className="room-title">
        <p className="room-list-title">Room Manager</p>
        <Space>
          <Input
            className="room-search"
            prefix={<SearchOutlined />}
            placeholder="Search ..."
            onChange={(e) => handleSearchRoom(e.target.value)}
          />
          <Button 
            className="add-room-btn"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => 
              {
                setIsShowRoomModal("create");
                setModifyRoomData({ name: "" });
              }
            }
          >
            New Room
          </Button>
        </Space>
      </div>
      <div className="room-list">
        <Table
          size="small"
          dataSource={roomData} 
          columns={roomColumns} 
          loading={roomList.load}
          scroll={{ x: 1000 }}
        />
      </div>
      <RoomModal 
        isShowRoomModal={isShowRoomModal}
        setIsShowRoomModal={setIsShowRoomModal}
        modifyRoomData={modifyRoomData}
        handleSubmitForm={handleSubmitForm}
      />
    </div>
  );
}

export default RoomListPage;