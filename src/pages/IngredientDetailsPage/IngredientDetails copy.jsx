import styles from "./IngredientDetails.module.css";
import { useSelector } from 'react-redux';

const IngredientDetails = () => {

   const currentItem = useSelector((state) => state.ingredientDetails.item);
   
  return (
    <div className={`${styles['ingredient-details']} pt-10 pb-15`}>
      <h1 className={`${styles['ingredient-details__header']} text text_type_main-large`}>Детали ингредиента</h1>
      <img src={currentItem.image_large} alt={currentItem.name} />
      <p className="text text_type_main-medium mb-8 mt-4">{currentItem.name}</p>
      <div className={`${styles['ingredient-details__wrapper']}`}>
        <div className={`${styles['ingredient-details__nutrients']}`}>
          <p className="text text_type_main-small text_color_inactive">Калории, ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{currentItem.calories}</p>
        </div>
        <div className={`${styles['ingredient-details__nutrients']}`}>
          <p className="text text_type_main-small text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{currentItem.proteins}</p>
        </div>
        <div className={`${styles['ingredient-details__nutrients']}`}>
          <p className="text text_type_main-small text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{currentItem.fat}</p>
        </div>
        <div className={`${styles['ingredient-details__nutrients']}`}>
          <p className="text text_type_main-small text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{currentItem.carbohydrates}</p>
        </div>
      </div>
    </div>
  )
}



export default IngredientDetails;