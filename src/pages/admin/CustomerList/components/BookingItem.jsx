import { isLet } from '@babel/types';
import { Tag, Table } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDiscountListAction, getTypeListAction } from 'redux/actions';


const BookingItem = (props) => {
  const { value } =props;
  const { typeList } = useSelector((state) => state.typeReducer);
  const { discountList } = useSelector((state) => state.discountReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDiscountListAction());
  }, []);


  function sumTotal(record) {
    let total = 0;
    const typeData = typeList.data.find((item) => item.id === record.typeRoomId) || {};
    const discountData = discountList.data.find((item) => item.name === record.discountCode) || {};
    const price = typeData.price;
    const discount = discountData.value;
    return total = total + price*(100 - discount)/100;
  }

  const bookingData = value.bookings.map((bookingItem, bookingIndex) => {
    return {
      key: bookingIndex,
      ...bookingItem,
    };
  });
  const bookingColumns = [
    {
      title: 'Type of Room',
      dataIndex: 'typeRoomId',
      width: 180,
      key: 'typeRoomId',
      render: (id) => {
        const typeData = typeList.data.find((item) => item.id === id);
        if (typeData) return typeData.name;
      }
    },
    {
      title: 'Price',
      dataIndex: 'typeRoomId',
      width: 100,
      key: 'typeRoomId',
      render: (id) => {
        const typeData = typeList.data.find((item) => item.id === id);
        if (typeData) return (typeData.price ? typeData.price : 0);
      }
    },
    {
      title: 'Discount',
      dataIndex: 'discountCode',
      width: 100,
      key: 'discountCode',
      render: (code) => {
        const discountData = discountList.data.find((item) => item.name === code);
        if (discountData) return (discountData.value ? discountData.value : 0);
        return 0;
      }
    },
    { 
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (value) => {
        if (value === "pending") return <Tag color="processing">Booked</Tag>;
        if (value === "check-in") return <Tag color="green">Checked-In</Tag>;
        if (value === "check-out") return <Tag color="yellow">Checked-Out</Tag>;
        if (value === "canceled") return <Tag color="red">Canceled</Tag>;
      }
    },
    {
      title: 'Number',
      dataIndex: 'number',
      width: 100,
      key: 'number',
      render: () => 1,
    },
    {
      title: 'Total',
      dataIndex: 'sumTotal',
      width: 100,
      key: 'sumTotal',
      render: (_, record) => sumTotal(record),
    },
  ];

  useEffect(() => {
    dispatch(getTypeListAction());
  }, []);

  return (
    <Table
      size="small"
      dataSource={bookingData}
      columns={bookingColumns}
      pagination={false}
      summary={pageDate => {
        const count = pageDate.reduce((result, element) => {
          return result + 1;
        }, 0);
        const sumPrice = pageDate.reduce((result, element) => {
          return result + sumTotal(element);
        }, 0);

        return (
          <Table.Summary.Row style={{ fontWeight: "bold" }}>
              <Table.Summary.Cell>Total</Table.Summary.Cell>
              <Table.Summary.Cell>
              </Table.Summary.Cell>

              <Table.Summary.Cell>
              </Table.Summary.Cell>

              <Table.Summary.Cell>
              </Table.Summary.Cell>

              <Table.Summary.Cell>
                <span>{count}</span>
              </Table.Summary.Cell>
              <Table.Summary.Cell>
                <span>$ {sumPrice}</span>
              </Table.Summary.Cell>
            </Table.Summary.Row>
        )
      }}
      // loading={loading}
      // scroll={{ x: 900 }}
    />
  );
}

export default BookingItem;