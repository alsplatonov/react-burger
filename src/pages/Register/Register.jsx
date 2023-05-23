import { useState } from "react";
import {
  PasswordInput,
  Input,
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Register.module.css";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({});

  const onChange = (event) => {
    
  };

  const openLoginPage = () => {
    navigate("/login");
  }

  return (
    <>
      <form className={`${styles['Register__form']} `} >
        <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChange}
          value={values.name || ""}
          name={"name"}
          extraClass="mb-6"
        />
        <EmailInput
          onChange={onChange}
          value={""}
          type={"email"}
          name={"email"}
          placeholder="E-mail"
          isIcon={false}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={onChange}
          value={""}
          type={"password"}
          name={"password"}
          extraClass="mb-6"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          extraClass={`${styles['Reset__button']}`} >
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
