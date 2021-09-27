import React from "react";
import "./FeatureInfor.scss";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";


function FeatureInfor(props) {
  const { title, money, rate, sub } = props;
  return (
    <>
      <div className="featured__item">
        <div className="featured__title">{title}</div>
        <div className="featured__money">
          <span className="featured__money-number">{money}</span>
          <span className="featured__money-rate">
            {rate}{" "}
            {rate[0] === "-" ? (
              <MdArrowDownward className="downward" />
            ) : (
              <MdArrowUpward className="upward" />
            )}
          </span>
        </div>
        <div className="featured__sub">{sub}</div>
      </div>
    </>
  );
}

export default FeatureInfor;
