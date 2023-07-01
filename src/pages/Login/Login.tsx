import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import {
  PasswordInput,
  Input,
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Login.module.css";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { userSliceActions } from "../../services/actions/userSlice";
import { useAppDispatch, useAppSelector } from '../../services/redux-hook';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const from = location.state?.from;

  const openRegisterPage = () => {
    navigate("/register");
  }

  const openForgotPasswordPage = () => {
    navigate("/forgot-password");
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  // console

  const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(userSliceActions.loginUserAsync({ email, password }));
    navigate(from);
  };


  return (
    <form className={`${styles['login__form']} `} onSubmit={onSubmitForm}>
      <h1 className="text text_type_main-medium">Вход</h1>
      <EmailInput
        onChange={onChangeEmail}
        value={email || ""}
        name={"email"}
        placeholder="E-mail"
        isIcon={false}
        extraClass="mt-6"
      />
      <PasswordInput
        onChange={onChangePassword}
        value={password || ""}
        name={"password"}
        extraClass="mb-6 mt-6"
      />
      <Button
        htmlType="submit"
        type="primary"
        size="large"
        extraClass={`${styles['login__button']} pt-4`} >
        Войти
      </Button>
      <p className="text text_type_main-default text_color_inactive mt-20">Вы - новый пользователь?
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          extraClass="pr-1 pl-2 pb-2"
          onClick={openRegisterPage}
        >
          Зарегистрироваться
        </Button>
      </p>
      <p className="text text_type_main-default text_color_inactive">Забыли пароль?
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          extraClass="pt-2 pr-1 pl-2"
          onClick={openForgotPasswordPage}
        >
          Восстановить пароль
        </Button>
      </p>
    </form>
  );
};

export default Login;
