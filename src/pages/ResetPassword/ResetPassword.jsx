import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ResetPassword.module.css";


const ResetPassword = () => {

  return (
    <form className={`${styles['ResetPassword__form']} `} >
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <PasswordInput
        placeholder={"Введите новый пароль"}
        // onChange={onChange}
        value={""}
        name={"password"}
        extraClass="mt-6"
      />
      <Input
        type={"text"}
        placeholder={"Введите код из письма"}
        // onChange={onChange}
        value={""}
        name={"lettercode"}
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
        >
          Войти
        </Button>
      </p>
    </form>
  );
}

export default ResetPassword;
