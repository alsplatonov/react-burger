import React from 'react';

import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';
import styles from './HeaderItem.module.css';

// type Icon_t = ({ type }: TIconProps) => JSX.Element;

const HeaderItem = (props) => {
  return (
    <li className={`pt-4 pb-4 pl-5 pr-5 text text_type_main-default`}
    // className={(
    //   style['menu-item'],
    //   {
    //     [style['menu-item_active']]: isActive,
    //   },
    //   className,
    //   'p-5 text',
    //   {
    //     text_color_inactive: !isActive,
    //   }
    // )}
    >
      {props.children}
      <span className={`${styles['HeaderItem__span-text']} ml-2}`}>{props.text}</span>

    </li>
  );

}
//   className,
//   Icon,
//   isActive = true,
//   text,
// }: {
//   className?: string;
//   Icon: Icon_t;
//   isActive?: boolean;
//   text: string;
// }) => {



export default HeaderItem;
