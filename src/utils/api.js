import { BASE_URL } from "./constants";
import { getCookie } from "./cookie";

export const getIngredientsData = async () => {
  return await fetch(`${BASE_URL}/ingredients`)
    .then((res) => checkResponse(res));
}


export const getOrderNumber = (ingredients) => { // POST-запрос для получения номера заказа
  return fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "ingredients": ingredients
    })
  })
    .then((res) => checkResponse(res));
}

export const resetPassword = (email) => {
  return fetch(`${BASE_URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  })
  .then((res) => checkResponse(res));
}

export const registerUser = (credentials) => {
  return fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
    }),
  });
};

export const loginUser = (credentials) => {
  return fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  });
};

export const logoutUser = () => {
  return fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  });
};
















const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}