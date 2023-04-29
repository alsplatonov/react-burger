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

const App = () => {

  const dispatchAction = useDispatch();

  useEffect(() => {
    dispatchAction(burgerIngredientsActions.fetchIngredientsData());
  }, []);

  const ingredients = useSelector((state) => state.ingredients.items);

  return (
<Login />
    // <>
    //   {ingredients.length !== 0 && (
    //     <div className={style.app}>
    //       <AppHeader />
    //       <AppMain />
    //     </div>
    //   )}
    // </>
  );
}

export default App;
