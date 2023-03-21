import styles from "./ModalOverlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = (props) => {

  return (
    <div className={styles['modal-overlay']} onClick={props.onCloseModal} >
      {props.children}
    </div>
  )
}

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  onCloseModal: PropTypes.func.isRequired,
}; 

export default ModalOverlay;


