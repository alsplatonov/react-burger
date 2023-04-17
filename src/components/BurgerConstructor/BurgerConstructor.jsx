import { ConstructorElement, Button, DragIcon, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, useContext, useRef, useEffect } from 'react';
import styles from "./BurgerConstructor.module.css";
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';
import { getOrderNumber } from '../../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { orderActions } from '../../services/order-slice';
import { modalActions } from '../../services/modal-slice';
import { burgerConstructorActions } from "../../services/burgerConstructor-slice";



import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from 'uuid';

const BurgerConstructor = () => {
  const dispatchAction = useDispatch();
  const defaultBun = useSelector((state) => state.ingredients.items);
  const ingredients = useSelector((state) => state.burgerCart.items);
  const isCartContentChanged = useSelector((state) => state.burgerCart.isCartContentChanged);
  const buns = useSelector((state) => state.burgerCart.bun);
  const isOpenModal = useSelector((state) => state.modal.IsOpenModal);
  const orderNumber = useSelector((state) => state.order.orderNumber);
  const orderPrice = useSelector((state) => state.order.orderPrice);
  const Buns = defaultBun.filter(item => {
    return item.type === "bun";
  });

  const totalBurgerIngredients = (ingredients.concat(buns)).concat(buns);
  console.log(totalBurgerIngredients);

  useEffect(() => {  //булки по-умолчанию

    // dispatchAction(burgerConstructorActions.addItem({

    //     _id: Buns[0]._id,
    //     name: Buns[0].name,
    //     type: Buns[0].type,
    //     proteins: Buns[0].proteins,
    //     fat: Buns[0].fat,
    //     carbohydrates: Buns[0].carbohydrates,
    //     calories: Buns[0].calories,
    //     price: Buns[0].price,
    //     image: Buns[0].image,
    //     uuidv4: uuidv4(),
    //   }));
    // }, []);

    dispatchAction(burgerConstructorActions.addItem(Buns[0]));
  }, []);

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      onDropHandler(item);
    },
  });
  const onDropHandler = (item) => {
    dispatchAction(burgerConstructorActions.addItem(item));
  };

  // const onDropHandler = (item) => {
  //   dispatchAction(burgerConstructorActions.addItem({

  //     _id: item._id,
  //     name: item.name,
  //     type: item.type,
  //     proteins: item.proteins,
  //     fat: item.fat,
  //     carbohydrates: item.carbohydrates,
  //     calories: item.calories,
  //     price: item.price,
  //     image: item.image,
  //     uuidv4: uuidv4(),
  //   }));
  // };


  // const ingredients = useSelector((state) => state.ingredients.items);


  // useEffect(() => {

  //   dispatchAction(burgerConstructorActions.addItem({

  //     _id: Buns[0]._id,
  //     name: Buns[0].name,
  //     type: Buns[0].type,
  //     proteins: Buns[0].proteins,
  //     fat: Buns[0].fat,
  //     carbohydrates: Buns[0].carbohydrates,
  //     calories: Buns[0].calories,
  //     price: Buns[0].price,
  //     image: Buns[0].image,
  //     uuidv4: uuidv4(),
  //   }));
  // }, []);



  const filteredIngredientsWithoutBuns = ingredients.filter(item => {
    return item.type !== "bun";
  });

  function removeDuplicateStrings(arr) {
    return Array.from(new Set(arr));
  }

  const getIngredientsIds = () => { //получим id ингредиентов
    let ingredIds = [];
    totalBurgerIngredients.forEach(item => {
      ingredIds.unshift(item._id);
    })
    // const res = removeDuplicateStrings(ingredIds);
    // return res;
    return ingredIds;
  }

  // console.log(getIngredientsIds());

  useEffect(() => {
    let price = 0;
    totalBurgerIngredients.forEach(item => {
      price += item.price;
    })
    dispatchAction(orderActions.setOrderPrice(price));
  },
    [totalBurgerIngredients]
  );




  // const getOrderNum = async () => {
  //   return await getOrderNumber(getIngredientsIds())
  //     .then((res) =>
  //       dispatchAction(orderActions.setOrderNumber(res.order.number)))
  //     .catch((err) =>
  //       console.err(err));
  // }

  const OnOpenModal = () => {  //при открытии
    dispatchAction(modalActions.toggleModal()); //указываем состояние isOpenModal = true
    // getOrderNum(); //получаем номер заказа
    dispatchAction(orderActions.setOrderNumber(getIngredientsIds()));
  }

  const onCloseModal = () => {
    // dispatchAction(orderActions.setOrderNumber(0));
    dispatchAction(modalActions.toggleModal()); //указываем состояние isOpenModal = false
  };

  const removeIngredient = (cartId, key) => {
    dispatchAction(burgerConstructorActions.removeItem(cartId, key));
  };


  // filteredIngredientsWithoutBuns.map((item) => {
  //   console.log(item);
  // });


  return (
    <section className={`${styles['burger-constructor']}`}>
      {isOpenModal && orderNumber !== 0 &&
        <Modal onCloseModal={onCloseModal}>
          <OrderDetails />
        </Modal>
      }

      <div ref={dropTarget} style={isHover ? { opacity: "0.5" } : { opacity: "1" }}>
        {isCartContentChanged && (
          <>
            <div className={`${styles['burger-constructor__item']} pl-8 mb-4`} >
              <ConstructorElement
                type="top"
                isLocked={true}
                text={buns.name + '\n(верх)'}
                price={buns.price}
                thumbnail={buns.image}
              />
            </div>


            <ul className={`${styles['burger-constructor__list']}`}>
              {ingredients.map((item) => (
                <li className={`${styles['burger-constructor__item']}`} key={uuidv4()}  >
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                    handleClose=
                    {(() => {
                      removeIngredient(item, ingredients.key)
                    })}
                  />
                </li>
              ))}
            </ul>


            <div className={`${styles['burger-constructor__item']} pl-8 mt-4`}  >
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={buns.name + '\n(низ)'}
                price={buns.price}
                thumbnail={buns.image}
              />
            </div>
          </>

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