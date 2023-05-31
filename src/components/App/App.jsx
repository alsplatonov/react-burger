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
import { Routes, Route, useNavigate, useLocation } from "react-router";
import HeaderWrapper from '../HeaderWrapper/HeaderWrapper';
import Profile from '../../pages/Profile/Profile';
import ProtectedRoute from '../protectedRoute';
import NotFound from '../../pages/NotFound/NotFound';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import Orders from '../Orders/Orders';
import ProfileForm from '../ProfileForm/ProfileForm';
import Feed from '../../pages/Feed/Feed';
import { ingredientDetailsActions } from '../../services/actions/ingredientDetails-slice';
import { modalActions } from '../../services/actions/modal-slice';

const App = () => {
  const isOpenModal = useSelector((state) => state.modal.IsOpenModal);
  const ingredientDetailsItem = useSelector((state) => state.ingredientDetails.item);
  const dispatchAction = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatchAction(burgerIngredientsActions.fetchIngredientsData());
  }, []);

  const location = useLocation();
  const background = location.state?.background;
  console.log(background);

  const onCloseModal = () => {
    dispatchAction(ingredientDetailsActions.setItem(null));  //очищаем ингредиент
    dispatchAction(modalActions.toggleModal()); //указываем состояние isOpenModal = false
    navigate(-1, { state: { background: null } });
  };

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<HeaderWrapper />}>
          <Route index element={<AppMain />} />
          <Route path="forgot-password" element={<ProtectedRoute accessIsLogged={false} element={<ForgotPassword />} />} />
          <Route path="login" element={<ProtectedRoute accessIsLogged={false} element={<Login />} />} />
          <Route path="register" element={<ProtectedRoute accessIsLogged={false} element={<Register />} />} />
          <Route path="reset-password" element={<ProtectedRoute accessIsLogged={false} element={<ResetPassword />} />} />
          <Route path="profile/*" element={<ProtectedRoute accessIsLogged={true} element={<Profile />} />} >
            <Route index element={<ProfileForm />} />
            <Route path="orders" element={<Orders />} />
          </Route>
          <Route path="feed" element={<ProtectedRoute accessIsLogged={true} element={<Feed />} />} />
          <Route path={`/ingredients/:id`} element={<IngredientDetails />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path="ingredients/:id"
            element={
              isOpenModal && ingredientDetailsItem !== null &&
              <Modal onCloseModal={onCloseModal}>
                <IngredientDetails />
              </Modal>

            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
