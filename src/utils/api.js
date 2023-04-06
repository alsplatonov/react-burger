
export const getIngredientsData = async () => {
  return await fetch('https://norma.nomoreparties.space/api/ingredients')
    .then((res) => checkResponse(res));
}


export const getOrderNumber = (ingredients) => { // POST-запрос для получения номера заказа
  return fetch('https://norma.nomoreparties.space/api/orders', {
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