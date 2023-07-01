import { createPortal } from "react-dom";
import React, { useEffect, ReactNode } from 'react';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';


interface ModalProps {
  children: ReactNode;
  onCloseModal: () => void;
}
const Modal: React.FC<ModalProps> = (props) => {

  useEffect(() => {
    const handleEscClose = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Esc") {
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
    </>, document.getElementById("modal")!
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


export default Modal;