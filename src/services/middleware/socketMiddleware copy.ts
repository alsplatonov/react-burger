export const socketMiddleware = (wsUrl, wsActions) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsInitialize, wsInitializeCurrentUser, onOpen, onClose, onError, onMessage, wsCloseConnect } = wsActions;
 

      if (type === wsInitialize) {
        socket = new WebSocket(wsUrl);   // объект класса WebSocket
      }
      
      if (type === wsInitializeCurrentUser) { //если текущий пользователь
        socket = new WebSocket(payload);
      }

      if (socket) {
        socket.onopen = event => { // функция, которая вызывается при открытии сокета
          dispatch({ type: onOpen});
        };

        socket.onerror = event => {  // функция, которая вызывается при ошибке соединения
          dispatch({ type: onError});
        };

        socket.onmessage = event => { // функция, которая вызывается при получении события от сервера
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {  // функция, которая вызывается при закрытии соединения
          dispatch({ type: onClose });
        };

        if (type === wsCloseConnect) {  //закрыть соединение
          socket.close();
        }
      }

      next(action);
    };
  };
};