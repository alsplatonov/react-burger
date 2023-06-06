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
import { wsInitialize, wsInitializeCurrentUser, wsCloseConnect } from "../../services/actions/webSocket-slice";
import { getCookie } from "../../utils/cookie";

export const FeedList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname;
  const orders = useSelector((state) => state.webSocket.orders);
  const wsError = useSelector((state) => state.webSocket.wsError);


  useEffect(() => {
    if (pathname === '/profile/orders') {
      dispatch(wsCloseConnect());
      dispatch(
        wsInitializeCurrentUser(
          `wss://norma.nomoreparties.space/orders?token=${getCookie(
            "accessToken"
          )}`
        )
      );
    }
  }, []);


  let sortedArray = false;
  if (pathname === '/profile/orders') {
    sortedArray = true;
  }
  console.log("sortedArray =:", sortedArray);

  // Функция сравнения для сортировки по возрастанию createdAt
  const compareCreatedAt = (a, b) => {
    if (a.createdAt > b.createdAt) {
      return -1;
    }
    if (a.createdAt > b.createdAt) {
      return 1;
    }
    return 0;
  };
  let sortedOrders = [];
  if (sortedArray) {
    sortedOrders = orders.slice().sort(compareCreatedAt);
    // console.log("sortedOrders =:", sortedOrders);
  }
  // Сортировка массива объектов по возрастанию createdAt

  const allIngredients = useSelector((state) => state.ingredients.items);

  if (allIngredients.length === 0 || orders.length === 0) {
    return <div>Загрузка...</div>;
  }

  return (
    <ul className={`${styles['feed-list']}`}>
      {sortedArray && sortedOrders.length > 0 && (
        sortedOrders.map((order) => (
          <FeedDetails
            order={order}
            key={order.number}
          />
        )))
      }

      {!sortedArray && orders.length > 0 && (
        orders.map((order) => (
          <FeedDetails
            order={order}
            key={order.number}
          />
        ))
      )}
    </ul>
  );
};

export default FeedList;
