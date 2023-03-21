import styles from "./ModalOverlay.module.css";

const ModalOverlay = (props) => {

  return (
    <div className={styles['modal-overlay']} onClick={props.onCloseModal}>
      {props.children}
    </div>
  )
}



export default ModalOverlay;