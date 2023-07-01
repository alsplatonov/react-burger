import React, { FC } from "react";
import styles from "./FeedDoneOrders.module.css"
import { IWsOrder } from "../../utils/interfaces";

interface IFeedDoneOrders {
  ordersDone: IWsOrder[];
}

const FeedDoneOrders: FC<IFeedDoneOrders> = ({ ordersDone }) => {

  return (
    <div className={styles.orders}>
      <p className={`${styles['orders-header__text']} text_type_main-medium mb-6`}>Готовы:</p>
      <ul className={`${styles['order__list']}`}>
        {ordersDone.map((order) => {
          return (
            <li
              key={order.number}
              className={`text text_type_digits-default ${styles['order__list_done']}`}
            >
              {order.number}
            </li>
          );
        })}
      </ul>
    </div>
  );
};


export default FeedDoneOrders;
