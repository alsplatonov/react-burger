import styles from './AppMain.module.css';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Profile from '../../pages/Profile/Profile';
import { useAppDispatch, useAppSelector } from '../../services/redux-hook';

const AppMain = () => {

  const ingredients = useAppSelector((state) => state.ingredients.items);

  return (
    <>
      {ingredients.length !== 0 && (
        <main className={styles['app-main']}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main >
      )};
    </>
  )

}

export default AppMain;

