import { useRef } from 'react';
import { useDrag, useDrop } from "react-dnd";
import styles from "./DraggableConstructorElement.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from 'react-redux';
import { burgerConstructorActions } from "../../services/actions/burgerConstructor-slice";
import PropTypes from "prop-types";

const DraggableConstructorElement = (props) => {

  const { ingredient, index, moveIngredient } = props;

  const dispatch = useDispatch();
  const removeIngredient = (ingredient, key) => {
    dispatch(burgerConstructorActions.removeItem(ingredient, key));
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: "constructorElement",
    item: { ingredient, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });


  const [, dropRef] = useDrop({
    accept: "constructorElement",
    drop(item) {
      onDropHandler(item);
    },
  });

  const onDropHandler = (item) => {
    const dragIndex = item.index;
    const hoverIndex = index;
    if (dragIndex === hoverIndex) {
      return;
    }
    moveIngredient(dragIndex, hoverIndex);
    item.index = hoverIndex;
  };


  const ref = useRef(null);
  dragRef(dropRef(ref));

  return (
    <li
      ref={ref}
      className={`${styles["draggable-constructor-element__item"]}`}
      style={{
        opacity: isDragging ? 0 : 1,
      }}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => removeIngredient(ingredient, ingredient.key)}
      />
    </li>
  );
};


DraggableConstructorElement.propTypes = {
  ingredient: PropTypes.object.isRequired,
  index: PropTypes.number,
  moveIngredient: PropTypes.func.isRequired,
}

export default DraggableConstructorElement;