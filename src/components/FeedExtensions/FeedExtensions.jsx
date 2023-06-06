import styles from "./FeedExtensions.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { modalActions } from '../../services/actions/modal-slice';
import { burgerIngredientsActions } from '../../services/actions/ingredients-slice';
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { wsInitialize, wsClose } from "../../services/actions/webSocket-slice";

export const FeedExtensions = () => {

  const orders = useSelector((state) => state.webSocket.orders);
  const wsError = useSelector((state) => state.webSocket.wsError);


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(wsInitialize());
  }, []);

  const { id } = useParams();
  const dispatchAction = useDispatch();
  const isOpenModal = useSelector((state) => state.modal.IsOpenModal);
  const allIngredients = useSelector((state) => state.ingredients.items);

  const location = useLocation();
  const background = location.state?.background;
  // console.log("background =:", background);

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



  const onOpenModal = (item) => {
    dispatchAction(modalActions.toggleModal()); //указываем состояние isOpenModal = true
  };


  console.log("allIngredients =:", allIngredients);
  console.log("orders =:", orders);

  // console.log("currentOrder =:", currentOrder);
  // console.log("currentOrderIngredients =:", currentOrderIngredients);

  if (allIngredients.length === 0 || orders.length === 0) {
    return <div>Загрузка...</div>;
  }

  const currentOrder = orders.find((i) => i._id === id); //получим искомый заказ
  console.log("currentOrder =:", currentOrder);

  const currentOrderIngredients = currentOrder.ingredients.map((ingredient) => //ингредиенты текущего заказа
    allIngredients.find((item) => item._id === ingredient)
  );

  console.log("currentOrderIngredients =:", currentOrderIngredients);

  const uniqueCurrentOrderIngredients = [];
  const uniqueIds = {};

  currentOrderIngredients.forEach((ingredient) => {
    if (!uniqueIds[ingredient._id]) {
      uniqueIds[ingredient._id] = true;
      uniqueCurrentOrderIngredients.push(ingredient);
    }
  });

  console.log("uniqueCurrentOrderIngredients =:", uniqueCurrentOrderIngredients);

  const orderStat = () => {
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

  return (
    <>
      <section className={background ? `${styles['feed-extensions_background']}` : `${styles['feed-extensions']}`}>
        <p className={`text text_type_digits-default mb-10 mt-4 ${styles['feed-extensions__order-number']}`}>#{currentOrder.number}</p>

        <p className="text text_type_main-medium mb-3">{currentOrder.name}</p>
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
                  <CurrencyIcon />
                </div>
              </li>
            )
          })}
        </ul>
        <div className={`${styles['feed-extensions__footer']} mt-10 mb-10`} >
          <FormattedDate
            className="text text_type_main-default text_color_inactive mr-6"
            date={new Date(currentOrder.createdAt)}
          />
          <div className={`${styles['feed-extensions__price-ingredient']}`} >
            <p className="text text_type_digits-default mr-2">{currentOrderIngredients.reduce((sum, item) => sum + item.price, 0)}</p>
            <CurrencyIcon />
          </div>
        </div>
      </section>

    </>
  )
};

export default FeedExtensions;