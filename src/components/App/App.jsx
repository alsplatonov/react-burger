import AppHeader from '../AppHeader/AppHeader';
import AppMain from '../AppMain/AppMain';
import React, { useState, useEffect } from 'react';
import style from './App.module.css';
import { getIngredientsData } from '../../utils/api';
import BurgerContext from '../../services/contexts/BurgerContext';

const App = () => {

  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getIngredientsData()
      .then((res) => {
        setIngredients(res.data);
      })
      .catch((err) => {
        console.err(err); // выводим ошибку в консоль
      });
  }, []);

  return (
    <>
      {ingredients.length !== 0 && (
        <div className={style.app}>
          <AppHeader />
          <BurgerContext.Provider value={ingredients}>
            <AppMain />
          </BurgerContext.Provider>
        </div>
      )
      }
    </>
  );
}

export default App;
