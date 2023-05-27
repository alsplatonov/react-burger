import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser, logoutUser } from '../../utils/api';
import { setCookie, deleteCookie } from '../../utils/cookie';

const initialState = {
  userInfo: null,
  accessToken: '',
  isLogged: false,
};

export const registerUserAsync = createAsyncThunk(
  'user/register',
  async (credentials) => {
    const response = await registerUser(credentials);
    if (response.ok) {
      const data = await response.json();
      setCookie("accessToken", data.accessToken.replace("Bearer ", ""));
      setCookie("refreshToken", data.refreshToken);
      return data;
    } else {
      throw new Error('Ошибка регистрации пользователя');
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  'user/login',
  async (credentials) => {
    const response = await loginUser(credentials);
    if (response.ok) {
      const data = await response.json();
      setCookie("accessToken", data.accessToken.replace("Bearer ", ""));
      setCookie("refreshToken", data.refreshToken);
      return data;
    } else {
      throw new Error('Ошибка авторизации');
    }
  }
);

export const logoutUserAsync = createAsyncThunk(
  'user/logout',
  async () => {
    logoutUser(); // Удаление cookie на клиентской стороне
    return null; // Возвращаем null, так как нет данных для обновления состояния
  }
);

const userSlice = createSlice({
  name: 'userActions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.isLogged = true;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        console.error(action.error.message);
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.isLogged = true;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        console.error(action.error.message);
      })
      .addCase(logoutUserAsync.fulfilled, (state, action) => {
        return initialState; // Присваиваем начальное состояние для среза пользователя
      })
      .addCase(logoutUserAsync.rejected, (state, action) => {
        console.error(action.error.message);
      });
  },
});

export const userSliceActions = {
  ...userSlice.actions,
  registerUserAsync,
  loginUserAsync,
  logoutUserAsync,
};

export default userSlice.reducer;