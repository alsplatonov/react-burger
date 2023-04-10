import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  IsOpenModal: false,
  item: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setItem(state, action) {   
      state.item = action.payload;
    },
    toggleModal(state) {
      state.IsOpenModal = !state.IsOpenModal;
      }
    },
});

export const modalActions = modalSlice.actions;

export default modalSlice;
