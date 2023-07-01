import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import { getCookie } from "../utils/cookie";
import { useAppDispatch, useAppSelector } from "../services/redux-hook";
import { userSliceActions } from "../services/actions/userSlice";
import React, { FC, ReactElement, ReactNode } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  anonymous?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, anonymous = false }) => {

  const location = useLocation();
  const from = location.state?.from || '/';
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((store) => store.userActions.userInfo);
  const isLoggedIn = useAppSelector((store) => store.userActions.isLogged);


  useEffect(() => {
    if (getCookie("accessToken")) {
      dispatch(userSliceActions.getUserDataAsync());
    }
  }, []);

  // console.log("isLogged =:", isLoggedIn);
  // console.log("from =:", from);
  // console.log("anonymous =:", anonymous);
  // console.log("user =:", user);

  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonymous && user) {
    // ...то отправляем его на предыдущую страницу
    navigate(from);
    return null; // You can also ret
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !user) {
    // ...то отправляем его на страницу логин
    navigate("/login", { state: { from: location } });
    return null; // 
  }

  // Если все ок, то рендерим внутреннее содержимое
  return (children as ReactElement);
}

export default ProtectedRoute;
