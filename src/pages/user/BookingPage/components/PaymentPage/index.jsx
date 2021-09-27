import { PAYMENT } from "constants/index";
import React from "react";
import { useTranslation } from "react-i18next";
import "./BookingPage.scss";
function PaymentPage(props) {
  const {handleBooking} =props;
  const { t } = useTranslation();

  return (
    <>
      <div className="booking__left">
        <div className="booking__title">{t("Payments")}</div>
        <p className="booking__description">Please choose your payment method</p>
        <div className="payment__list">
          {PAYMENT.map((paymentItem, index) => (
            <div className="payment__item" key={`payment__item-${index}`}>
              <div className="payment__item-left">
                <input
                  type="radio"
                  name="payment"
                  id={`payment-${index}`}
                  value={paymentItem.title}
                />
                <label htmlFor={`payment-${index}`} className="payment__item-content">
                  <h1>{paymentItem.title}</h1>
                  <p>{paymentItem.content}</p>
                </label>
              </div>
              <div className="payment__item-right">
                <div className="payment__item-img">
                  <img
                    src={paymentItem.image}
                    alt=""
                    style={
                      paymentItem.title === "MoMo" ? { width: "3rem", marginLeft: "3rem" } : {}
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="btn-payNow" onClick={()=>handleBooking()}>
          Pay Now
          <span>
            <i className=" fa fa-angle-double-right"></i>
          </span>
        </button>
      </div>
    </>
  );
}

export default PaymentPage;
