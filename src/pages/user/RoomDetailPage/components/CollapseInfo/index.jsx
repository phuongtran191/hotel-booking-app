import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, Pagination } from "antd";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useSelector } from "react-redux";
import CommentItem from "../Comment";
import RoomReviews from "../RoomReviews";
import "./CollapseInfo.scss";
const { Panel } = Collapse;
function CollapseInfo(props) {
  const { RoomDetail } = props;
  const commentList = useSelector((state) => state.typeReducer.commentList.data);
  return (
    <div className="collapse-info">
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        accordion
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      >
        <Panel header="Description" key="1" className="site-collapse-custom-panel">
          <p className="room-detail__description">{RoomDetail.description}</p>
        </Panel>
        <Panel header="Room detail" key="2" className="site-collapse-custom-panel">
          <div className="detail">
            <table>
              <tbody>
                <tr>
                  <td>
                    <div className="table__item">
                      <div className="table__title">Size room:</div>
                      <div className="table__value"> 45 m²/484 ft²</div>
                    </div>
                  </td>
                  <td>
                    <div className="table__item">
                      <div className="table__title">View</div>
                      <div className="table__value"> sea</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="table__item">
                      <div className="table__title">Ensuite Bathroom:</div>
                      <div className="table__value table__value-icon"> <FaCheckCircle /></div>
                    </div>
                  </td>
                  <td>
                    <div className="table__item">
                      <div className="table__title">Free WiFi: </div>
                      <div className="table__value table__value-icon"> <FaCheckCircle /></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="table__item">
                      <div className="table__title">Breakfast Included:</div>
                      <div className="table__value table__value-icon"> <FaCheckCircle /></div>
                    </div>
                  </td>
                  <td>
                    <div className="table__item">
                      <div className="table__title">Gym Access:</div>
                      <div className="table__value"> 24/7</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="table__item">
                      <div className="table__title">Free Airport Pickup:</div>
                      <div className="table__value table__value-cancel"> <MdCancel /></div>
                    </div>
                  </td>
                  <td>
                    <div className="table__item">
                      <div className="table__title">Room Service:</div>
                      <div className="table__value table__value-icon"> <FaCheckCircle /></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="table__item">
                      <div className="table__title">Roof terrace:</div>
                      <div className="table__value table__value-icon"> <FaCheckCircle /></div>
                    </div>
                  </td>
                  <td>
                    <div className="table__item">
                      <div className="table__title">Dryer:</div>
                      <div className="table__value table__value-cancel"> <MdCancel /></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="table__item">
                      <div className="table__title">Balcony:</div>
                      <div className="table__value table__value-icon"> <FaCheckCircle /></div>
                    </div>
                  </td>
                  <td>
                    <div className="table__item">
                      <div className="table__title">Smoking allowed:</div>
                      <div className="table__value table__value-cancel"> <MdCancel /></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="table__item">
                      <div className="table__title">Concrete flooring:</div>
                      <div className="table__value table__value-cancel"> <MdCancel /></div>
                    </div>
                  </td>
                  <td>
                    <div className="table__item">
                      <div className="table__title">Free Parking:</div>
                      <div className="table__value table__value-icon"> <FaCheckCircle /></div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Panel>
        <Panel header="Review" key="3" className="site-collapse-custom-panel">
          <div className="room-detail__review">
            <RoomReviews />
            {commentList.map((comment,index) => (
              <CommentItem comment={comment} key={`comment-${index}`}/>
            ))}

            <div className="room-detail__pagination">
              <Pagination defaultCurrent={1} total={20} size={10} />
            </div>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
}

export default CollapseInfo;
