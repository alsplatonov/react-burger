import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import {
  Button,
  EmailInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ForgotPassword.module.css";
import { useNavigate } from "react-router";
import { resetPassword } from "../../utils/api";


const ForgotPassword = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");


  const onChangeForm = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setEmail(value);
  };

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetPassword(email)
      .then((res) => {
        localStorage.setItem("forgot-password", "true"); //оставим след, что пользователь был на странице forgot-password
        navigate("/reset-password");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const openLoginPage = () => {
    navigate("/login");
  }

  return (
    <form className={`${styles['forgotPassword__form']} `} onSubmit={onFormSubmit}>
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
      <EmailInput
        onChange={onChangeForm}
        value={email}
        name={"email"}
        placeholder="Укажите e-mail"
        isIcon={false}
        extraClass="mb-6"
      />
      <Button
        htmlType="submit"
        type="primary"
        size="large"
        extraClass={`${styles['forgotPassword__button']} pt-4`}
      >
        Восстановить
      </Button>
      <p className="text text_type_main-default text_color_inactive mt-20"> Вспомнили пароль?
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

export default ForgotPassword;
