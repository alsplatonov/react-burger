import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsData } from '../../utils/api';

const initialState = {
  items: [],
  counter: 0,
};

export const fetchIngredientsData = createAsyncThunk(
  'ingredients/fetch',
  async () => {
    const response = await getIngredientsData();
    return response.data || [];
  }
);

const burgerIngredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsData.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchIngredientsData.rejected, (state, action) => {
        console.error(action.error.message);
      });
  },
});

export const burgerIngredientsActions = {
  ...burgerIngredientsSlice.actions,
  fetchIngredientsData,
};

export default burgerIngredientsSlice;