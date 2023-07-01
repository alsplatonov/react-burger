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
import { wsInitialize, wsInitializeCurrentUser, wsCloseConnect, cleanState } from "../../services/actions/webSocket-slice";
import { getCookie } from "../../utils/cookie";
import { useAppDispatch, useAppSelector } from '../../services/redux-hook';
import { IWsOrder } from "../../utils/interfaces";

export const FeedList = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const pathname = location.pathname;
  const orders = useAppSelector((state) => state.webSocket.orders);

  useEffect(() => {
    if (pathname === '/profile/orders') {
      dispatch(cleanState());
    }
    if (pathname.includes('/profile/orders')) {
      dispatch(
        wsInitializeCurrentUser(
          `wss://norma.nomoreparties.space/orders?token=${getCookie(
            "accessToken"
          )}`
        )
      );
      return () => {
        dispatch(wsCloseConnect());
      };
    }

  }, [pathname, dispatch]);

  let sortedArray = false;
  if (pathname.includes('/profile/orders')) {
    sortedArray = true;
  }

  // Функция сравнения для сортировки по убыванию createdAt
  const compareCreatedAt = (a:IWsOrder, b:IWsOrder) => {
    if (a.createdAt > b.createdAt) {
      return -1;
    }
    if (a.createdAt > b.createdAt) {
      return 1;
    }
    return 0;
  };
  let sortedOrders:IWsOrder[] = [];
  if (sortedArray && orders && orders.length > 0) {
    sortedOrders = orders.slice().sort(compareCreatedAt);
  }


  const allIngredients = useAppSelector((state) => state.ingredients.items);
  if (allIngredients.length === 0 || !orders || orders.length === 0) {
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
