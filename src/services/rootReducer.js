import { configureStore } from '@reduxjs/toolkit';
import burgerIngredientsSlice from './ingredients-slice';
import constructorSlice from './burgerConstructor-slice';

const store = configureStore({
  reducer: {
     
    ingredients: burgerIngredientsSlice.reducer,
    burgerConstructor: constructorSlice.reducer,
  },
});

export default store;