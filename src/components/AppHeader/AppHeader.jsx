import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import HeaderItem from '../HeaderItem/HeaderItem';

import styles from './AppHeader.module.css';

const AppHeader = () => {
  return (
    <header
      className={"text text_type_main-default pt-3 pb-3"}
    >
      <nav>
        <ul className={`${styles['app-header__nav-list']} pt-4 pb-4`}>
          <HeaderItem
            isActive={true}
            text="Конструктор"
          >
            <BurgerIcon />
          </HeaderItem>
          <HeaderItem
            isActive={false}
            text="Лента заказов"
          >
            <ListIcon type="secondary" />
          </HeaderItem>
          <li className={styles['app-header__logo-wrapper']}>
            <Logo />
          </li>
          <HeaderItem
            isActive={false}
            text="Личный кабинет"
          >
            <ProfileIcon type="secondary" />
          </HeaderItem>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
