import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";


import styles from "./HeaderItem.module.css";

interface HeaderItemProps {
  text: string;
  children?: ReactNode;
}

const HeaderItem: React.FC<HeaderItemProps> = (props) => {
  const getUrlByHeaderProp = () => {
    switch (props.text) {
      case "Конструктор":
        return "/";
      case "Лента заказов":
        return "/feed";
      case "Личный кабинет":
        return "/profile";
      default:
        return "/";
    }
  };

  return (
    <li className={`text text_type_main-default`}>
      <NavLink
        className={(navData) =>
          navData.isActive
            ? `${styles["header-item__item"]} ${styles["header-item__item_active"]}`
            : `${styles["header-item__item"]} `
        }
        to={getUrlByHeaderProp()}
      >
        {props.children}
        <p className={`${styles["header-item__text"]} text_color_active`}>
          {props.text}
        </p>
      </NavLink>
    </li>
  );
};



export default HeaderItem;
