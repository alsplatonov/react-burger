import styles from './HeaderItem.module.css';
import PropTypes from "prop-types";

const HeaderItem = (props) => {
  return (
    <li className={`text text_type_main-default`}
    >
      <a href="#" className={`${styles['header-item__item']} `} >
        {props.children}
        <p className={`${styles['header-item__text']} ${!props.isActive ? 'text_color_inactive' : ''}`}>{props.text}</p>
      </a>
    </li >
  );

}

HeaderItem.propTypes = {
  isActive: PropTypes.bool,
  text: PropTypes.string,
}

export default HeaderItem;
