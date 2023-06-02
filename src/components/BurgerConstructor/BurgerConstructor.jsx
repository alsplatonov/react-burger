import { ConstructorElement, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect } from 'react';
import { useNavigate } from "react-router";
import styles from "./BurgerConstructor.module.css";
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';
import SortableConstructor from "../SortableConstructor/SortableConstructor";
import { useDispatch, useSelector } from 'react-redux';
import { orderActions } from '../../services/actions/order-slice';
import { modalActions } from '../../services/actions/modal-slice';
import { burgerConstructorActions } from "../../services/actions/burgerConstructor-slice";
import { useDrag, useDrop } from "react-dnd";
import { v4 as uuidv4 } from 'uuid';

const BurgerConstructor = () => {
  const isLogged = useSelector((store) => store.userActions.isLogged);
  const navigate = useNavigate();
  const dispatchAction = useDispatch();
  const defaultBuns = useSelector((state) => state.ingredients.items);
  const defaultBun = defaultBuns.filter(item => {
    return item.type === "bun";
  });
  const ingredients = useSelector((state) => state.burgerCart.items);
  const isCartContentChanged = useSelector((state) => state.burgerCart.isCartContentChanged);
  const buns = useSelector((state) => state.burgerCart.bun);
  const isOpenModal = useSelector((state) => state.modal.IsOpenModal);
  const orderNumber = useSelector((state) => state.order.orderNumber);
  const orderPrice = useSelector((state) => state.order.orderPrice);

  const totalBurgerIngredients = (ingredients.concat(buns).concat(buns)); //добавим обе булки к общему массиву ингредиентов 


  const [{ isHover }, dropTarget] = useDrop({ //перемещение ингредиентов из списка ингредиентов
    accept: "ingredient",
    drop(item) {
      onDropHandler(item);
    },
  });

  const onDropHandler = (item) => {
    dispatchAction(burgerConstructorActions.addItem({
      _id: item._id,
      name: item.name,
      type: item.type,
      price: item.price,
      image: item.image,
      key: uuidv4(),
    }));
  };


  const getIngredientsIds = () => { //получим id ингредиентов
    let ingredIds = [];
    totalBurgerIngredients.forEach(item => {
      ingredIds.unshift(item._id);
    })
    return ingredIds;
  }

  useEffect(() => {
    let price = 0;
    totalBurgerIngredients.forEach(item => {
      price += item.price;
    })
    dispatchAction(orderActions.setOrderPrice(price));
  },
    [totalBurgerIngredients]
  );

  const OnOpenModal = () => {  //при открытии
    if (buns != 0) { //если не добавили булку, не даем создать заказ
      if (isLogged) {
        dispatchAction(modalActions.toggleModal()); //указываем состояние isOpenModal = true
        dispatchAction(orderActions.fetchOrderNumber(getIngredientsIds())); //сохранить номе заказа в хранилище
      } else {
        navigate("/login");
      }
    }
  }

  const onCloseModal = () => {
    dispatchAction(modalActions.toggleModal()); //указываем состояние isOpenModal = false
    dispatchAction(orderActions.setOrderNumber(0));
    dispatchAction(burgerConstructorActions.removeAll()); //очищаем ингредиенты после закрытия
  };

  return (
    <section className={`${styles['burger-constructor']}`} >
      {isOpenModal && orderNumber !== 0 &&
        <Modal onCloseModal={onCloseModal}>
          <OrderDetails />
        </Modal>
      }

      <div ref={dropTarget} style={isHover ? { opacity: 0.5 } : {}}>
        {isCartContentChanged ? (
          <>
            {buns != 0 && (
              <div className={`${styles['burger-constructor__item']} pl-8 mb-4`} >
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={buns.name + '\n(верх)'}
                  price={buns.price}
                  thumbnail={buns.image}
                />
              </div>
            )}


            <ul className={`${styles["burger-constructor__list"]}`}>
              <SortableConstructor />
            </ul>
            {buns != 0 && (
              <div className={`${styles['burger-constructor__item']} pl-8 mt-4`}  >
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={buns.name + '\n(низ)'}
                  price={buns.price}
                  thumbnail={buns.image}
                />
              </div>
            )}
          </>
        ) : (
          <div className={`${styles["burger-constructor_empty"]}`}>
            <h2 className={`text text_type_main-large mt-10 mb-5`}>
              Перетаскивайте ингредиенты в эту область
            </h2>
          </div>
        )}
      </div>

      < div className={`${styles['burger-constructor__order']} mt-10`}>
        <div className={`${styles['burger-constructor__order-price']}`}>
          <p className="text text_type_digits-medium">{orderPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={OnOpenModal}>
          Оформить заказ
        </Button>
      </div>
    </section >
  )
}


export default BurgerConstructor;