import { BASE_URL } from "./constants";

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


const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}