import styles from './AppMain.module.css';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';



const AppMain = () => {

  return (
    <main className={styles['app-main']}>
      <BurgerIngredients />
      {/* <BurgerConstructor /> */}
    </main>
  );
}


export default AppMain;