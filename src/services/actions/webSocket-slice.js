import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  wsOpen: false,
  wsError: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

const webSocketSlice = createSlice({
  name: "webSocket",
  initialState,
  reducers: {
    wsInitialize(state) {    
      state.wsOpen = false;
      state.wsError = false;
    },
    wsInitializeCurrentUser(state) {
      state.wsOpen = false;
      state.wsError = false;
    },
    onOpen(state) {
      state.wsOpen = true;
      state.wsError = false;
    },
    onError(state) {
      state.wsOpen = false;
      state.wsError = true;
    },
    onMessage(state, action) {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    onClose(state) {
      state.wsOpen = false;
    },
    wsClose(state) {
      state.wsOpen = false;
      state.wsError = false;
    },
  },
});

export const {
  wsInitialize,
  wsInitializeCurrentUser,
  onOpen,
  onClose,
  onError,
  onMessage,
  wsClose,
} = webSocketSlice.actions;

export default webSocketSlice;
