import {
  PasswordInput,
  Input,
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Login.module.css";

  const Login = () => {
  
  return (
    <form className={`${styles['Login__form']} `} >
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
        extraClass={`${styles['Login__button']} pt-4`} >
        Войти
      </Button>
      <p className="text text_type_main-default text_color_inactive mt-20">Вы - новый пользователь?
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          extraClass="pr-1 pl-2 pb-2"
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
        >
          Восстановить пароль
        </Button>
      </p>
    </form>
  );
};

export default Login;
