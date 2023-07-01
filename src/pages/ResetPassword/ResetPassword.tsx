import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ResetPassword.module.css";
import { useNavigate } from "react-router";
import { setNewPassword } from "../../utils/api";

const ResetPassword = () => {

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmCode, setConfirmCode] = useState("");

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onChangeConfirmCode = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmCode(event.target.value);
  };

  const openLoginPage = () => {
    navigate("/login");
  }

  if (!localStorage.getItem("forgot-password")) { //если перешли не с стр. forgot-password
    navigate("/forgotpass");
  }

  const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewPassword(password, confirmCode);
    // localStorage.removeItem("forgot-password", true); //оставим след, что пользователь был на странице forgot-password
    localStorage.removeItem("forgot-password"); //оставим след, что пользователь был на странице forgot-password
    navigate("/login");
  };


  return (
    <form className={`${styles['resetPassword__form']} `} onSubmit={onSubmitForm}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <PasswordInput
        placeholder={"Введите новый пароль"}
        onChange={onChangePassword}
        value={password}
        name={"password"}
        extraClass="mt-6"
      />
      <Input
        type={"text"}
        placeholder={"Введите код из письма"}
        onChange={onChangeConfirmCode}
        value={confirmCode}
        name={"confirmCode"}
        error={false}
        extraClass="mb-6 mt-6"
      />
      <Button
        htmlType="submit"
        type="primary"
        size="large"
        extraClass="mb-20"
      >
        Сохранить
      </Button>
      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль?
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          extraClass="pr-1 pl-2"
          onClick={openLoginPage}
        >
          Войти
        </Button>
      </p>
    </form>
  );
}

export default ResetPassword;
