import AppHeader from '../AppHeader/AppHeader';
import AppMain from '../AppMain/AppMain';
import { useEffect } from 'react';
import style from './App.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { burgerIngredientsActions } from '../../services/actions/ingredients-slice';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';
import Register from '../../pages/Register/Register';
import Login from '../../pages/Login/Login';
import { Routes, Route } from "react-router";
import HeaderWrapper from '../HeaderWrapper/HeaderWrapper';
import Profile from '../../pages/Profile/Profile';

const App = () => {

  const dispatchAction = useDispatch();

  useEffect(() => {
    dispatchAction(burgerIngredientsActions.fetchIngredientsData());
  }, []);


  return (
    <>
      <Routes>
        <Route path="/" element={<HeaderWrapper />}>
          <Route index element={<AppMain />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="profile" element={<Profile />} />
        </Route>

      </Routes>
    </>
  );
}

export default App;
