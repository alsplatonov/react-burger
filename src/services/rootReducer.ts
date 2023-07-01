import { configureStore } from '@reduxjs/toolkit';
import { socketMiddleware } from './middleware/socketMiddleware';

import burgerIngredientsSlice from './actions/ingredients-slice';
import constructorSlice from './actions/burgerConstructor-slice';
import modalSlice from './actions/modal-slice';
import orderSlice from './actions/order-slice';
import ingredientDetailsSlice from './actions/ingredientDetails-slice';
import userSlice from './actions/userSlice';
import webSocketSlice from './actions/webSocket-slice';
import { WS_ACTIONS } from  './actions/wsActions';

const store = configureStore({
  reducer: {

    ingredients: burgerIngredientsSlice.reducer,
    burgerCart: constructorSlice.reducer,
    modal: modalSlice.reducer,
    order: orderSlice.reducer,
    ingredientDetails: ingredientDetailsSlice.reducer,
    userActions: userSlice.reducer,
    webSocket: webSocketSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware('wss://norma.nomoreparties.space/orders/all', WS_ACTIONS)),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;