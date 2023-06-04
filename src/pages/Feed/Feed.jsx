import React from "react";
import styles from "./Feed.module.css";
import FeedList from "../../components/FeedList/FeedList";

const Feed = () => {
  return (
    <>
      <section className={`${styles['feed']} mt-40`}>
        <div className={`${styles['feed-wrapper']}`}>
          <h1 className="text text_type_main-large mb-5 pr-4">Лента заказов</h1>
          <FeedList /></div>
      </section>
    </>
  );
};

export default Feed;
