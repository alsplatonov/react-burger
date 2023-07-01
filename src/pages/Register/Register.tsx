import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import {
  PasswordInput,
  Input,
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Register.module.css";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { userSliceActions } from "../../services/actions/userSlice";
import { getCookie } from "../../utils/cookie";
import { useAppDispatch, useAppSelector } from '../../services/redux-hook';

const Register = () => {


  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };


  const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(userSliceActions.registerUserAsync({ name, email, password }));
    navigate("/");
  };


  const openLoginPage = () => {
    navigate("/login");
  }

  return (
    <>
      <form className={`${styles['register__form']} `} onSubmit={onSubmitForm}>
        <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChangeName}
          value={name || ""}
          name={"name"}
          extraClass="mb-6"
        />
        <EmailInput
          onChange={onChangeEmail}
          value={email || ""}
          name={"email"}
          placeholder="E-mail"
          isIcon={false}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={onChangePassword}
          value={password || ""}
          name={"password"}
          extraClass="mb-6"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          extraClass={`${styles['reset__button']}`} >
          Зарегистрироваться
        </Button>
        <p className="text text_type_main-default text_color_inactive mt-20">Уже зарегистрированы?
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass="pr-2 pl-2"
            onClick={openLoginPage}
          >
            Войти
          </Button>
        </p>
      </form>
    </>
  );
}

export default Register;
