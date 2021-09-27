import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Popconfirm, Space, Table } from "antd";
import moment from "moment";
import React, {  useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDiscountAction, deleteDiscountAction, editDiscountAction, getDiscountListAction, getFilterDiscountListAction, getTypeListAction } from 'redux/actions';
import DiscountModal from "./components/DiscountModal";
import './DiscountList.scss';


const DiscountListPage = () => {
  // "" , "edit", "create"
  const [isShowDiscountModal, setIsShowDiscountModal] = useState("");
  const [modifyDiscountData, setModifyDiscountData] = useState({});
  const [ searchKey, setSearchKey ] = useState("");

  const { discountList } = useSelector((state) => state.discountReducer);
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
    dispatch(getDiscountListAction());
  }, [dispatch]);

  function handleSearchDiscount(value) {
    setSearchKey(value);
    dispatch(getFilterDiscountListAction({ params: { name_like: value } }));
  }

  function handleSubmitForm(values) {
    const newValues = {...values};
    newValues.start = moment(newValues.start).valueOf();
    newValues.end = moment(newValues.end).valueOf();
    if (isShowDiscountModal === 'create') {
      dispatch(createDiscountAction({
        data: newValues,
      }));
    } else {
      dispatch(editDiscountAction({
        id: modifyDiscountData.id,
        data: newValues,
      }));
    }
    setIsShowDiscountModal("");
  };


  const discountData = discountList.data.map((discountItem, discountIndex) => {
    return {
      key: discountIndex,
      ...discountItem,
    }
  });
  const discountColumns = [
    { title: 'No.', dataIndex: 'id', key: 'id', width: 80, fixed: "left",
      // sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: 130,
      key: 'name',
    },
    { 
      title: 'Start Date',
      dataIndex: 'start',
      key: 'start',
      sorter: (a, b) => a.start - b.start,
      render: (value) => value && moment(value).format('DD/MM/YYYY'),
    },
    { 
      title: 'End Date', 
      dataIndex: 'end', 
      key: 'end',
      sorter: (a, b) => a.end - b.end,
      render: (value) => value && moment(value).format('DD/MM/YYYY'),
    },
    { 
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      width: 80,
      render: (value) => `${value}%`
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
      title: 'Create At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value) => value && moment(value).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Update At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
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
              className="discount-btn"
              type="primary"
              ghost
              onClick={() => {
                setIsShowDiscountModal("edit");
                setModifyDiscountData({
                  ...record, 
                  start: moment(record.start), 
                  end: moment(record.end)
                });
              }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure to delete this discount?"
              onConfirm={() => dispatch(deleteDiscountAction({ id: record.id }))}
              onCancel={() => null}
              okText="Yes"
              cancelText="No"
            >
              <Button className="discount-btn" danger>Delete</Button>
            </Popconfirm>
          </Space>
        )
      }
    },
  ];

  return (
    <div>
      <div className="discount-title">
        <p className="discount-list-title">Discount Manager</p>
        <Space>
          <Input
            className="discount-search"
            prefix={<SearchOutlined />}
            placeholder="Search ..."
            onChange={(e) => handleSearchDiscount(e.target.value)}
          />
          <Button
            className="add-discount-btn"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setIsShowDiscountModal("create");
              setModifyDiscountData({ 
                name: '', 
                start: moment(1631092999151),
                end: moment(1631093012330),
                value: 0 
              });
            }}
          >
            Add Discount
          </Button>
        </Space>
      </div>
      <div className="discount-list">
        <Table
          size="small"
          dataSource={discountData}
          columns={discountColumns}
          loading={discountList.load}
          scroll={{x: 1000}} />
      </div>

      <DiscountModal
        isShowDiscountModal={isShowDiscountModal}
        setIsShowDiscountModal={setIsShowDiscountModal}
        modifyDiscountData={modifyDiscountData}
        handleSubmitForm={handleSubmitForm}
      />
    </div>
  );
}

export default DiscountListPage;
