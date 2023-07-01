import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import styles from "./ProfileForm.module.css";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router";
import { userSliceActions } from "../../services/actions/userSlice";
import { useAppDispatch, useAppSelector } from '../../services/redux-hook';
import { getCookie } from "../../utils/cookie";

const ProfileForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((store) => store.userActions.userInfo);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showHiddenButtons, setshowHiddenButtons] = useState(false);

  useEffect(() => {
    dispatch(userSliceActions.getUserDataAsync());
  }, []);
  
  useEffect(() => {
    if (user) {
      if (user.name) {
        setName(user.name);
      }
      setEmail(user.email);
      setPassword(user.password);
    }
  }, [user]);
  



  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setshowHiddenButtons(true);
  };

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setshowHiddenButtons(true);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setshowHiddenButtons(true);
  };

  const cancelChanges = () => {
    if (user) {
      if (user.name) {
        setName(user.name);
        setEmail(user.email);
        setPassword(user.password);
      }

      setshowHiddenButtons(false);
    }
  };

  const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(userSliceActions.updateUserDataAsync({ name, email, password }));
    navigate("/profile");
    setshowHiddenButtons(false);
  };

  return (
    <>
      <form className={`${styles['profile-form']}`} onSubmit={onSubmitForm}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChangeName}
          value={name}
          name={"name"}
          error={false}
          icon="EditIcon"
          extraClass="mb-6"
        />
        <EmailInput
          onChange={onChangeEmail}
          value={email}
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
          </div>
        )}
      </form>
    </>
  );
}

export default ProfileForm;
