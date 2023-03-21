import React, { useState } from 'react';
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';
import PropTypes from "prop-types";


const BurgerConstructor = (props) => {

  const filteredIngredientsBuns = props.ingredients.filter((item) => {
    return item.type === "bun";
  });


  const filteredIngredientsWithoutBuns = props.ingredients.filter(item => {
    return item.type !== "bun";
  });

  const [isOpenModal, setIsOpenModal] = useState(false);


  const OnOpenModal = () => {  //при открытии
    setIsOpenModal(true);  //указываем состояние isOpenModal = true
  }

  const onCloseModal = () => {
    setIsOpenModal(false); //указываем состояние isOpenModal = false
  }


  return (
    <section className={`${styles['burger-constructor']}`}>
      {isOpenModal &&
        <Modal onCloseModal={onCloseModal}>
          <OrderDetails />
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

      {filteredIngredientsBuns.length >= 1 && (
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
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={OnOpenModal}>
          Оформить заказ
        </Button>
      </div>

    </section >
  )
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.array.isRequired,
}

export default BurgerConstructor;