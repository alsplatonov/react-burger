import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  items: [],
  counter: 0,
};

const burgerIngredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    updateCart(state, action) {
      state.items = action.payload.items;
    },
  },
});


export const burgerIngredientsActions = burgerIngredientsSlice.actions;


export default burgerIngredientsSlice;