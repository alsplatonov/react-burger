import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registerUser, loginUser, logoutUser, getUserData, updateToken, updateUserData } from '../../utils/api';
import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';
// import { RootState } from '../store';
import { IUserData, IUserState } from '../../utils/interfaces';

const initialState: IUserState = {
  userInfo: null,
  // accessToken: '',
  // refreshToken: '',
  isLogged: false,
};

const checkResponse = async (response: Response) => {
  if (response.ok) {
    const data = await response.json();
    // return data.user;
    return data;
  } else {
    throw new Error('Ошибка при запросе');
  }
};

export const registerUserAsync = createAsyncThunk(
  'user/register',
  async (credentials: IUserData) => {
    const response = await registerUser(credentials);
    const data = await checkResponse(response);
    if (data.accessToken) {
      setCookie("accessToken", data.accessToken.replace("Bearer ", ""));
    }
    setCookie("refreshToken", data.refreshToken);
    return data;
  }
);

export const loginUserAsync = createAsyncThunk(
  'user/login',
  async (credentials: IUserData) => {
    const response = await loginUser(credentials);
    const data = await checkResponse(response);
    
    setCookie("accessToken", data.accessToken.replace("Bearer ", ""));
    setCookie("refreshToken", data.refreshToken);

    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");

    console.log("accessToken доступа найден:", accessToken);
    console.log("refreshToken доступа найден:", refreshToken);
    return data;
  }
);

export const updateUserDataAsync = createAsyncThunk(
  'user/upddata',
  async (credentials: IUserData) => {
    const response = await updateUserData(credentials);
    const data = await checkResponse(response);
    return data;
  }
);

export const logoutUserAsync = createAsyncThunk(
  'user/logout',
  async () => {
    logoutUser(); // Удаление cookie на клиентской стороне
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    return null; // Возвращаем null, так как нет данных для обновления состояния
  }
);

const updateUserToken = async (token: string) => {
  try {
    const res = await updateToken(token);
    const data = await checkResponse(res);
    if (data.accessToken) {
      setCookie("accessToken", data.accessToken.replace("Bearer ", ""));
    }
    setCookie("refreshToken", data.refreshToken);
    const response = await getUserData(); // заново пытаемся получить пользовательские данные
    const userData = await checkResponse(response);
    return userData;
  } catch (error) {
    console.log('Ошибка при обновлении токена:', error);
  }
};


export const getUserDataAsync = createAsyncThunk(
  'user/getUserData',
  async () => {
    const response = await getUserData();
    try {
      const data = await checkResponse(response);
      return data.user;
    } catch (error) {
      console.log('Ошибка получения данных пользователя');
      const accessToken = getCookie("accessToken");
      const refreshToken = getCookie("refreshToken");
      console.log("accessToken :", accessToken);
      console.log("refreshToken :", refreshToken);
      if (refreshToken) {
        return updateUserToken(refreshToken);
      } else {
        throw new Error('Нет доступа к данным пользователя');
      }
    }
  }
);

const userSlice = createSlice({
  name: 'userActions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.pending, (state) => {
        return { ...state, userInfo: null, isLogged: false };
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.isLogged = true;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        console.error(action.error.message);
        state.isLogged = false;
      })
      .addCase(loginUserAsync.pending, (state) => {
        return { ...state, userInfo: null, isLogged: false };
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.isLogged = true;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        console.error(action.error.message);
        state.isLogged = false;
      })
      .addCase(updateUserDataAsync.pending, (state) => {
        return { ...state };
      })
      .addCase(updateUserDataAsync.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.isLogged = true;
      })
      .addCase(updateUserDataAsync.rejected, (state, action) => {
        console.error(action.error.message);
      })
      .addCase(logoutUserAsync.pending, (state) => {
        return { ...state };
      })
      .addCase(logoutUserAsync.fulfilled, (state, action) => {
        state.userInfo = null;
        state.isLogged = false;
      })
      .addCase(logoutUserAsync.rejected, (state, action) => {
        console.error(action.error.message);
      })
      .addCase(getUserDataAsync.pending, (state) => {
        return { ...state };
      })
      .addCase(getUserDataAsync.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.isLogged = true;
      })
      .addCase(getUserDataAsync.rejected, (state, action) => {
        console.error(action.error.message);
        state.isLogged = false;
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



