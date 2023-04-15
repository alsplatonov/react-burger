import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderNumber: 0,
  orderPrice: 0,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderNumber(state, action) {
      state.orderNumber = action.payload;
    },
    setOrderPrice(state, action) {
      state.orderPrice = action.payload;
    },


  },
});

export const orderActions = orderSlice.actions;

export default orderSlice;
