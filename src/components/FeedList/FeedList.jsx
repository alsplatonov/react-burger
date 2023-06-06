import React from "react";
import styles from "./FeedList.module.css";
import { useLocation, Link } from "react-router-dom";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import FeedPicture from "../FeedPicture/FeedPicture";
import FeedDetails from "../FeedDetails/FeedDetails";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { wsInitialize, wsClose } from "../../services/actions/webSocket-slice";

export const FeedList = () => {
  const dispatchAction = useDispatch();
  const location = useLocation();
  const pathname = location.pathname;
  // console.log("location =:", location);
  // console.log("pathname =:", pathname);
  const orders = useSelector((state) => state.webSocket.orders);
  const wsError = useSelector((state) => state.webSocket.wsError);


  // const orders = [
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
  //     number: 0,
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
  //     number: 0,
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
  //     number: 0,
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
  //     number: 0,
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
  //     number: 0,
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
  //     number: 0,
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
  //     number: 0,
  //     createdAt: "2021-06-23T14:43:22.587Z",
  //     updatedAt: "2021-06-23T14:43:22.603Z"
  //   }
  // ];

  const allIngredients = useSelector((state) => state.ingredients.items);

  if (allIngredients.length === 0 || orders.length === 0) {
    return <div>Загрузка...</div>;
  }


  //получим ингредиенты заказа
  // const feedIngredient = [];
  // orders[0].ingredients.forEach((itemId) => {
  //   ingredients.forEach((item) => {
  //     if (item._id === itemId) {
  //       feedIngredient.push(item);
  //     }
  //   });
  // });

  // console.log("feedIngredient =:", feedIngredient);

  return (
    <ul className={`${styles['feed-list']}`}>
      {orders.length > 0 &&
        orders.map((order) => (
          <FeedDetails
            order={order}
            key={order.number}
          />
        ))
      }
    </ul>
  );
};

export default FeedList;
