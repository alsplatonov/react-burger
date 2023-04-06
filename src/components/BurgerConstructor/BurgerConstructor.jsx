import React, { useState, useContext } from 'react';
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';
import BurgerContext from '../../services/contexts/BurgerContext';
import { getOrderNumber } from '../../utils/api';


const BurgerConstructor = () => {

  const ingredients = useContext(BurgerContext); //вызываем список ингедиентов из контекста

  const filteredIngredientsBuns = ingredients.filter((item) => {
    return item.type === "bun";
  });


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

  const orderPrice = () => { // сумма заказа
    let price = filteredIngredientsBuns[0].price * 2; //сумма 2х булок
    filteredIngredientsWithoutBuns.forEach(item => {  // ингредиенты без булок
      price += item.price;  //добавим сумму ингедиентов
    })
    return price.toString();
  }

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState(0);

  const getOrderNum = async () => {
    return await getOrderNumber(getIngredientsIds())
      .then((res) =>
        setOrderNumber(res.order.number))
      .catch((err) =>
        console.err(err));
  }

  const OnOpenModal = () => {  //при открытии
    setIsOpenModal(true);  //указываем состояние isOpenModal = true
    getOrderNum(); //получаем номер заказа
  }

  const onCloseModal = () => {
    setIsOpenModal(false); //указываем состояние isOpenModal = false
    setOrderNumber(0); //обнуляем номер заказа
  }


  return (
    <section className={`${styles['burger-constructor']}`}>
      {isOpenModal &&
        <Modal onCloseModal={onCloseModal}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      }
      {filteredIngredientsBuns.length > 0 && (
        <div className={`${styles['burger-constructor__item']} pl-8 mb-4`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={filteredIngredientsBuns[0].name + '\n(верх)'}
            price={filteredIngredientsBuns[0].price}
            thumbnail={filteredIngredientsBuns[0].image}
          />
        </div>
      )}

      <ul className={`${styles['burger-constructor__list']}`}>
        {filteredIngredientsWithoutBuns.map((item) => (
          <li className={`${styles['burger-constructor__item']}`} key={item._id} >
            <DragIcon type="primary" />
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          </li>
        ))}
      </ul>

      {filteredIngredientsBuns.length > 0 && (
        <div className={`${styles['burger-constructor__item']} pl-8 mt-4`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={filteredIngredientsBuns[0].name + '\n(низ)'}
            price={filteredIngredientsBuns[0].price}
            thumbnail={filteredIngredientsBuns[0].image}
          />
        </div>
      )}

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
}


export default BurgerConstructor;