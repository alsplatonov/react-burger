import React, { useEffect } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import AppMain from '../AppMain/AppMain';
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
import FeedExtension from '../FeedExtensions/FeedExtensions';
import { useAppDispatch, useAppSelector } from '../../services/redux-hook';

const App = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(burgerIngredientsActions.fetchIngredientsData());
  }, []);

  const location = useLocation();
  const background = location.state?.background;

  const onCloseModal = () => {
    dispatch(ingredientDetailsActions.setItem(null));  //очищаем ингредиент
    dispatch(modalActions.toggleModal()); //указываем состояние isOpenModal = false
    // navigate(-1, { state: { background: null } });
    navigate(-1);
  };

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<HeaderWrapper />}>
          <Route index element={<AppMain />} />
          <Route path="feed" element={<Feed />}>
          </Route>
          <Route
            path="/feed/:id"
            element={<FeedExtension />}
          />
          <Route path="forgot-password" element={<ProtectedRoute anonymous={true} ><ForgotPassword /></ProtectedRoute>} />
          <Route path="login" element={<ProtectedRoute anonymous={true} ><Login /></ProtectedRoute>} />
          <Route path="register" element={<ProtectedRoute anonymous={true} ><Register /></ProtectedRoute>} />
          <Route path="reset-password" element={<ProtectedRoute anonymous={true} ><ResetPassword /></ProtectedRoute>} />
          <Route path="profile/*" element={<ProtectedRoute anonymous={false} ><Profile /></ProtectedRoute>} >
            <Route index element={<ProfileForm />} />
            <Route path="orders" element={<Orders />} />
          </Route>
          <Route
            path="profile/orders/:id"
            element={<FeedExtension />}
          />
          <Route path={`/ingredients/:id`} element={<IngredientDetails />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes >
      {background && (
        <Routes>
          <Route path="/" element={<HeaderWrapper />}>
            <Route
              path="ingredients/:id"
              element={
                <Modal onCloseModal={onCloseModal}>
                  <IngredientDetails />
                </Modal>
              }
            />
          </Route>
          <Route
            path="feed/:id"
            element={
              <Modal onCloseModal={onCloseModal}>
                <FeedExtension />
              </Modal>
            }
          />
          <Route
            path="profile/orders/:id"
            element={
              <Modal onCloseModal={onCloseModal}>
                <FeedExtension />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
