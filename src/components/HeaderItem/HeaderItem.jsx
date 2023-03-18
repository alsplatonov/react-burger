import styles from './HeaderItem.module.css';

const HeaderItem = (props) => {
  return (
    <li className={`pt-4 pb-4 pl-5 pr-5 text text_type_main-default`}
    >
      {props.children}
      <span className={`${styles['HeaderItem__span-text']} ml-2}`}>{props.text}</span>
    </li>
  );

}


export default HeaderItem;
