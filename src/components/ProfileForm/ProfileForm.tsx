import React from "react";
import { useState, useEffect } from "react";
import styles from "./ProfileForm.module.css";
import { NavLink } from "react-router-dom";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { userSliceActions } from "../../services/actions/userSlice";
import { useLocation } from "react-router-dom";

const ProfileForm = () => {
  const navigate = useNavigate();
  const dispatchAction = useDispatch();

  const user = useSelector((store) => store.userActions.userInfo);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showHiddenButtons, setshowHiddenButtons] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.user.name);
      setEmail(user.user.email);
      setPassword(user.user.password);
    }
  }, []);



  const onChangeName = (event) => {
    setName(event.target.value);
    setshowHiddenButtons(true);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
    setshowHiddenButtons(true);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
    setshowHiddenButtons(true);
  };

  const cancelChanges = () => {
    setName(user.user.name);
    setEmail(user.user.email);
    setPassword(user.user.password);
    setshowHiddenButtons(false);
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    dispatchAction(userSliceActions.updateUserDataAsync({ name, email, password }));
    navigate("/profile");
  };

  return (
    <form className={`${styles['profile-form']}`} onSubmit={onSubmitForm}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={onChangeName}
        value={name || ""}
        name={"name"}
        error={false}
        icon="EditIcon"
        extraClass="mb-6"
      />
      <EmailInput
        onChange={onChangeEmail}
        value={email || ""}
        name={"email"}
        placeholder="Логин"
        isIcon={true}
        extraClass="mb-6"
      />
      <PasswordInput
        onChange={onChangePassword}
        value={password || ""}
        name={"password"}
        extraClass="mb-6"
        icon="EditIcon"
      />
      {showHiddenButtons && (
        <div className={`${styles['profile-submit-button']}`}>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass="pr-5"
            onClick={cancelChanges}
          >
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>)}
    </form>

  );
}

export default ProfileForm;
