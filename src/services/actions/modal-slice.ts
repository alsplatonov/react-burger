import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IModalState {
  IsOpenModal: boolean;
}

const initialState: IModalState = {
  IsOpenModal: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleModal(state) {
      state.IsOpenModal = !state.IsOpenModal;
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice;
