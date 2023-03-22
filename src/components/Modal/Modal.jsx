import { createPortal } from "react-dom";
import { React, useEffect } from 'react';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import PropTypes from "prop-types";


const Modal = (props) => {

  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === "Escape" || evt.key === "Esc") {
        props.onCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscClose); //добавляем слушатель

    return () => {
      document.removeEventListener("keydown", handleEscClose); //и удаляем
    }
  }, [])

  return createPortal(
    <>
      <div className={styles.modal}>
        <button className={`${styles['modal__close-btn']}`} onClick={props.onCloseModal}>
          <CloseIcon type="primary" />
        </button>
        {props.children}
      </div>
      <ModalOverlay onCloseModal={props.onCloseModal} />
    </>, document.getElementById("modal")
  );
}
//*********второй вариант********
//   return createPortal(
//     <ModalOverlay onCloseModal={props.onCloseModal}>
//       <div className={styles.modal}>
//         <button className={`${styles['modal__close-btn']}`} onClick={props.onCloseModal}>
//           <CloseIcon type="primary" />
//         </button>
//         {props.children}
//       </div>
//     </ModalOverlay>,
//     document.getElementById("modal")
//   )
// }

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
export default Modal;