import React from "react";
import { useEffect } from "react";
import styles from "./Feed.module.css";
import FeedList from "../../components/FeedList/FeedList";
import FeedStatistics from "../../components/FeedStatistics/FeedStatistics";
import { useDispatch, useSelector } from "react-redux";
import { wsInitialize, wsInitializeCurrentUser, wsCloseConnect, cleanState } from "../../services/actions/webSocket-slice";
import { useLocation } from "react-router";
import { useAppDispatch, useAppSelector } from '../../services/redux-hook';

const Feed = () => {

  const orders = useAppSelector(state => state.webSocket.orders);
  const wsError = useAppSelector(state => state.webSocket.wsError);
  const location = useLocation();
  const pathname = location.pathname;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (pathname.includes('/feed')) {
      dispatch(wsInitialize());
      return () => {
        dispatch(wsCloseConnect());
      };
    }

  }, [pathname, dispatch]);


  return (
    <>
      {orders && orders.length > 0 && !wsError && (
        <section className={`${styles['feed']} mt-10`}>
          <h1 className="text text_type_main-large mb-5 pr-4">Лента заказов</h1>
          <div className={`${styles['feed-wrapper']}`}>
            <FeedList />
            <FeedStatistics />
          </div>
        </section>
      )}
    </>
  );
};

export default Feed;
