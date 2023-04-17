import { createSlice } from '@reduxjs/toolkit';
import { getOrderNumber } from '../utils/api';

const initialState = {
  orderNumber: 0,
  orderPrice: 0,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderNumber(state, action) {
      // state.orderNumber = action.payload;
      let orderNum = 0;
      const getOrderNum = async () => {
        return await getOrderNumber(action.payload)
          .then((res) =>
            orderNum = res.order.number)
          .catch((err) =>
            console.err(err));
      }
      (() => {
        getOrderNum();
      })();

      state.orderNumber = orderNum;
    },
    setOrderPrice(state, action) {
      state.orderPrice = action.payload;
    },


  },
});

export const orderActions = orderSlice.actions;

export default orderSlice;
