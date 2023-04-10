import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  items: [],
  counter: 0,
  isCartContentChanged: false,
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item._id === newItem._id);
      state.counter++;
      state.isCartContentChanged = true;
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
          quantity: 1,
          number: 1,
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
          quantity: existingItem.quantity++,
          number: newItem.number++,
          
        })
      }
    },
    removeItem(state, action) {
      const number = action.payload;
      const existingItem = state.items.find((item) => item.number === number);
      state.counter--;
      state.isCartContentChanged = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.number !== number);
      } else {
        existingItem.quantity--;
        
      }
    },
    updateCart(state, action) {
      state.items = action.payload.items;
      
    },
  },
});



export const burgerConstructorActions = constructorSlice.actions;



export default constructorSlice;