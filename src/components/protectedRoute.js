import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Profile from "../pages/Profile/Profile";


export const ProtectedRoute = ({ element }) => {
  const user = useSelector((store) => store.userActions.userInfo);
  const location = useLocation();
  const from = location.state?.from || '/';
  console.log(user);
  if (user) {
    return element;
  } else {
    return <Navigate to="/login" state={{ from: location }} />;
  }
};

export default ProtectedRoute;