import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IIngredient } from '../../utils/interfaces';

interface IIngredientDetailsState {
  item: IIngredient | null;
}

const initialState: IIngredientDetailsState = {
  item: null,
};

const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    setItem(state, action: PayloadAction<IIngredient | null>) {
      state.item = action.payload;
    },
  },
});

export const ingredientDetailsActions = ingredientDetailsSlice.actions;

export default ingredientDetailsSlice;
