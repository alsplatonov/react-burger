import React from "react";
import { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import { NavLink } from "react-router-dom";
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

const Profile = () => {
  const navigate = useNavigate();
  const dispatchAction = useDispatch();
  const location = useLocation();
  const pathname = location.pathname;

  const onLogoutUser = () => {
    dispatchAction(userSliceActions.logoutUserAsync());
    navigate("/login");
  };

  const user = useSelector((store) => store.userActions.userInfo);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.user.name);
      setEmail(user.user.email);
      setPassword(user.user.password);
    }
  }, []);



  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const cancelChanges = () => {
    setName(user.user.name);
    setEmail(user.user.email);
    setPassword(user.user.password);
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    dispatchAction(userSliceActions.updateUserDataAsync({ name, email, password }));
    navigate("/profile");
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
      <form className={`${styles['profile-form']}`} onSubmit={onSubmitForm}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChangeName}
          value={name || ""}
          name={"name"}
          error={false}
          icon="EditIcon"
          extraClass="mb-6"
        />
        <EmailInput
          onChange={onChangeEmail}
          value={email || ""}
          name={"email"}
          placeholder="Логин"
          isIcon={true}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={onChangePassword}
          value={password || ""}
          name={"password"}
          extraClass="mb-6"
          icon="EditIcon"
        />
        <div className={`${styles['profile-submit-button']}`}>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass="pr-5"
            onClick={cancelChanges}
          >
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
