import AppHeader from '../AppHeader/AppHeader';
import AppMain from '../AppMain/AppMain';
import React, { useState, useEffect } from 'react';
import style from './App.module.css';


const App = () => {

  const getIngredientsData = async () => {
    return await fetch('https://norma.nomoreparties.space/api/ingredients')
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getIngredientsData().then((res) => {
      //console.log(res.data);
      setIngredients(res.data);
    });
  }, []);

  console.log(ingredients);
  return (
    <>
      {ingredients.length !== 0 && (
        <div className={style.app}>
          <AppHeader />
          <AppMain ingredients={ingredients} />
        </div>
      )};
    </>
  );
}

export default App;
