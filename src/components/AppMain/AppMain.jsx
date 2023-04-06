import styles from './AppMain.module.css';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import PropTypes from "prop-types";
import { ingredientsPropType } from '../../utils/prop-types';
import BurgerContext from '../BurgerContext';

const AppMain = (props) => {

  return (
    <main className={styles['app-main']}>
      <BurgerIngredients ingredients={props.ingredients} />
      <BurgerContext.Provider value={props.ingredients}>
        <BurgerConstructor  />
      </BurgerContext.Provider>
    </main>
  );
}

AppMain.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientsPropType).isRequired,
};

export default AppMain;