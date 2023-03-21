import styles from './AppMain.module.css';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';


const AppMain = (props) => {

  return(
    <main className={styles['app-main']}>
      <BurgerIngredients ingredients={props.ingredients}/>
      <BurgerConstructor ingredients={props.ingredients}/>
    </main>
  );
}

export default AppMain;