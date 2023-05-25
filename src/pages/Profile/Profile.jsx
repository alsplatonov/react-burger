import React from "react";

import styles from "./Profile.module.css";
import { NavLink } from "react-router-dom";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

const Profile = () => {


  return (
    <div className={`${styles['profile-wrapper']}`}>
      <nav>
        <ul className={`${styles['profile-links']}`}>
          <li className={`${styles['profile-linkItem']}`}>
            <NavLink
              to="/profile"
              className={`${styles['profile-linkStyle']}`}
            >
              <span className="text text_type_main-medium">Профиль</span>
            </NavLink>
          </li>
          <li className={`${styles['profile-linkItem']}`}>
            <NavLink
              to="ordershistory"
              className={`${styles['profile-linkStyle']}`}
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
      <form className={`${styles['profile-form']}`}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          // onChange={onChange}
          value={""}
          name={"name"}
          error={false}
          icon="EditIcon"
          extraClass="mb-6"
        />
        <EmailInput
          // onChange={onChange}
          value={""}
          name={"email"}
          placeholder="Логин"
          isIcon={true}
          extraClass="mb-6"
        />
        <PasswordInput
          // onChange={onChange}
          value={""}
          name={"password"}
          extraClass="mb-6"
          icon="EditIcon"
        />
      </form>
    </div>
  );
}

export default Profile;
