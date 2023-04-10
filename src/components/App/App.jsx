import AppHeader from '../AppHeader/AppHeader';
import AppMain from '../AppMain/AppMain';
import React, { useState, useEffect } from 'react';
import style from './App.module.css';
import { getIngredientsData } from '../../utils/api';
// import BurgerContext from '../../services/contexts/BurgerContext';
import { useSelector, useDispatch } from 'react-redux';
import { burgerIngredientsActions } from '../../services/ingredients-slice';

const App = () => {

  const dispatchAction = useDispatch();

  useEffect(() => {
    getIngredientsData()
      .then((res) => {
        dispatchAction(burgerIngredientsActions.updateCart({
          items: res.data || []
        }));
      })
      .catch((err) => {
        console.err(err); // выводим ошибку в консоль
      });
  }, []);

  const ingredients = useSelector((state) => state.ingredients.items);

  return (
    <>
      {ingredients.length !== 0 && (
        <div className={style.app}>
          <AppHeader />
          <AppMain />
        </div>
      )
      }
    </>
  );
}

export default App;
