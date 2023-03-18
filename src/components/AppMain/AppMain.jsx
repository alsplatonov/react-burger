import styles from './AppMain.module.css';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';


const AppMain = (props) => {

  return(
    <main className={styles.main}>
      <BurgerIngredients ingredients={props.ingredients}/>
      {/* <BurgerConstructor ingredients={props.ingredients}/> */}
    </main>
  );
}



export default AppMain;