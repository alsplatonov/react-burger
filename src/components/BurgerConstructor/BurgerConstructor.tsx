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
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../../services/redux-hook';
import { ICartItem, IBun } from "../../utils/interfaces";

const BurgerConstructor = () => {
  const isLogged = useAppSelector((store) => store.userActions.isLogged);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const ingredients = useAppSelector((state) => state.burgerCart.items);
  const isCartContentChanged = useAppSelector((state) => state.burgerCart.isCartContentChanged);
  const buns = useAppSelector((state) => state.burgerCart.bun);
  const isOpenModal = useAppSelector((state) => state.modal.IsOpenModal);
  const orderNumber = useAppSelector((state) => state.order.orderNumber);
  const orderPrice = useAppSelector((state) => state.order.orderPrice);

  // const totalBurgerIngredients = (ingredients.concat(buns).concat(buns)); //добавим обе булки к общему массиву ингредиентов 

  const bunsArray = buns ? [buns] : [];

  //добавим обе булки к общему массиву ингредиентов 
  const totalBurgerIngredients = [...ingredients, ...bunsArray, ...bunsArray];

  const [dropResult, dropTarget] = useDrop<ICartItem, void, { isHover: boolean }>({
    accept: 'ingredient',
    drop: (item, monitor) => {
      onDropHandler(item);
    },
    collect: (monitor) => ({
      isHover: !!monitor.isOver(),
    }),
  });


  const { isHover } = dropResult;

  const onDropHandler = (droppedItem: ICartItem) => {
    dispatch(burgerConstructorActions.addItem({
      _id: droppedItem._id,
      name: droppedItem.name,
      type: droppedItem.type,
      price: droppedItem.price,
      image: droppedItem.image,
      key: uuidv4(),
    }));
  };


  const getIngredientsIds = () => { //получим id ингредиентов
    let ingredIds: string[] = [];
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
    dispatch(orderActions.setOrderPrice(price));
  },
    [totalBurgerIngredients]
  );

  const OnOpenModal = () => {  //при открытии
    if (bunsArray.length !== 0) { //если не добавили булку, не даем создать заказ
      if (isLogged) {
        dispatch(modalActions.toggleModal()); //указываем состояние isOpenModal = true
        dispatch(orderActions.fetchOrderNumber(getIngredientsIds())); //сохранить номер заказа в хранилище
      } else {
        navigate("/login");
      }
    }
  }

  const onCloseModal = () => {
    dispatch(modalActions.toggleModal()); //указываем состояние isOpenModal = false
    dispatch(orderActions.setOrderNumber(0));
    dispatch(burgerConstructorActions.removeAll()); //очищаем ингредиенты после закрытия
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
            {(bunsArray.length !== 0) && (
              <div className={`${styles['burger-constructor__item']} pl-8 mb-4`} >
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={bunsArray[0].name + '\n(верх)'}
                  price={bunsArray[0].price}
                  thumbnail={bunsArray[0].image}
                />
              </div>
            )}


            <ul className={`${styles["burger-constructor__list"]}`}>
              <SortableConstructor />
            </ul>
            {(bunsArray.length !== 0) && (
              <div className={`${styles['burger-constructor__item']} pl-8 mt-4`}  >
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={bunsArray[0].name + '\n(низ)'}
                  price={bunsArray[0].price}
                  thumbnail={bunsArray[0].image}
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