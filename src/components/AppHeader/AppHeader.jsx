import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import HeaderItem from './HeaderItem/HeaderItem';

import styles from './AppHeader.module.css';

const AppHeader = () => {
  return (
    <header
      className={
        `${styles['app-header']}
        text text_type_main-default pt-3 pb-3}`
      }
    >
      <nav>
        <ul className={`${styles['app-header__menu-list']} pt-4 pb-4}`}>
      
          <HeaderItem
            // className={styles['app-header__menu-item']}
            // Icon={BurgerIcon}
            isActive={true}
            text="Конструктор"
          >
            <BurgerIcon />
          </HeaderItem>
          <HeaderItem
            // className={styles['app-header__menu-item']}
            // Icon={ListIcon}
            isActive={false}
            text="Лента заказов"
          >
            <ListIcon type="secondary" />
          </HeaderItem>
          <li className={styles['app-header__logo-wrapper']}>
            <Logo />
          </li>
          <HeaderItem
            // className={styles['app-header__menu-item']}
            // Icon={ProfileIcon}
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
