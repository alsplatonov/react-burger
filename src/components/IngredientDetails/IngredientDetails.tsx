import styles from "./IngredientDetails.module.css";
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../services/redux-hook';

const IngredientDetails = () => {
  const { id } = useParams(); //id адреса ссылки
  const ingredients = useAppSelector((state) => state.ingredients.items);
  const currentItem = ingredients.find((i) => i._id === id); //получим данные выбранного элемента 

  if (!currentItem) {
    return <div>Загрузка...</div>;
  }

  return (

    <div className={`${styles['ingredient-details']} pt-10 pb-15`}>
      <h1 className={`${styles['ingredient-details__header']} text text_type_main-large pb-5`}>Детали ингредиента</h1>
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