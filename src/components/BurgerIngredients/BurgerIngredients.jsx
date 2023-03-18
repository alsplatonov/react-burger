import React, { useState } from 'react';
import styles from "./BurgerIngredients.module.css";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from '../Ingredient/Ingredient';

const BurgerIngredients = (props) => {

  const [currentMenuType, setCurrentMenuType] = useState('bun');


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
    <div>
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
        <ul className={styles['burger-ingredients_list']}>
          {filteredIngredientsBuns.map((item) => (
            <Ingredient
              key={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
        <ul className={styles['burger-ingredients_list']}>
          {filteredIngredientsSauce.map((item) => (
            <Ingredient
              key={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
        <ul className={styles['burger-ingredients_list']}>
          {filteredIngredientsMain.map((item) => (
            <Ingredient
              key={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}


export default BurgerIngredients;