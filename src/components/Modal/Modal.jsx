import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';


const Modal = (props) => {

  return createPortal(
    <ModalOverlay onCloseModal={props.onCloseModal}>
      <div className={styles.modal}>
        <button className={`${styles['modal__close-btn']}`} onClick={props.onCloseModal}>
          <CloseIcon type="primary" />
        </button>
        {props.children}
      </div>
    </ModalOverlay>,
    document.getElementById("modal")
  )
}


export default Modal;