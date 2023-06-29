import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import store from './services/rootReducer';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { burgerIngredientsActions } from './services/actions/ingredients-slice';




const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

