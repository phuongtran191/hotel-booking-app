// export const BOOKING_ACTION = {
//   CREATE_BOOKING: "BOOKING_ROOM",
//   GET_LIST_BOOKING: "GET_LIST_BOOKING",
// }

export const checkVariable = (checkIn, checkOut, listBooking, listRoom) => {
// console.log("🚀 ~ file: booking.constant.js ~ line 7 ~ checkVariable ~ listRoom", listRoom)
// console.log("🚀 ~ file: booking.constant.js ~ line 7 ~ checkVariable ~ listBooking", listBooking)
  var listVariable = {};
  for (var i = 0; i < listRoom.length; i++) {
    var check = true;
    for (var j = 0; j < listBooking.length; j++) {
      if (listRoom[i].id === listBooking[j].roomId) {
        if ((checkIn >= listBooking[j].checkIn) && (checkIn <= listBooking[j].checkOut)) {
          check = false;
          break;
        }
        if ((checkIn <= listBooking[j].checkIn) && (checkOut >= listBooking[j].checkIn)) {
          check = false;
          break;
        }
      }
    }
    if (check === true) {
      if (Array.isArray(listVariable[listRoom[i].typeRoomId])) {
        listVariable[listRoom[i].typeRoomId].push(listRoom[i].id);
      } else {
        listVariable[listRoom[i].typeRoomId] = [listRoom[i].id];

      }
    }
  }

  return listVariable;
}

export const BOOKING_ACTION = {
  BOOKING: "BOOKING_ROOM",
  
  GET_BOOKING_LIST: 'GET_BOOKING_LIST',
  GET_FILTER_BOOKING_LIST:"GET_FILTER_BOOKING_LIST",
  GET_BOOKING_DETAIL: 'GET_BOOKING_DETAIL',
  CREATE_BOOKING: 'CREATE_BOOKING',
  PENDING_BOOKING: 'PENDING_BOOKING',
  CHECK_IN_BOOKING: 'CHECK_IN_BOOKING',
  CHECK_OUT_BOOKING: 'CHECK_OUT_BOOKING',
  CANCEL_BOOKING: 'CANCEL_BOOKING',
  EDIT_BOOKING: 'EDIT_BOOKING',
};