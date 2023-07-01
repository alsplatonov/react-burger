import React, { useState, useContext, useRef, useEffect } from 'react';
import styles from "./BurgerIngredients.module.css";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from '../Ingredient/Ingredient';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '../../services/actions/modal-slice';
import { ingredientDetailsActions } from '../../services/actions/ingredientDetails-slice';
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../services/redux-hook';
import { IIngredient } from '../../utils/interfaces';

const BurgerIngredients = () => {


  const ingredients = useAppSelector((state) => state.ingredients.items);
  const location = useLocation();

  const dispatch = useDispatch();

  const onOpenModal = (item:IIngredient) => {
    dispatch(ingredientDetailsActions.setItem(item));  //устанавливаем текущий ингредиент
    dispatch(modalActions.toggleModal()); //указываем состояние isOpenModal = true
  };

  const filteredIngredientsBuns = ingredients.filter((item) => item.type === 'bun');
  const filteredIngredientsSauce = ingredients.filter((item) => item.type === 'sauce');
  const filteredIngredientsMain = ingredients.filter((item) => item.type === 'main');

  const containerRef = useRef<HTMLDivElement>(document.querySelector('#customScroll')); // ссылка на элемент контейнера

  const [currentMenuType, setCurrentMenuType] = useState("bun"); // состояние активного переключателя на вкладке

  // ссылки на заголовки разделов
  const bunRef = useRef<HTMLHeadingElement>(null);
  const sauceRef = useRef<HTMLHeadingElement>(null);
  const mainRef = useRef<HTMLHeadingElement>(null);

  // функция, которая устанавливает активный переключатель на вкладке
  const setCurrentMenuTypeByScroll = () => {
    const containerTop = containerRef.current?.getBoundingClientRect().top || 0; // верхняя граница контейнера
    const bunTop = bunRef.current?.getBoundingClientRect().top || 0; // верхняя граница заголовка раздела "Булки"
    const sauceTop = sauceRef.current?.getBoundingClientRect().top || 0; // верхняя граница заголовка раздела "Соусы"
    const mainTop = mainRef.current?.getBoundingClientRect().top || 0; // верхняя граница заголовка раздела "Начинки"

    if (containerTop <= bunTop && containerTop <= sauceTop && containerTop <= mainTop) {
      setCurrentMenuType("bun");
    } else if (mainTop > bunTop && mainTop > sauceTop && mainTop < containerTop) {
      setCurrentMenuType("main");
    } else if (sauceTop > bunTop && sauceTop <= containerTop && sauceTop <= mainTop) {
      setCurrentMenuType("sauce");
    }
  };


  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      // добавляем обработчик события "scroll" на элемент контейнера
      container.addEventListener("scroll", setCurrentMenuTypeByScroll);
      return () => {
        container.removeEventListener("scroll", setCurrentMenuTypeByScroll);
      };
    }
  }, []);


  return (
    <section>
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
      <div className={styles['burger-ingredients']} id="customScroll" ref={containerRef}>
        <h2 className="text text_type_main-medium mt-10 mb-6" ref={bunRef}>
          Булки
        </h2>
        <ul className={styles['burger-ingredients__list']}>
          {filteredIngredientsBuns.map((item) => (
            <Link
              className={styles['burger-link']}
              to={`ingredients/${item._id}`}
              state={{ background: location }}
              key={item._id}
            >
              <Ingredient
                key={item._id}
                _id={item._id}
                type={item.type}
                name={item.name}
                image={item.image}
                price={item.price}
                onOpenModal={() => onOpenModal(item)} //открыть модальное окно, передадим анонимную стрелочную функцию
              />
            </Link>
          ))}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6" ref={sauceRef}>
          Соусы
        </h2>
        <ul className={styles['burger-ingredients__list']}>
          {filteredIngredientsSauce.map((item) => (
            <Link
              className={styles['burger-link']}
              to={`ingredients/${item._id}`}
              state={{ background: location }}
              key={item._id}
            >
              <Ingredient
                key={item._id}
                _id={item._id}
                type={item.type}
                name={item.name}
                image={item.image}
                price={item.price}
                onOpenModal={() => onOpenModal(item)} //открыть модальное окно
              />
            </Link>

          ))}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6" ref={mainRef}>
          Начинки
        </h2>
        <ul className={styles['burger-ingredients__list']}>
          {filteredIngredientsMain.map((item) => (
            <Link
              className={styles['burger-link']}
              to={`ingredients/${item._id}`}
              state={{ background: location }}
              key={item._id}
            >
              <Ingredient
                key={item._id}
                _id={item._id}
                type={item.type}
                name={item.name}
                image={item.image}
                price={item.price}
                onOpenModal={() => onOpenModal(item)}
              />
            </Link>
          ))}
        </ul>
      </div>
    </section>
  )
}



export default BurgerIngredients;