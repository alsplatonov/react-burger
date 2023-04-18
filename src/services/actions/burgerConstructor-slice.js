import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  items: [],
  bun: [],
  // index: 0,
  isCartContentChanged: false,
};

const constructorSlice = createSlice({
  name: 'burgerCart',
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      state.isCartContentChanged = true;
      state.index++;
      if (newItem.type !== 'bun') {
        const existingItem = state.items.find((item) => item._id === newItem._id);
        if (!existingItem) {
          state.items.push({
            _id: newItem._id,
            name: newItem.name,
            type: newItem.type,
            proteins: newItem.proteins,
            fat: newItem.fat,
            carbohydrates: newItem.carbohydrates,
            calories: newItem.calories,
            price: newItem.price,
            image: newItem.image,
            index: state.index,
            counter: 1,
            key: uuidv4(),
          });
        } else {
          state.items.push({
            _id: newItem._id,
            name: newItem.name,
            type: newItem.type,
            proteins: newItem.proteins,
            fat: newItem.fat,
            carbohydrates: newItem.carbohydrates,
            calories: newItem.calories,
            price: newItem.price,
            image: newItem.image,
            index: state.index,
            counter: existingItem.counter++,
            key: uuidv4(),
          })
        }
      } else {
        state.bun = {
          _id: newItem._id,
          name: newItem.name,
          type: newItem.type,
          proteins: newItem.proteins,
          fat: newItem.fat,
          carbohydrates: newItem.carbohydrates,
          calories: newItem.calories,
          price: newItem.price,
          image: newItem.image,
          counter: 1,
        }
      }
    },
    removeItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item._id === newItem._id);
      state.isCartContentChanged = true;
      state.items = state.items.filter(item => item.key !== newItem.key);
      existingItem.counter--;
    },
    updateCart(state, action) {
      state.items = action.payload.items;
    },

    moveItem(state, action) {
      const dragIndex = action.payload.dragIndex;
      const hoverIndex = action.payload.hoverIndex;
      const dragIngredient = action.payload.dragIngredient;
      state.items.splice(dragIndex, 1);
      state.items.splice(hoverIndex, 0, dragIngredient);
    },
  },
});

export const burgerConstructorActions = constructorSlice.actions;

export default constructorSlice;