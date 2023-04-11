import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  IsOpenModal: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleModal(state) {
      state.IsOpenModal = !state.IsOpenModal;
      }
    },
});

export const modalActions = modalSlice.actions;

export default modalSlice;
