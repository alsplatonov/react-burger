
import styles from "./FeedStatistics.module.css"
import PropTypes from "prop-types";
import FeedDoneOrders from "../FeedDoneOrders/FeedDoneOrders";
import FeedInProgressOrders from "../FeedInProgressOrders/FeedInProgressOrders";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { wsInitialize, wsClose } from "../../services/actions/webSocket-slice";

export const FeedStatistics = () => {

  const orders = useSelector((state) => state.webSocket.orders);
  const total = useSelector((state) => state.webSocket.total);
  const totalToday = useSelector((state) => state.webSocket.totalToday);


  const ordersDone = orders.filter((item) => item.status === 'done');
  const ordersPending = orders.filter((item) => item.status === 'pending');

  return (
    <div className={`${styles['feed-statistics']}`}>
      <div className={`${styles['feed-orders__wrapper']}`}>
        <FeedDoneOrders ordersDone = {ordersDone}/>
        <FeedInProgressOrders ordersPending = {ordersPending}/>
      </div>
      <div className="mt-20">
        <p className={`text_type_main-medium ${styles['feed-header__text']}`}>
          Выполнено за всё время:
        </p>
        <p className={`text text_type_digits-large ${styles['feed-digits__text']}`}>
          {total}
        </p>
      </div>
      <div className="mt-20">
        <p className={`text_type_main-medium ${styles['feed-header__text']}`}>
          Выполнено за сегодня:
        </p>
        <p className={`text text_type_digits-large ${styles['feed-digits__text']}`}>
          {totalToday}
        </p>
      </div>
    </div>
  );
};


export default FeedStatistics;
