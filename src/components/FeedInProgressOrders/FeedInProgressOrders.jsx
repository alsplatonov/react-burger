
import styles from "./FeedInProgressOrders.module.css"
import PropTypes from "prop-types";

export const FeedInProgressOrders = ({ordersPending}) => {

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


FeedInProgressOrders.propTypes = {
  ordersPending: PropTypes.array.isRequired,
};

export default FeedInProgressOrders;
