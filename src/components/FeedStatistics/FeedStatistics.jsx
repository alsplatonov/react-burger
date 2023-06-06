
import styles from "./FeedStatistics.module.css"
import PropTypes from "prop-types";
import FeedDoneOrders from "../FeedDoneOrders/FeedDoneOrders";
import FeedInProgressOrders from "../FeedInProgressOrders/FeedInProgressOrders";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { wsInitialize, wsClose } from "../../services/actions/webSocket-slice";

export const FeedStatistics = () => {

  const dispatchAction = useDispatch();

  const orders = useSelector((state) => state.webSocket.orders);
  const wsError = useSelector((state) => state.webSocket.wsError);
  const total = useSelector((state) => state.webSocket.total);
  const totalToday = useSelector((state) => state.webSocket.totalToday);


  const ordersDone = orders.filter((item) => item.status === 'done');
  const ordersPending = orders.filter((item) => item.status === 'pending');

    console.log("ordersDone =:", ordersDone);
      console.log("ordersPending =:", ordersPending);
  // const ordersDone = [
  //   {
  //     ingredients: [
  //       "643d69a5c3f7b9001cfa093c",
  //       "643d69a5c3f7b9001cfa0943",
  //       "643d69a5c3f7b9001cfa0945",
  //       "643d69a5c3f7b9001cfa093e",
  //       "643d69a5c3f7b9001cfa0940",
  //       "643d69a5c3f7b9001cfa0947",
  //       "643d69a5c3f7b9001cfa094a"
  //     ],
  //     _id: "111",
  //     status: "done",
  //     number: 111,
  //     createdAt: "2021-06-23T14:43:22.587Z",
  //     updatedAt: "2021-06-23T14:43:22.603Z"
  //   },
  //   {
  //     ingredients: [
  //       "643d69a5c3f7b9001cfa093c",
  //       "643d69a5c3f7b9001cfa0943",
  //       "643d69a5c3f7b9001cfa0945",
  //       "643d69a5c3f7b9001cfa093e",
  //       "643d69a5c3f7b9001cfa0940",
  //       "643d69a5c3f7b9001cfa0947",
  //       "643d69a5c3f7b9001cfa094a"
  //     ],
  //     _id: "222",
  //     status: "done",
  //     number: 222,
  //     createdAt: "2021-06-23T14:43:22.587Z",
  //     updatedAt: "2021-06-23T14:43:22.603Z"
  //   },
  //   {
  //     ingredients: [
  //       "643d69a5c3f7b9001cfa093c",
  //       "643d69a5c3f7b9001cfa0943",
  //       "643d69a5c3f7b9001cfa0945",
  //       "643d69a5c3f7b9001cfa093e",
  //       "643d69a5c3f7b9001cfa0940",
  //       "643d69a5c3f7b9001cfa0947",
  //       "643d69a5c3f7b9001cfa094a"
  //     ],
  //     _id: "333",
  //     status: "done",
  //     number: 333,
  //     createdAt: "2021-06-23T14:43:22.587Z",
  //     updatedAt: "2021-06-23T14:43:22.603Z"
  //   },
  //   {
  //     ingredients: [
  //       "643d69a5c3f7b9001cfa093c",
  //       "643d69a5c3f7b9001cfa0943",
  //       "643d69a5c3f7b9001cfa0945",
  //       "643d69a5c3f7b9001cfa093e",
  //       "643d69a5c3f7b9001cfa0940",
  //       "643d69a5c3f7b9001cfa0947",
  //       "643d69a5c3f7b9001cfa094a"
  //     ],
  //     _id: "444",
  //     status: "done",
  //     number: 444,
  //     createdAt: "2021-06-23T14:43:22.587Z",
  //     updatedAt: "2021-06-23T14:43:22.603Z"
  //   },
  //   {
  //     ingredients: [
  //       "643d69a5c3f7b9001cfa093c",
  //       "643d69a5c3f7b9001cfa0943",
  //       "643d69a5c3f7b9001cfa0945",
  //       "643d69a5c3f7b9001cfa093e",
  //       "643d69a5c3f7b9001cfa0940",
  //       "643d69a5c3f7b9001cfa0947",
  //       "643d69a5c3f7b9001cfa094a"
  //     ],
  //     _id: "555",
  //     status: "done",
  //     number: 555,
  //     createdAt: "2021-06-23T14:43:22.587Z",
  //     updatedAt: "2021-06-23T14:43:22.603Z"
  //   },
  //   {
  //     ingredients: [
  //       "643d69a5c3f7b9001cfa093c",
  //       "643d69a5c3f7b9001cfa0943",
  //       "643d69a5c3f7b9001cfa0945",
  //       "643d69a5c3f7b9001cfa093e",
  //       "643d69a5c3f7b9001cfa0940",
  //       "643d69a5c3f7b9001cfa0947",
  //       "643d69a5c3f7b9001cfa094a"
  //     ],
  //     _id: "666",
  //     status: "done",
  //     number: 666,
  //     createdAt: "2021-06-23T14:43:22.587Z",
  //     updatedAt: "2021-06-23T14:43:22.603Z"
  //   },
  //   {
  //     ingredients: [
  //       "643d69a5c3f7b9001cfa093c",
  //       "643d69a5c3f7b9001cfa0943",
  //       "643d69a5c3f7b9001cfa0945",
  //       "643d69a5c3f7b9001cfa093e",
  //       "643d69a5c3f7b9001cfa0940",
  //       "643d69a5c3f7b9001cfa0947",
  //       "643d69a5c3f7b9001cfa094a"
  //     ],
  //     _id: "777",
  //     status: "done",
  //     number: 777,
  //     createdAt: "2021-06-23T14:43:22.587Z",
  //     updatedAt: "2021-06-23T14:43:22.603Z"
  //   }
  // ];


  // const ordersPending = [
  //   {
  //     ingredients: [
  //       "643d69a5c3f7b9001cfa093c",
  //       "643d69a5c3f7b9001cfa0943",
  //       "643d69a5c3f7b9001cfa0945",
  //       "643d69a5c3f7b9001cfa093e",
  //       "643d69a5c3f7b9001cfa0940",
  //       "643d69a5c3f7b9001cfa0947",
  //       "643d69a5c3f7b9001cfa094a"
  //     ],
  //     _id: "111",
  //     status: "pending",
  //     number: 111,
  //     createdAt: "2021-06-23T14:43:22.587Z",
  //     updatedAt: "2021-06-23T14:43:22.603Z"
  //   },
  //   {
  //     ingredients: [
  //       "643d69a5c3f7b9001cfa093c",
  //       "643d69a5c3f7b9001cfa0943",
  //       "643d69a5c3f7b9001cfa0945",
  //       "643d69a5c3f7b9001cfa093e",
  //       "643d69a5c3f7b9001cfa0940",
  //       "643d69a5c3f7b9001cfa0947",
  //       "643d69a5c3f7b9001cfa094a"
  //     ],
  //     _id: "222",
  //     status: "pending",
  //     number: 222,
  //     createdAt: "2021-06-23T14:43:22.587Z",
  //     updatedAt: "2021-06-23T14:43:22.603Z"
  //   },
  //   {
  //     ingredients: [
  //       "643d69a5c3f7b9001cfa093c",
  //       "643d69a5c3f7b9001cfa0943",
  //       "643d69a5c3f7b9001cfa0945",
  //       "643d69a5c3f7b9001cfa093e",
  //       "643d69a5c3f7b9001cfa0940",
  //       "643d69a5c3f7b9001cfa0947",
  //       "643d69a5c3f7b9001cfa094a"
  //     ],
  //     _id: "333",
  //     status: "pending",
  //     number: 333,
  //     createdAt: "2021-06-23T14:43:22.587Z",
  //     updatedAt: "2021-06-23T14:43:22.603Z"
  //   },
  //   {
  //     ingredients: [
  //       "643d69a5c3f7b9001cfa093c",
  //       "643d69a5c3f7b9001cfa0943",
  //       "643d69a5c3f7b9001cfa0945",
  //       "643d69a5c3f7b9001cfa093e",
  //       "643d69a5c3f7b9001cfa0940",
  //       "643d69a5c3f7b9001cfa0947",
  //       "643d69a5c3f7b9001cfa094a"
  //     ],
  //     _id: "444",
  //     status: "pending",
  //     number: 444,
  //     createdAt: "2021-06-23T14:43:22.587Z",
  //     updatedAt: "2021-06-23T14:43:22.603Z"
  //   },
  //   {
  //     ingredients: [
  //       "643d69a5c3f7b9001cfa093c",
  //       "643d69a5c3f7b9001cfa0943",
  //       "643d69a5c3f7b9001cfa0945",
  //       "643d69a5c3f7b9001cfa093e",
  //       "643d69a5c3f7b9001cfa0940",
  //       "643d69a5c3f7b9001cfa0947",
  //       "643d69a5c3f7b9001cfa094a"
  //     ],
  //     _id: "555",
  //     status: "pending",
  //     number: 555,
  //     createdAt: "2021-06-23T14:43:22.587Z",
  //     updatedAt: "2021-06-23T14:43:22.603Z"
  //   },
  //   {
  //     ingredients: [
  //       "643d69a5c3f7b9001cfa093c",
  //       "643d69a5c3f7b9001cfa0943",
  //       "643d69a5c3f7b9001cfa0945",
  //       "643d69a5c3f7b9001cfa093e",
  //       "643d69a5c3f7b9001cfa0940",
  //       "643d69a5c3f7b9001cfa0947",
  //       "643d69a5c3f7b9001cfa094a"
  //     ],
  //     _id: "666",
  //     status: "pending",
  //     number: 666,
  //     createdAt: "2021-06-23T14:43:22.587Z",
  //     updatedAt: "2021-06-23T14:43:22.603Z"
  //   },
  //   {
  //     ingredients: [
  //       "643d69a5c3f7b9001cfa093c",
  //       "643d69a5c3f7b9001cfa0943",
  //       "643d69a5c3f7b9001cfa0945",
  //       "643d69a5c3f7b9001cfa093e",
  //       "643d69a5c3f7b9001cfa0940",
  //       "643d69a5c3f7b9001cfa0947",
  //       "643d69a5c3f7b9001cfa094a"
  //     ],
  //     _id: "777",
  //     status: "pending",
  //     number: 777,
  //     createdAt: "2021-06-23T14:43:22.587Z",
  //     updatedAt: "2021-06-23T14:43:22.603Z"
  //   }
  // ];


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

// FeedStatistics.propTypes = {
//   orders: PropTypes.array.isRequired,
//   total: PropTypes.number.isRequired,
//   totalToday: PropTypes.number.isRequired,
// };

export default FeedStatistics;
