import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrderNumber } from '../../utils/api';

const initialState = {
  orderNumber: 0,
  orderPrice: 0,
};

export const fetchOrderNumber = createAsyncThunk(
  'order/fetchNumber',
  async (ids) => {
    const response = await getOrderNumber(ids);
    return response.order.number;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderPrice(state, action) {
      state.orderPrice = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderNumber.fulfilled, (state, action) => {
        state.orderNumber = action.payload;
      })
      .addCase(fetchOrderNumber.rejected, (state, action) => {
        console.error(action.error.message);
      });
  },
});

export const orderActions = {
  ...orderSlice.actions,
  fetchOrderNumber,
};

export default orderSlice;
