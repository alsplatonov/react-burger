import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrderNumber } from '../../utils/api';

interface IOrderState {
  orderNumber: number;
  orderPrice: number;
  isPending: boolean;
}

const initialState: IOrderState = {
  orderNumber: 0,
  orderPrice: 0,
  isPending: false,
};

export const fetchOrderNumber = createAsyncThunk<number, string[]>(
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
    setOrderPrice(state, action: PayloadAction<number>) {
      state.orderPrice = action.payload;
    },
    setOrderNumber(state, action: PayloadAction<number>) {
      state.orderNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderNumber.pending, (state) => {
        state.isPending = true;
      })
      .addCase(fetchOrderNumber.fulfilled, (state, action) => {
        state.orderNumber = action.payload;
        state.isPending = false;
      })
      .addCase(fetchOrderNumber.rejected, (state, action) => {
        state.orderNumber = 0;
        state.isPending = false;
        console.error(action.error.message);
      });
  },
});

export const orderActions = {
  ...orderSlice.actions,
  fetchOrderNumber,
};

export default orderSlice;
