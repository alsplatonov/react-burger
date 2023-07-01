
import style from './App.module.css';
import AppHeader from "../AppHeader/AppHeader";
import { Outlet } from "react-router";
import { useAppDispatch, useAppSelector } from '../../services/redux-hook';

function HeaderWrapper() {

  const ingredients = useAppSelector((state) => state.ingredients.items);


  return (
    <>
      <div className={style.app}>
        <AppHeader />
        <Outlet />
      </div>
    </>
  );
}

export default HeaderWrapper;