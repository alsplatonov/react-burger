import React from "react";
import { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import { NavLink, Outlet } from "react-router-dom";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { userSliceActions } from "../../services/actions/userSlice";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../services/redux-hook';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const pathname = location.pathname;


  const onLogoutUser = () => {
    dispatch(userSliceActions.logoutUserAsync());
    navigate("/login", { replace: true });

    // console.log("isLogged =:", isLogged);
  };

  return (
    <div className={`${styles['profile-wrapper']}`}>
      <nav>
        <ul className={`${styles['profile-links']}`}>
          <li className={`${styles['profile-linkItem']}`}>
            <NavLink
              to="/profile"
              className={`${styles['profile-linkStyle']} ${pathname === "/profile" ? `${styles['profile-linkItem_active']}` : ""}`}
            >
              <span className="text text_type_main-medium">Профиль</span>
            </NavLink>
          </li>
          <li className={`${styles['profile-linkItem']}`}>
            <NavLink
              to="orders"
              className={`${styles['profile-linkStyle']} ${pathname === "/profile/orders" ? `${styles['profile-linkItem_active']}` : ""}`}
            >
              <span className="text text_type_main-medium">
                История заказов
              </span>
            </NavLink>
          </li>
          <li className={`${styles['profile-linkItem']}`}>
            <Button
              htmlType="button"
              type="secondary"
              className={`${styles['profile-logOut-button']}`}
              onClick={onLogoutUser}
            >
              <span className="text text_type_main-medium">Выход</span>
            </Button>
          </li>
          <li>
            <p className="text text_type_main-default text_color_inactive mt-20">
              В этом разделе вы можете изменить свои персональные данные
            </p>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default Profile;
