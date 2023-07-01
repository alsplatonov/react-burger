import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IWsOrder } from "../../utils/interfaces";

interface WebSocketState {
  wsOpen: boolean;
  wsError: boolean;
  orders: IWsOrder[]; 
  total: number;
  totalToday: number;
}

const initialState: WebSocketState = {
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
    wsInitializeCurrentUser(state, action) {
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
    onMessage(state, action: PayloadAction<{ orders: IWsOrder[]; total: number; totalToday: number }>) {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    onClose(state) {
      state.wsOpen = false;
    },
    wsCloseConnect(state) {
      state.wsOpen = false;
      state.wsError = false;
    },
    cleanState(state) {
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
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
  wsCloseConnect,
  cleanState,
} = webSocketSlice.actions;

export default webSocketSlice;
