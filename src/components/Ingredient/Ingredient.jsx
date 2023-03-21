import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Ingredient.module.css';
import PropTypes from "prop-types";


const Ingredient = (props) => {
  return (
    <li className={styles.ingredient} onClick={props.OnOpenModal}>
      <img src={props.image} alt={props.name} />
      <Counter count={1} size="default" extraClass="m-1" />
      <div className={`${styles['ingredient-price']}`}>
        <p className={"text text_type_digits-default mt-1 mb-1"}>{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles['ingredient-title']} text text_type_main-default pb-8`}>{props.name}</p>
    </li>
  )
}

Ingredient.propTypes = {
  price: PropTypes.number,
  name: PropTypes.string,
  OnOpenModal: PropTypes.func.isRequired,
}

export default Ingredient;



