import { UserOutlined } from "@ant-design/icons";
import { Avatar, Rate, Tooltip } from "antd";
import moment from "moment";
import React from "react";
import "./Comment.scss";
function CommentItem(props) {
  const { comment } = props;
  return (
    <div className="comment-item">
      <div className="comment__user">
        <div className="user__avatar">
          <Avatar
            size={55}
            src={comment.user?.avatar ? comment.user.avatar : ""}
            icon={!comment.user?.avatar && <UserOutlined />}
          />
        </div>
        <div className="user__name">
          <h4>{comment.user?.fullName ? comment.user.fullName : comment.user.username}</h4>
          <Tooltip title={comment.createdAt && moment(comment.createdAt).format("DD/MM/YYYY")}>
            <small>{comment.createdAt && moment(comment.createdAt).format("DD/MM/YYYY")}</small>
          </Tooltip>
        </div>
      </div>
      {/* <div className="comment__interact">
        <Tooltip key="comment-basic-like" title="Like">
          <span onClick={() => null}>
            <div className="comment__interact-item">
              <span>
                <AiOutlineLike />
              </span>
              <p>{interact.like}</p>
            </div>
          </span>
        </Tooltip>
        <Tooltip key="comment-basic-like" title="Dislike">
          <span onClick={() => null}>
            <div className="comment__interact-item">
              <span>
                <AiOutlineDislike />
              </span>
              <p>{interact.dislike}</p>
            </div>
          </span>
        </Tooltip>
      </div> */}
      <div className="comment__title">{comment.title}</div>
      <div className="comment__description">{comment.review}</div>
      <div className="comment__review">
        <div className="comment__review-item">
          <p>Service </p>
          <Rate disabled allowHalf defaultValue={comment.stars.service} className="rate" />
        </div>
        <div className="comment__review-item">
          <p>Room </p>
          <Rate disabled allowHalf defaultValue={comment.stars.room} className="rate" />
        </div>
        <div className="comment__review-item">
          <p>Cleanness </p>
          <Rate disabled allowHalf defaultValue={comment.stars.cleanness} className="rate" />
        </div>
        <div className="comment__review-item">
          <p>Food </p>
          <Rate disabled allowHalf defaultValue={comment.stars.food} className="rate" />
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
