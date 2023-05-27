import {
  PasswordInput,
  Input,
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Login.module.css";
import { useNavigate } from "react-router";

  const Login = () => {
    const navigate = useNavigate();

    const openRegisterPage = () => {
      navigate("/register");
    }

    const openForgotPasswordPage = () => {
      navigate("/forgot-password");
    }
  
  
  return (
    <form className={`${styles['login__form']} `} >
      <h1 className="text text_type_main-medium">Вход</h1>
      <EmailInput
        // onChange={onChange}
        value={""}
        name={"email"}
        placeholder="E-mail"
        isIcon={false}
        extraClass="mt-6"
      />
      <PasswordInput
        // onChange={onChange}
        value={""}
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
