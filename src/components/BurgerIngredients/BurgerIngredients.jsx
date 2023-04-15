import React, { useState, useContext, useRef, useEffect } from 'react';
import styles from "./BurgerIngredients.module.css";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from '../Ingredient/Ingredient';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '../../services/modal-slice';
import { ingredientDetailsActions } from '../../services/ingredientDetails-slice';
import { v4 as uuidv4 } from 'uuid';

const BurgerIngredients = () => {

  const ingredients = useSelector((state) => state.ingredients.items);
  const isOpenModal = useSelector((state) => state.modal.IsOpenModal);
  const ingredientDetailsItem = useSelector((state) => state.ingredientDetails.item);

  const dispatchAction = useDispatch();

  const onOpenModal = (item) => {
    dispatchAction(ingredientDetailsActions.setItem(item));  //устанавливаем текущий ингредиент
    dispatchAction(modalActions.toggleModal()); //указываем состояние isOpenModal = true
  };

  const onCloseModal = () => {
    dispatchAction(ingredientDetailsActions.setItem(null));  //очищаем ингредиент
    dispatchAction(modalActions.toggleModal()); //указываем состояние isOpenModal = false
  };


  const [currentMenuType, setCurrentMenuType] = useState('bun');

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    const headers = document.querySelectorAll(`.${styles['burger-ingredients']} h2`);
    const tabs = document.querySelectorAll(`.${styles.tabs} button`);
    let activeHeaderIndex = 0;
    headers.forEach((header, index) => {
      if (header.getBoundingClientRect().top < 100) {
        activeHeaderIndex = index;
      }
    });

    setCurrentMenuType(tabs[activeHeaderIndex].getAttribute('value'));
  };

  const filteredIngredientsBuns = ingredients.filter(item => {
    return item.type === "bun";
  });

  const filteredIngredientsSauce = ingredients.filter(item => {
    return item.type === "sauce";
  });

  const filteredIngredientsMain = ingredients.filter(item => {
    return item.type === "main";
  });


  return (

    <section>
      {isOpenModal && ingredientDetailsItem !== null &&
        <Modal onCloseModal={onCloseModal}>
          <IngredientDetails />
        </Modal>
      }

      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={styles.tabs}>
        <Tab value="bun" active={currentMenuType === 'bun'} onClick={() => setCurrentMenuType('bun')}>
          Булки
        </Tab>
        <Tab value="sauce" active={currentMenuType === 'sauce'} onClick={() => setCurrentMenuType('sauce')}>
          Соусы
        </Tab>
        <Tab value="main" active={currentMenuType === 'main'} onClick={() => setCurrentMenuType('main')}>
          Начинки
        </Tab>
      </div>
      <div className={styles['burger-ingredients']}>
        <h2 className="text text_type_main-medium mt-10 mb-6">Булки</h2>
        <ul className={styles['burger-ingredients__list']}>
          {filteredIngredientsBuns.map((item) => (
            <Ingredient
              key={uuidv4()}
              _id={item._id}
              type={item.type}
              name={item.name}
              image={item.image}
              price={item.price}
              onOpenModal={() => onOpenModal(item)} //открыть модальное окно, передадим анонимную стрелочную функцию
            />
          ))}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
        <ul className={styles['burger-ingredients__list']}>
          {filteredIngredientsSauce.map((item) => (
            <Ingredient
              key={uuidv4()}
              _id={item._id}
              type={item.type}
              name={item.name}
              image={item.image}
              price={item.price}
              onOpenModal={() => onOpenModal(item)} //открыть модальное окно
            />
          ))}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
        <ul className={styles['burger-ingredients__list']}>
          {filteredIngredientsMain.map((item) => (
            <Ingredient
              key={uuidv4()}
              _id={item._id}
              type={item.type}
              name={item.name}
              image={item.image}
              price={item.price}
              onOpenModal={() => onOpenModal(item)}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}



export default BurgerIngredients;