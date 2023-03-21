import styles from "./OrderDetails.module.css";

const OrderDetails = (props) => {
  return (
    <div className={`${styles['order-details']} pt-30 pb-30 pr-25 pl-25`}>
      <p className="text text_type_digits-large">034536</p>
      <p className="text text_type_main-medium mt-8 mb-15">идентификатор заказа</p>
      <div className={`${styles['order-details__icon-wrapper']}`}>
      </div>
      <p className="text text_type_main-default mt-15 mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

export default OrderDetails;

