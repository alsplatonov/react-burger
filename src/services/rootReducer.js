import { configureStore } from '@reduxjs/toolkit';
import burgerIngredientsSlice from './ingredients-slice';
import constructorSlice from './burgerConstructor-slice';
import modalSlice from './modal-slice';

const store = configureStore({
  reducer: {
     
    ingredients: burgerIngredientsSlice.reducer,
    burgerConstructor: constructorSlice.reducer,
    modal: modalSlice.reducer,
  },
});

export default store;