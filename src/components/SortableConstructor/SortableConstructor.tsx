import DraggableConstructorElement from "../DraggableConstructorElement/DraggableConstructorElement";
import { useDispatch, useSelector } from 'react-redux';
import { burgerConstructorActions } from "../../services/actions/burgerConstructor-slice";
import { useAppDispatch, useAppSelector } from '../../services/redux-hook';

const SortableConstructor = () => {
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector((state) => state.burgerCart.items);

  const moveIngredient = (dragIndex:number, hoverIndex:number) => { //перемещение элементов
    const dragIngredient = ingredients[dragIndex];
    dispatch(burgerConstructorActions.moveItem({ dragIndex, hoverIndex, dragIngredient }));
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