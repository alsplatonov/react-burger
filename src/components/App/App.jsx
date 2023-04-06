import AppHeader from '../AppHeader/AppHeader';
import AppMain from '../AppMain/AppMain';
import React, { useState, useEffect, useContext } from 'react';
import style from './App.module.css';
import { getIngredientsData } from '../../utils/api';


const App = () => {

  const [ingredients, setIngredients] = useState([]);
  
  useEffect(() => {
    getIngredientsData().then((res) => {
      setIngredients(res.data);
    });
  }, []);

  return (
    <>
      {ingredients.length !== 0 && (
        <div className={style.app}>
          <AppHeader />
          <AppMain ingredients={ingredients} />
        </div>
      )}
    </>
  );
}

export default App;
