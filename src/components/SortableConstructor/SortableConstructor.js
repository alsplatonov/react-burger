import DraggableConstructorElement from "../DraggableConstructorElement/DraggableConstructorElement";
import { useDispatch, useSelector } from 'react-redux';
import { burgerConstructorActions } from "../../services/actions/burgerConstructor-slice";

const SortableConstructor = () => {
  const dispatchAction = useDispatch();
  const ingredients = useSelector((state) => state.burgerCart.items);

  const moveIngredient = (dragIndex, hoverIndex) => { //перемещение элементов
    const dragIngredient = ingredients[dragIndex];
    dispatchAction(burgerConstructorActions.moveItem({ dragIndex, hoverIndex, dragIngredient }));
  };


  return (
    <>
      {ingredients.map((ingredient, index) => (
        <DraggableConstructorElement
          key={ingredient.key}
          ingredient={ingredient}
          index={index}
          moveIngredient={moveIngredient}
        />
      ))}
    </>
  );
};

export default SortableConstructor;