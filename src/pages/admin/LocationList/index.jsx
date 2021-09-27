import { Button, Popconfirm, Space, Table } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import LocationModal from './components/LocationModal';
import './LocationList.scss';
import moment from "moment";
import { createLocationAction, deleteLocationAction, editLocationAction, getLocationListAction } from "redux/actions";


function LocationListPage() {
  // "", "create", "edit"
  const [isShowLocationModal, setIsShowLocationModal] = useState('');
  const [modifyLocationData, setModifyLocationData] = useState({});
  const { locationList } = useSelector((state) => state.locationReducer);

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getLocationListAction());
  }, [dispatch]);

  function handleSubmitForm(values) {
    if (isShowLocationModal === 'create') {
      dispatch(createLocationAction({
        data: values,
      }));
    } else {
      dispatch(editLocationAction({
        id: modifyLocationData.id,
        data: values,
      }));
    }
    setIsShowLocationModal('');
  }

  const locationColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 180,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 420,
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
      width: 230,
      fixed: "right",
      key: 'action',
      render: (_, record) => {
        return (
          <Space>
            <Button
              className="location-btn"
              type="primary"
              ghost
              onClick={() => {
                setIsShowLocationModal('edit');
                setModifyLocationData(record);
              }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure to delete this location?"
              onConfirm={() => dispatch(deleteLocationAction({ id: record.id }))}
              onCancel={() => null}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </Space>
        )
      }
    },
  ];

  const locationData = locationList.data.map((locationItem, locationIndex) => {
    return {
      key: locationIndex,
      ...locationItem,
    }
  });

  return (
    <div>
      <div className="location-title">
        <Button 
          className="add-location-btn"
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={() => {
            setIsShowLocationModal("create");
            setModifyLocationData({name: "", address: ""});
          }}
        >
          New Location
        </Button>
      </div>
      <div className="location-list">
        <Table dataSource={locationData} columns={locationColumns} loading={locationList.load} />
      </div>

      <LocationModal
        isShowLocationModal={isShowLocationModal}
        setIsShowLocationModal={setIsShowLocationModal}
        modifyLocationData={modifyLocationData}
        handleSubmitForm={handleSubmitForm}
      />
    </div>
  );
}

export default LocationListPage;
