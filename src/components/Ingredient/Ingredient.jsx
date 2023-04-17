import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Ingredient.module.css';
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from "react-dnd";
import { v4 as uuidv4 } from 'uuid';

const Ingredient = (props) => {

  const ingredient = props;

  const bun = useSelector((state) => state.burgerCart.bun);
  console.log(props.type);
  const ingredients = useSelector((state) => state.burgerCart.items);

  const burgerIngredients = ingredients.filter(item => {
    return item._id === props._id;
  });

  function compare(a, b) {
    if (a.counter < b.counter) {
      return -1;
    }
    if (a.counter > b.counter) {
      return 1;
    }
    return 0;
  }

  burgerIngredients.sort(compare);
  let index = burgerIngredients.length - 1;

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  return (
    <li ref={dragRef} className={styles.ingredient} onClick={props.onOpenModal} style={!isDrag ? { opacity: "1" } : { opacity: "0.4", cursor: "grab" }}>
      <img src={props.image} alt={props.name} />
      {burgerIngredients.length > 0 && (
        <Counter count={burgerIngredients[index].counter} size="default" extraClass="m-1" />
      )}
      <div className={`${styles['ingredient-price']}`}>
        <p className={"text text_type_digits-default mt-1 mb-1"}>{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles['ingredient-title']} text text_type_main-default pb-8`}>{props.name}</p>
    </li>
  );
}

Ingredient.propTypes = {
  price: PropTypes.number,
  name: PropTypes.string,
  onOpenModal: PropTypes.func.isRequired,
}

export default Ingredient;



