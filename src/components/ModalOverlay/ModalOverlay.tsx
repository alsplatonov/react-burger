import styles from "./ModalOverlay.module.css";
import PropTypes from "prop-types";

interface ModalOverlayProps {
  
  onCloseModal: () => void;
}
const ModalOverlay: React.FC<ModalOverlayProps> = (props) => {

  return (
    <div className={styles['modal-overlay']} onClick={props.onCloseModal} >
    </div>
  )
}



export default ModalOverlay;


