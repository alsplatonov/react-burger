import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IIngredient } from '../../utils/interfaces';
import { getIngredientsData } from '../../utils/api';

interface IBurgerIngredientsState {
  items: IIngredient[];
  counter: number;
}


export const fetchIngredientsData = createAsyncThunk<IIngredient[]>(
  'ingredients/fetch',
  async () => {
    const response = await getIngredientsData();
    return response.data || [];
  }
);

const initialState: IBurgerIngredientsState = {
  items: [],
  counter: 0,
};

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
        state.items = [];
        console.error(action.error.message);
      });
  },
});

export const burgerIngredientsActions = {
  ...burgerIngredientsSlice.actions,
  fetchIngredientsData,
};

export default burgerIngredientsSlice;
