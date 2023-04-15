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
  // const burgerCart = useSelector((state) => state.burgerCart.items);

  // const burgerCart = useSelector((state) => state.burgerCart.items);
  const defaultBun = useSelector((state) => state.ingredients.items);
  const ingredients = useSelector((state) => state.burgerCart.items);
  const isCartContentChanged = useSelector((state) => state.burgerCart.isCartContentChanged);
  const buns = useSelector((state) => state.burgerCart.bun);
  const ingredientsCount = useSelector((state) => state.burgerCart.counter);
  const isOpenModal = useSelector((state) => state.modal.IsOpenModal);
  const orderNumber = useSelector((state) => state.order.orderNumber);
  //  console.log(allIngredients);
  const Buns = defaultBun.filter(item => {
    return item.type === "bun";
  });



  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      onDropHandler(item);
    },
  });
  // const onDropHandler = (item) => {
  //   dispatchAction(burgerConstructorActions.addItem(item, uuidv4()));
  // };

  const onDropHandler = (item) => {
    dispatchAction(burgerConstructorActions.addItem({

      _id: item._id,
      name: item.name,
      type: item.type,
      proteins: item.proteins,
      fat: item.fat,
      carbohydrates: item.carbohydrates,
      calories: item.calories,
      price: item.price,
      image: item.image,
      uuidv4: uuidv4(),
    }));
  };


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

  const getIngredientsIds = () => { //получим id ингредиентов
    let ingredIds = [];
    ingredients.forEach(item => {
      ingredIds.unshift(item._id);
    })
    return ingredIds;
  }

  useEffect(() => {

    dispatchAction(burgerConstructorActions.addItem({

      _id: Buns[0]._id,
      name: Buns[0].name,
      type: Buns[0].type,
      proteins: Buns[0].proteins,
      fat: Buns[0].fat,
      carbohydrates: Buns[0].carbohydrates,
      calories: Buns[0].calories,
      price: Buns[0].price,
      image: Buns[0].image,
      uuidv4: uuidv4(),
    }));
  }, []);



  const orderPrice = () => { // сумма заказа
    let price = buns.price * 2; //сумма 2х булок
    filteredIngredientsWithoutBuns.forEach(item => {  // ингредиенты без булок
      price += item.price;  //добавим сумму ингедиентов
    })
    return price.toString();
  }

  const getOrderNum = async () => {
    return await getOrderNumber(getIngredientsIds())
      .then((res) =>
        dispatchAction(orderActions.setOrderNumber(res.order.number)))
      .catch((err) =>
        console.err(err));
  }

  const OnOpenModal = () => {  //при открытии
    dispatchAction(modalActions.toggleModal()); //указываем состояние isOpenModal = true
    getOrderNum(); //получаем номер заказа
  }

  const onCloseModal = () => {
    dispatchAction(orderActions.setOrderNumber(0));
    dispatchAction(modalActions.toggleModal()); //указываем состояние isOpenModal = false
  };

  console.log(ingredients);
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
              {filteredIngredientsWithoutBuns.map((item) => (
                <li className={`${styles['burger-constructor__item']}`} key={uuidv4()}  >
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
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
        {/* 
        {!isCartContentChanged && ( //булки по-умолчанию
           <>
           <div className={`${styles['burger-constructor__item']} pl-8 mb-4`} >
             <ConstructorElement
               type="top"
               isLocked={true}
               text={Buns[0].name + '\n(верх)'}
               price={Buns[0].price}
               thumbnail={Buns[0].image}
             />
           </div>
           <div className={`${styles['burger-constructor__item']} pl-8 mt-4`}  >
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={Buns[0].name + '\n(низ)'}
                price={Buns[0].price}
                thumbnail={Buns[0].image}
              />
            </div>
          </>
        )} */}
      </div>


      < div className={`${styles['burger-constructor__order']} mt-10`}>
        <div className={`${styles['burger-constructor__order-price']}`}>
          <p className="text text_type_digits-medium">{orderPrice()}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={OnOpenModal}>
          Оформить заказ
        </Button>
      </div>

    </section >
  )
  // return (
  //   <section className={`${styles['burger-constructor']}`}>
  //     {isOpenModal && orderNumber !== 0 &&
  //       <Modal onCloseModal={onCloseModal}>
  //         <OrderDetails />
  //       </Modal>
  //     }
  //     <div ref={dropTarget} style={isHover ? { opacity: "0.5" } : { opacity: "1" }}>
  //       {filteredIngredientsBuns.length > 0 && (
  //         <div className={`${styles['burger-constructor__item']} pl-8 mb-4`} >
  //           <ConstructorElement
  //             type="top"
  //             isLocked={true}
  //             text={filteredIngredientsBuns[0].name + '\n(верх)'}
  //             price={filteredIngredientsBuns[0].price}
  //             thumbnail={filteredIngredientsBuns[0].image}
  //           />
  //         </div>
  //       )
  //       }

  //       <ul className={`${styles['burger-constructor__list']}`}>
  //         {filteredIngredientsWithoutBuns.map((item) => (
  //           <li className={`${styles['burger-constructor__item']}`} key={item._id}  >
  //             <DragIcon type="primary" />
  //             <ConstructorElement
  //               text={item.name}
  //               price={item.price}
  //               thumbnail={item.image}
  //             />
  //           </li>
  //         ))}
  //       </ul>

  //       {
  //         filteredIngredientsBuns.length > 0 && (
  //           <div className={`${styles['burger-constructor__item']} pl-8 mt-4`}  >
  //             <ConstructorElement
  //               type="bottom"
  //               isLocked={true}
  //               text={filteredIngredientsBuns[0].name + '\n(низ)'}
  //               price={filteredIngredientsBuns[0].price}
  //               thumbnail={filteredIngredientsBuns[0].image}
  //             />
  //           </div>
  //         )
  //       }
  //     </div>


  //     < div className={`${styles['burger-constructor__order']} mt-10`}>
  //       <div className={`${styles['burger-constructor__order-price']}`}>
  //         <p className="text text_type_digits-medium">{orderPrice()}</p>
  //         <CurrencyIcon type="primary" />
  //       </div>
  //       <Button htmlType="button" type="primary" size="large" onClick={OnOpenModal}>
  //         Оформить заказ
  //       </Button>
  //     </div>

  //   </section >
  // )
}


export default BurgerConstructor;