import styles from "./ModalOverlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = (props) => {

  return (
    <div className={styles['modal-overlay']} onClick={props.onCloseModal} >
    </div>
  )
}

ModalOverlay.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
};

export default ModalOverlay;


