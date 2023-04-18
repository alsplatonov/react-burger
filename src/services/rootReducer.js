import { configureStore } from '@reduxjs/toolkit';

import burgerIngredientsSlice from './actions/ingredients-slice';
import constructorSlice from './actions/burgerConstructor-slice';
import modalSlice from './actions/modal-slice';
import orderSlice from './actions/order-slice';
import ingredientDetailsSlice from './actions/ingredientDetails-slice';

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