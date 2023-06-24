
import style from './App.module.css';
import AppHeader from "../AppHeader/AppHeader";
import { Outlet } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
function HeaderWrapper() {

  const ingredients = useSelector((state) => state.ingredients.items);


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