import React, { FC } from "react";
import styles from "./FeedInProgressOrders.module.css"
import { IWsOrder } from "../../utils/interfaces";

interface IFeedInProgressOrders {
  ordersPending: IWsOrder[];
}
const FeedInProgressOrders: FC<IFeedInProgressOrders> = ({ ordersPending }) => {

  return (
    <div className={styles.orders}>
      <p className={`${styles['orders-header__text']} text_type_main-medium mb-6`}>В работе:</p>
      <ul className={`${styles['order__list']}`}>
        {ordersPending.map((order) => {
          return (
            <li
              key={order.number}
              className={`text text_type_digits-default ${styles['order__list_inProgress']}`}
            >
              {order.number}
            </li>
          );
        })}
      </ul>
    </div>
  );
};


export default FeedInProgressOrders;
