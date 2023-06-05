import React from "react";
import styles from "./FeedList.module.css";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import FeedPicture from "../FeedPicture/FeedPicture";

export const FeedList = () => {

  const location = useLocation();
  const pathname = location.pathname;
  console.log("location =:", location);
  console.log("pathname =:", pathname);
  const orders = [
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0943",
        "643d69a5c3f7b9001cfa0945",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0940",
        "643d69a5c3f7b9001cfa0947",
        "643d69a5c3f7b9001cfa094a"
      ],
      _id: "111",
      status: "done",
      number: 0,
      createdAt: "2021-06-23T14:43:22.587Z",
      updatedAt: "2021-06-23T14:43:22.603Z"
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0943",
        "643d69a5c3f7b9001cfa0945",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0940",
        "643d69a5c3f7b9001cfa0947",
        "643d69a5c3f7b9001cfa094a"
      ],
      _id: "222",
      status: "done",
      number: 0,
      createdAt: "2021-06-23T14:43:22.587Z",
      updatedAt: "2021-06-23T14:43:22.603Z"
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0943",
        "643d69a5c3f7b9001cfa0945",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0940",
        "643d69a5c3f7b9001cfa0947",
        "643d69a5c3f7b9001cfa094a"
      ],
      _id: "333",
      status: "done",
      number: 0,
      createdAt: "2021-06-23T14:43:22.587Z",
      updatedAt: "2021-06-23T14:43:22.603Z"
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0943",
        "643d69a5c3f7b9001cfa0945",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0940",
        "643d69a5c3f7b9001cfa0947",
        "643d69a5c3f7b9001cfa094a"
      ],
      _id: "444",
      status: "done",
      number: 0,
      createdAt: "2021-06-23T14:43:22.587Z",
      updatedAt: "2021-06-23T14:43:22.603Z"
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0943",
        "643d69a5c3f7b9001cfa0945",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0940",
        "643d69a5c3f7b9001cfa0947",
        "643d69a5c3f7b9001cfa094a"
      ],
      _id: "555",
      status: "done",
      number: 0,
      createdAt: "2021-06-23T14:43:22.587Z",
      updatedAt: "2021-06-23T14:43:22.603Z"
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0943",
        "643d69a5c3f7b9001cfa0945",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0940",
        "643d69a5c3f7b9001cfa0947",
        "643d69a5c3f7b9001cfa094a"
      ],
      _id: "666",
      status: "done",
      number: 0,
      createdAt: "2021-06-23T14:43:22.587Z",
      updatedAt: "2021-06-23T14:43:22.603Z"
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0943",
        "643d69a5c3f7b9001cfa0945",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0940",
        "643d69a5c3f7b9001cfa0947",
        "643d69a5c3f7b9001cfa094a"
      ],
      _id: "777",
      status: "done",
      number: 0,
      createdAt: "2021-06-23T14:43:22.587Z",
      updatedAt: "2021-06-23T14:43:22.603Z"
    }
  ];

  const ingredients = useSelector((state) => state.ingredients.items);

  //получим ингредиенты заказа
  const feedIngredient = [];
  orders[0].ingredients.forEach((itemId) => {
    ingredients.forEach((item) => {
      if (item._id === itemId) {
        feedIngredient.push(item);
      }
    });
  });

  // console.log("currentIngredient =:", feedIngredient);

  return (
    <ul className={`${styles['feed-list']}`}>
      {feedIngredient.length > 0 &&
        orders.map((order) => (
          <li className={`${styles['feed-item']}`} key={order._id}>
            <Link
              className={`text_color_primary ${styles['feed-item__link']}`}
              // to={`/profile/orders/${order._id}`}
              to = {pathname === "/profile/orders" ? `/profile/orders/${order._id}` : `/feed/${order._id}`}
              state={{ background: location, order: order }}
            >
              <div className={`${styles['feed-header']}`}>
                <p className="text text_type_digits-default mt-6 ml-6">{555}</p>
                <FormattedDate
                  className="text text_type_main-default text_color_inactive mr-6"
                  date={new Date(order.createdAt)}
                />
              </div>
              <p className="text text_type_main-medium ml-6">название</p>
              <div className={`${styles['feed-ingredients__wrapper']} mb-6`}>
                <ul className={`${styles['feed-ingredients']} ml-10`}>
                  {feedIngredient.map((item, index) => {
                    return (
                      <FeedPicture
                        ingredient={item}
                        elemNumber={index}
                        key={item._id}
                        Counter={feedIngredient.length - 6} //передаем оставшееся кол-во ингредиентов
                      />
                    );
                  })}
                </ul>
                <div className={`${styles['feed-price']} mr-6`}>
                  <p className={`text text_type_digits-default mr-2`}>
                    111000
                  </p>
                  <CurrencyIcon />
                </div>
              </div>
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default FeedList;
