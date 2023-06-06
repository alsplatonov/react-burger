import React from "react";
import { useEffect } from "react";
import styles from "./Feed.module.css";
import FeedList from "../../components/FeedList/FeedList";
import FeedStatistics from "../../components/FeedStatistics/FeedStatistics";
import { useDispatch, useSelector } from "react-redux";
import { wsInitialize, wsClose } from "../../services/actions/webSocket-slice";

const Feed = () => {

  const orders = useSelector((state) => state.webSocket.orders);
  const wsError = useSelector((state) => state.webSocket.wsError);
  // console.log(orders);


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(wsInitialize());
  }, []);

  console.log(orders);
  return (
    <>
      {orders.length > 0 && !wsError && (
          <section className={`${styles['feed']} mt-10`}>
            <h1 className="text text_type_main-large mb-5 pr-4">Лента заказов</h1>
            <div className={`${styles['feed-wrapper']}`}>
              <FeedList />
              <FeedStatistics />
            </div>
          </section>

        )
      }
    </>

  );
};

export default Feed;
