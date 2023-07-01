import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { getCookie } from "../utils/cookie";
import { useAppDispatch, useAppSelector } from "../services/redux-hook";
import { userSliceActions } from "../services/actions/userSlice";
import React, { FC, ReactNode, ReactElement } from "react"; 

interface ProtectedRouteProps {
  children: ReactNode;
  anonymous?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, anonymous = false }) => {

  const location = useLocation();
  const from = location.state?.from || '/';
  const dispatch = useAppDispatch();

  const user = useAppSelector((store) => store.userActions.userInfo);

  useEffect(() => {
    if (getCookie("accessToken")) {
      dispatch(userSliceActions.getUserDataAsync());
    }
  }, []);

  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonymous && user) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate to={from} />;
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !user) {
    // ...то отправляем его на страницу логин
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Если все ок, то рендерим внутреннее содержимое
  return (children as ReactElement);
}

export default ProtectedRoute;
