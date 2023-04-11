import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  item: null,
};

const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    setItem(state, action) {   
      state.item = action.payload;
    },
    },
});

export const ingredientDetailsActions = ingredientDetailsSlice.actions;

export default ingredientDetailsSlice;
