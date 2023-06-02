import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import { getCookie } from "../utils/cookie";

import { userSliceActions } from "../services/actions/userSlice";

export const ProtectedRoute = ({ children, anonymous = false }) => {

  const location = useLocation();
  const from = location.state?.from || '/';
  const dispatchAction = useDispatch();


  const user = useSelector((store) => store.userActions.userInfo);
  const isLoggedIn = useSelector((store) => store.userActions.isLogged);


  useEffect(() => {
    if (getCookie("accessToken")) {
      dispatchAction(userSliceActions.getUserDataAsync());
    }
  }, []);

  // console.log("isLogged =:", isLoggedIn);
  // console.log("from =:", from);
  // console.log("anonymous =:", anonymous);
  // console.log("user =:", user);

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
  return children;
}

export default ProtectedRoute;
