import styles from "./FeedExtensions.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { modalActions } from '../../services/actions/modal-slice';
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { wsInitialize, wsInitializeCurrentUser, wsCloseConnect, cleanState } from "../../services/actions/webSocket-slice";
import { getCookie } from "../../utils/cookie";
import { useAppDispatch, useAppSelector } from '../../services/redux-hook';
import { IIngredient, IWsOrder } from "../../utils/interfaces";
export const FeedExtensions = () => {

  const orders: IWsOrder[] = useAppSelector((state) => state.webSocket.orders);
  const location = useLocation();
  const background = location.state?.background;
  const pathname = location.pathname;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (pathname.includes('/feed')) {
      dispatch(wsInitialize());
    }
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
    }
    return () => {
      dispatch(wsCloseConnect());
    };

  }, [pathname, dispatch]);

  const { id } = useParams();

  const allIngredients = useAppSelector((state) => state.ingredients.items);

  const onOpenModal = () => {
    dispatch(modalActions.toggleModal()); //указываем состояние isOpenModal = true
  };

  if (allIngredients.length === 0 || !orders || orders.length === 0) {
    return <div>Загрузка...</div>;
  }


  const currentOrder = orders.find((i) => i._id === id); // получим искомый заказ
  let currentOrderIngredients: IIngredient[] = [];
  if (currentOrder) {
    currentOrderIngredients = currentOrder.ingredients
      .map((ingredient) => allIngredients.find((item) => item._id === ingredient))
      .filter((ingredient) => ingredient !== undefined) as IIngredient[];
  }



  const uniqueCurrentOrderIngredients: IIngredient[] = [];
  const uniqueIds: { [key: string]: boolean } = {};

  currentOrderIngredients.forEach((ingredient) => {
    if (!uniqueIds[ingredient._id]) {
      uniqueIds[ingredient._id] = true;
      uniqueCurrentOrderIngredients.push(ingredient);
    }
  });


  const orderStat = () => {
    if (currentOrder) {
      switch (currentOrder.status) {
        case "done":
          return "Выполнен";
        case "pending":
          return "В работе";
        case "created":
          return "создан";
        default:
          return '';
      }
    }
    return '';
  }


  return (
    <>
      <section className={background ? `${styles['feed-extensions_background']}` : `${styles['feed-extensions']}`}>
        <p className={`text text_type_digits-default mb-10 mt-4 ${styles['feed-extensions__order-number']}`}>#{currentOrder?.number}</p>

        <p className="text text_type_main-medium mb-3">{currentOrder?.name}</p>
        <p className={`text_type_main-small mb-15 ${styles['feed-extensions__order-status']}`}>
          {orderStat()}
        </p>
        <p className="text text_type_main-medium mb-6">Состав: </p>
        <ul className={`${styles['feed-extensions__ingredients-list']}`} >
          {uniqueCurrentOrderIngredients.map((item, index) => {
            return (
              <li className={`${styles['feed-extensions__ingredient']} pr-2`} key={index} onClick={onOpenModal}>
                <div className={`${styles['feed-extensions__picture-wrapper']}`}>
                  <img
                    src={item.image_mobile}
                    className={`${styles['feed-extensions__picture']}`}
                    alt={item.name}
                  ></img>
                </div>
                <p className={`text text_type_main-default`}>
                  {item.name}
                </p>
                <div className={`${styles['feed-extensions__price-ingredient']}`} >
                  <p className="text text_type_digits-default pr-2">
                    {/* фильтр по id для получения агрегированного кол-ва каждого ингредиента в заказа */}
                    {currentOrderIngredients.filter((ingredient) => ingredient._id === item._id).length} x {item.price}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            )
          })}
        </ul>
        <div className={`${styles['feed-extensions__footer']} mt-10 mb-10`} >

          {currentOrder?.createdAt ? (
            <FormattedDate
              className="text text_type_main-default text_color_inactive mr-6"
              date={new Date(currentOrder.createdAt)}
            />
          ) : (
            <span>Неверный формат даты!</span>
          )}
          <div className={`${styles['feed-extensions__price-ingredient']}`} >
            <p className="text text_type_digits-default mr-2">{currentOrderIngredients.reduce((sum, item) => sum + item.price, 0)}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </section>

    </>
  )
};

export default FeedExtensions;