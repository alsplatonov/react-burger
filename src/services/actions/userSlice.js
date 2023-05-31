import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser, logoutUser, getUserData, updateToken, updateUserData } from '../../utils/api';
import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';

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
      if (data.accessToken) {
        setCookie("accessToken", data.accessToken.replace("Bearer ", ""));
      }
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

      const accessToken = getCookie("accessToken");
      const refreshToken = getCookie("refreshToken");

      console.log("accessToken доступа найден:", accessToken);
      console.log("refreshToken доступа найден:", refreshToken);
      return data;
    } else {
      throw new Error('Ошибка авторизации');
    }
  }
);

export const updateUserDataAsync = createAsyncThunk(
  'user/upddata',
  async (credentials) => {
    const response = await updateUserData(credentials);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Ошибка обновления данных');
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

export const getUserDataAsync = createAsyncThunk(
  'user/getUserData',
  async () => {
    const response = await getUserData();
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.log('Ошибка получения данных пользователя');
      const accessToken = getCookie("accessToken");
      const refreshToken = getCookie("refreshToken");

      console.log("accessToken доступа найден:", accessToken);
      console.log("refreshToken доступа найден:", refreshToken);
      updateUserToken(refreshToken);//токен устарел, пробуем обновить
    }
  }
);

const updateUserToken = (token) => {
  return updateToken(token)
    .then((res) => {
      if (res.accessToken) {
        setCookie("accessToken", res.accessToken.replace("Bearer ", ""));
      }
      setCookie("refreshToken", res.refreshToken);
      getUserDataAsync();
    });
};

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
      .addCase(updateUserDataAsync.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.isLogged = true;
      })
      .addCase(updateUserDataAsync.rejected, (state, action) => {
        console.error(action.error.message);
      })
      .addCase(logoutUserAsync.fulfilled, (state, action) => {
        return initialState; // Присваиваем начальное состояние для среза пользователя
      })
      .addCase(logoutUserAsync.rejected, (state, action) => {
        console.error(action.error.message);
      })
      .addCase(getUserDataAsync.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.isLogged = true;
      })
      .addCase(getUserDataAsync.rejected, (state, action) => {
        console.error(action.error.message);
      });
  },
});

export const userSliceActions = {
  ...userSlice.actions,
  registerUserAsync,
  loginUserAsync,
  updateUserDataAsync,
  logoutUserAsync,
  getUserDataAsync,
};


export default userSlice;