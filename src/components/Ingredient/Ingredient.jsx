import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Ingredient.module.css';
import PropTypes from "prop-types";

import { useDrag } from "react-dnd";


const Ingredient = (props) => {

  // const ingredient = {
  //   key : props.key,
  //   name :         props.name,
  //   image :         props.image,
  //   price :         props.price,
  // }

  const ingredient = props;
 console.log(ingredient);
  

  const [{isDrag}, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: monitor => ({
        isDrag: monitor.isDragging()
    })
  });


  return (
    <li ref={dragRef} className={styles.ingredient} onClick={props.onOpenModal} style={ !isDrag ? {opacity: "1"} : {opacity: "0.4", cursor: "grab"}}>
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
  onOpenModal: PropTypes.func.isRequired,
}

export default Ingredient;



