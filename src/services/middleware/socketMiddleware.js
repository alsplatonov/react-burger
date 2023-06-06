export const socketMiddleware = (wsUrl, wsActions) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsInitialize, wsInitializeCurrentUser, onOpen, onClose, onError, onMessage, wsClose } = wsActions;
 

      if (type === wsInitialize) {
        socket = new WebSocket(wsUrl);   // объект класса WebSocket
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

        if (type === wsClose) {
          socket.close();
        }
      }

      next(action);
    };
  };
};