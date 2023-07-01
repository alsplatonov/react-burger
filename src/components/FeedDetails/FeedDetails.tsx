import React, { FC } from "react";
import styles from "./FeedDetails.module.css";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import FeedPicture from "../FeedPicture/FeedPicture";
import { IWsOrder } from "../../utils/interfaces";
import { useAppDispatch, useAppSelector } from '../../services/redux-hook';
import { IIngredient } from "../../utils/interfaces";

interface IFeedDetailsProps {
  order: IWsOrder;
}
const FeedDetails: FC<IFeedDetailsProps> = ({ order }) => {

  const location = useLocation();
  const pathname = location.pathname;
  const ingredients = useAppSelector((state) => state.ingredients.items);

  //получим ингредиенты заказа
  const feedIngredient: IIngredient[] = [];
  order.ingredients.forEach((itemId) => {
    ingredients.forEach((item) => {
      if (item._id === itemId) {
        feedIngredient.push(item);
      }
    });
  });

  return (
    <>
      {feedIngredient.length > 0 && (
        <li className={`${styles['feed-item']}`}>
          <Link
            className={`text_color_primary ${styles['feed-item__link']}`}
            to={pathname === "/profile/orders" ? `/profile/orders/${order._id}` : `/feed/${order._id}`}
            state={{ background: location, order: order }}
          >
            <div className={`${styles['feed-header']}`}>
              <p className="text text_type_digits-default mt-6 ml-6">{order.number}</p>
              <FormattedDate
                className="text text_type_main-default text_color_inactive mr-6"
                date={new Date(order.createdAt)}
              />
            </div>
            <p className="text text_type_main-medium ml-6">{order.name}</p>
            <div className={`${styles['feed-ingredients__wrapper']} mb-6`}>
              <ul className={`${styles['feed-ingredients']} ml-10`}>
                {feedIngredient.map((item, index) => {
                  return (
                    <FeedPicture
                      ingredient={item}
                      elemNumber={index}
                      key={index}
                      Counter={feedIngredient.length - 6} //передаем оставшееся кол-во ингредиентов
                    />
                  );
                })}
              </ul>
              <div className={`${styles['feed-price']} mr-6`}>
                <p className={`text text_type_digits-default mr-2`}>
                  {feedIngredient.reduce((sum, item) => sum + item.price, 0)}
                </p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          </Link>
        </li>
      )}
    </>
  );
};

export default FeedDetails;
