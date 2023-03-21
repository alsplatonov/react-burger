import styles from "./IngredientDetails.module.css";
import PropTypes from "prop-types";


const IngredientDetails = (props) => {
  return (
    <div className={`${styles['ingredient-details']} pt-10 pb-15`}>
      <h1 className={`${styles['ingredient-details__header']} text text_type_main-large`}>Детали ингредиента</h1>
      <img src={props.ingredient.image_large} alt={props.ingredient.name} />
      <p className="text text_type_main-medium mb-8 mt-4">{props.ingredient.name}</p>
      <div className={`${styles['ingredient-details__wrapper']}`}>
        <div className={`${styles['ingredient-details__nutrients']}`}>
          <p className="text text_type_main-small text_color_inactive">Калории, ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{props.ingredient.calories}</p>
        </div>
        <div className={`${styles['ingredient-details__nutrients']}`}>
          <p className="text text_type_main-small text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{props.ingredient.proteins}</p>
        </div>
        <div className={`${styles['ingredient-details__nutrients']}`}>
          <p className="text text_type_main-small text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{props.ingredient.fat}</p>
        </div>
        <div className={`${styles['ingredient-details__nutrients']}`}>
          <p className="text text_type_main-small text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{props.ingredient.carbohydrates}</p>
        </div>
      </div>
    </div>
  )
}

IngredientDetails.propTypes = {
  image_large: PropTypes.string,
  name: PropTypes.string,
  calories: PropTypes.string,
  proteins: PropTypes.string,
  fat: PropTypes.string,
  carbohydrates: PropTypes.string,
}

export default IngredientDetails;