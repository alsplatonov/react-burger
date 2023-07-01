import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IIngredient } from '../../utils/interfaces';
import { ICartItem, IBun } from '../../utils/interfaces';


interface IBurgerCartState {
  items: ICartItem[];
  bun: IBun | null;
  isCartContentChanged: boolean;
}

const initialState: IBurgerCartState = {
  items: [],
  bun: null,
  isCartContentChanged: false,
};

const constructorSlice = createSlice({
  name: 'burgerCart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<IIngredient & { key: number|string }>) {
      const newItem = action.payload;
      state.isCartContentChanged = true;

      if (newItem.type !== 'bun') {
        const existingItem = state.items.find((item) => item._id === newItem._id);
        if (!existingItem) {
          state.items.push({
            ...newItem,
            counter: 1,
          });
        } else {
          state.items.push({
            ...newItem,
            counter: existingItem.counter++,
          });
        }
      } else {
        state.bun = {
          ...newItem,
          counter: 1,
        };
      }
    },
    removeItem(state, action: PayloadAction<ICartItem>) {
      const newItem = action.payload;
      state.isCartContentChanged = true;
      state.items = state.items.map((item) => {
        if (item.key === newItem.key) {
          if (item.counter > 1) {
            item.counter--;
            return item;
          }
        }
        return item;
      });
      state.items = state.items.filter((item) => item.key !== newItem.key);
    },
    updateCart(state, action: PayloadAction<{ items: ICartItem[] }>) {
      state.items = action.payload.items;
    },
    moveItem(state, action: PayloadAction<{ dragIndex: number; hoverIndex: number; dragIngredient: ICartItem }>) {
      const { dragIndex, hoverIndex, dragIngredient } = action.payload;
      state.items.splice(dragIndex, 1);
      state.items.splice(hoverIndex, 0, dragIngredient);
    },
    removeAll(state) {
      state.items = [];
      state.bun = null;
      state.isCartContentChanged = false;
    },
  },
});

export const burgerConstructorActions = constructorSlice.actions;

export default constructorSlice;
