import styles from "./ModalOverlay.module.css";

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


