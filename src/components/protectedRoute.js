import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import Profile from "../pages/Profile/Profile";
import { getCookie } from "../utils/cookie";
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

  console.log(from);
  console.log(accessIsLogged);
  console.log(isLogged);


  // console.log("куки = " + getCookie("accessToken"));
  // useEffect(() => {
  //   const checkAccessToken = () => {
  //     if (!user && getCookie("accessToken")) {
  //       dispatchAction(userSliceActions.getUserDataAsync());
  //     }
  //   };

  //   checkAccessToken(); 


  // }, []); 


  // if (user) {
  //   if (accessIsLogged) {
  //     return element;
  //   } else {
  //     return <Navigate to="/" state={{ from: location }} />;
  //   }

  // } else {
  //   return <Navigate to="/login" state={{ from: location }} />;
  // }



  // useEffect(() => {
  //   dispatchAction(userSliceActions.getUserDataAsync());
  //   if (!user) {
  //     navigate("/login", { state: { from: location }, replace: true });
  //   } else if (user && !accessIsLogged) {
  //     navigate("/", { state: { from: location }, replace: true });
  //   }
  //   // }, [user, accessIsLogged, navigate, location]);
  // }, []);

  // useEffect(() => {
  //   dispatchAction(userSliceActions.getUserDataAsync());
  //   if (user && accessIsLogged) {
  //     navigate("/login", { state: { from: location }, replace: true });
  //   } else if (!user && !accessIsLogged) {
  //     navigate("/", { state: { from: location }, replace: true });
  //   }
  //   // }, [user, accessIsLogged, navigate, location]);
  // }, []);


  // useEffect(() => {
  //   dispatchAction(userSliceActions.getUserDataAsync());
  //   if (user && accessIsLogged) {
  //     return <Navigate to={from} />;
  //   }

  //   if (!user && !accessIsLogged) {
  //     return <Navigate to="/login" state={{ from: location }} />;
  //   }
  //   // }, [user, accessIsLogged, navigate, location]);
  // }, []);



















  // useEffect(() => {
  //   // dispatchAction(userSliceActions.getUserDataAsync());
  //   if (isLogged && !accessIsLogged) {
  //     navigate("/");
  //   }

  //   if (!isLogged && accessIsLogged) {
  //     navigate("/login", { state: { from: location }, replace: true });
  //   }
  //   // }, [user, accessIsLogged, navigate, location]);
  // }, []);


  // return element;




  useEffect(() => {
    if (isLogged && !accessIsLogged) {
      navigate("/");
    }

    if (!isLogged && accessIsLogged) {
      navigate("/login", { state: { from: location }, replace: true });
    }

  }, []);

  return isLogged || !accessIsLogged ? element : <Navigate to="/login" />;

};

export default ProtectedRoute;