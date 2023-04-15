import { configureStore } from '@reduxjs/toolkit';
import burgerIngredientsSlice from './ingredients-slice';
import constructorSlice from './burgerConstructor-slice';
import modalSlice from './modal-slice';
import orderSlice from './order-slice';
import ingredientDetailsSlice from './ingredientDetails-slice';

const store = configureStore({
  reducer: {

    ingredients: burgerIngredientsSlice.reducer,
    burgerCart: constructorSlice.reducer,
    modal: modalSlice.reducer,
    order: orderSlice.reducer,
    ingredientDetails: ingredientDetailsSlice.reducer,

  },
});

export default store;