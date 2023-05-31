import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { useNavigate } from "react-router";

import { userSliceActions } from "../services/actions/userSlice";

export const ProtectedRoute = ({ accessIsLogged, element }) => {

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';
  const dispatchAction = useDispatch();


  useEffect(() => {
    dispatchAction(userSliceActions.getUserDataAsync());
  }, []);

  const user = useSelector((store) => store.userActions.userInfo);
  const isLogged = useSelector((store) => store.userActions.isLogged);

  // console.log(from);
  // console.log(accessIsLogged);
  // console.log(isLogged);


  useEffect(() => {
    if (isLogged && user && !accessIsLogged) {
      navigate("/");
    }
    if (!isLogged && !user && accessIsLogged) {
      navigate("/login", { state: { from: location }, replace: true });
    }
  }, []);

  return isLogged || !accessIsLogged ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;