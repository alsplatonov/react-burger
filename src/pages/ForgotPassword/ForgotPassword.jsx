import {
  Button,
  EmailInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ForgotPassword.module.css";
import { useNavigate } from "react-router";

const ForgotPassword = () => {

  const navigate = useNavigate();

  const openLoginPage = () => {
    navigate("/login");
  }

  return (
    <form className={`${styles['ForgotPassword__form']} `} >
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
      <EmailInput
        // onChange={onChange}
        value={""}
        name={"email"}
        placeholder="Укажите e-mail"
        isIcon={false}
        extraClass="mb-6"
      />
      <Button
        htmlType="submit"
        type="primary"
        size="large"
        extraClass={`${styles['ForgotPassword__button']} pt-4`} >

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
