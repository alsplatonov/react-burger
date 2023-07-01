import { Middleware } from "redux";
import { IWebSocketActions } from "../../utils/interfaces";


export const WS_ACTIONS: IWebSocketActions = {
  wsInitialize: "webSocket/wsInitialize",
  wsInitializeCurrentUser: "webSocket/wsInitializeCurrentUser",
  onOpen: "webSocket/onOpen",
  onClose: "webSocket/onClose",
  onError: "webSocket/onError",
  onMessage: "webSocket/onMessage",
  wsCloseConnect: "webSocket/wsCloseConnect",
};

export const socketMiddleware = (wsUrl: string, wsActions: IWebSocketActions): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsInitialize, wsInitializeCurrentUser, onOpen, onClose, onError, onMessage, wsCloseConnect } = wsActions;

      if (type === wsInitialize) {
        socket = new WebSocket(wsUrl);
      }

      // if (type === wsInitializeCurrentUser) {
      //   if (typeof payload === "string") {
      //     socket = new WebSocket(payload);
      //   }
      // }

      if (type === wsInitializeCurrentUser) {
       
          socket = new WebSocket(payload);
        
      }

      // if (type === wsInitializeCurrentUser) {
      //   if (payload && typeof payload === "object" && payload.url) {
      //     socket = new WebSocket(payload.url);
      //   }
      // }


      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose });
        };

        if (type === wsCloseConnect) {
          socket.close();
        }
      }

      next(action);
    };
  };
};
