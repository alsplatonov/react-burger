import React, { useState } from 'react';
import styles from "./BurgerIngredients.module.css";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from '../Ingredient/Ingredient';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import PropTypes from "prop-types";
import {ingredientsPropType} from '../../utils/prop-types';

const BurgerIngredients = (props) => {

  const [currentMenuType, setCurrentMenuType] = useState('bun');

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [ingredient, setIngredient] = useState('');


  const OnOpenModal = (item) => {  //при открытии
    setIsOpenModal(true);  //указываем состояние isOpenModal = true
    setIngredient(item);  //устанавливаем текущий ингредиент
  }

  const onCloseModal = () => {
    setIsOpenModal(false); //указываем состояние isOpenModal = false
  }


  const filteredIngredientsBuns = props.ingredients.filter(item => {
    return item.type === "bun";
  });

  const filteredIngredientsSauce = props.ingredients.filter(item => {
    return item.type === "sauce";
  });

  const filteredIngredientsMain = props.ingredients.filter(item => {
    return item.type === "main";
  });


  return (

    <section>
      {isOpenModal &&
        <Modal onCloseModal={onCloseModal}>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      }

      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={styles.tabs}>
        <Tab value="bun" active={currentMenuType === 'bun'} onClick={setCurrentMenuType}>
          Булки
        </Tab>
        <Tab value="sauce" active={currentMenuType === 'sauce'} onClick={setCurrentMenuType}>
          Соусы
        </Tab>
        <Tab value="main" active={currentMenuType === 'main'} onClick={setCurrentMenuType}>
          Начинки
        </Tab>
      </div>
      <div className={styles['burger-ingredients']}>
        <h2 className="text text_type_main-medium mt-10 mb-6">Булки</h2>
        <ul className={styles['burger-ingredients__list']}>
          {filteredIngredientsBuns.map((item) => (
            <Ingredient
              key={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
              OnOpenModal={() => OnOpenModal(item)} //открыть модальное окно, передадим анонимную стрелочную функцию
            />
          ))}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
        <ul className={styles['burger-ingredients__list']}>
          {filteredIngredientsSauce.map((item) => (
            <Ingredient
              key={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
              OnOpenModal={() => OnOpenModal(item)} //открыть модальное окно
            />
          ))}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
        <ul className={styles['burger-ingredients__list']}>
          {filteredIngredientsMain.map((item) => (
            <Ingredient
              key={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
              OnOpenModal={() => OnOpenModal(item)}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}


BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientsPropType).isRequired,
};

export default BurgerIngredients;