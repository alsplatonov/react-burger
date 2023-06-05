import styles from "./FeedExtensions.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { modalActions } from '../../services/actions/modal-slice';
import { burgerIngredientsActions } from '../../services/actions/ingredients-slice';
import { useLocation } from "react-router";
export const FeedExtensions = () => {

  const { id } = useParams();
  const dispatchAction = useDispatch();
  const isOpenModal = useSelector((state) => state.modal.IsOpenModal);
  const allIngredients = useSelector((state) => state.ingredients.items);

  const location = useLocation();
  const background = location.state?.background;
  // console.log("background =:", background);

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



  const onOpenModal = (item) => {
    dispatchAction(modalActions.toggleModal()); //указываем состояние isOpenModal = true
  };


  console.log("allIngredients =:", allIngredients);
  const currentOrder = orders.find((i) => i._id === id); //получим искомый заказ
  const currentOrderIngredients = currentOrder.ingredients.map((ingredient) => //ингредиенты текущего заказа
    allIngredients.find((item) => item._id === ingredient)
  );


  // console.log("currentOrder =:", currentOrder);
  // console.log("currentOrderIngredients =:", currentOrderIngredients);

  if (allIngredients.length === 0) {
    return <div>Загрузка...</div>;
  }


  const uniqueCurrentOrderIngredients = currentOrder.ingredients && allIngredients  //массив игредиентов заказа без повторений
    ? currentOrder.ingredients
      .map((ingredientId) => allIngredients.find((item) => item._id === ingredientId))
      .filter((item, index, array) => array.findIndex((i) => i._id === item._id) === index)
    : [];


  // console.log("uniqueCurrentOrderIngredients =:", uniqueCurrentOrderIngredients);


  return (
    <>
      <section className={background ? `${styles['feed-extensions_background']}` : `${styles['feed-extensions']}`}>
        <p className={`text text_type_digits-default mb-10 mt-4 ${styles['feed-extensions__order-number']}`}>555</p>

        <p className="text text_type_main-medium mb-3">название</p>
        <p className={`text_type_main-small mb-15 ${styles['feed-extensions__order-status']}`}>
          в работе
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
                  <p className="text text_type_digits-default pr-2">33</p>
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
            <p className="text text_type_digits-default mr-2">{111000}</p>
            <CurrencyIcon />
          </div>
        </div>
      </section>

    </>
  )
};

export default FeedExtensions;