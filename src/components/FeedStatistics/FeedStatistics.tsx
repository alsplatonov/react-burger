
import styles from "./FeedStatistics.module.css"
import FeedDoneOrders from "../FeedDoneOrders/FeedDoneOrders";
import FeedInProgressOrders from "../FeedInProgressOrders/FeedInProgressOrders";
import { useAppDispatch, useAppSelector } from '../../services/redux-hook';

export const FeedStatistics = () => {

  const orders = useAppSelector((state) => state.webSocket.orders);
  const total = useAppSelector((state) => state.webSocket.total);
  const totalToday = useAppSelector((state) => state.webSocket.totalToday);


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
