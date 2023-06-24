import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium mt-30">404 - Страница не найдена</h1>
      <p className="text text_type_main-medium mt-10 mb-10">Извините, запрашиваемая страница не существует.</p>
      <Link to="/" className={styles.link}> 
        Вернуться на главную страницу
      </Link>
    </div>
  );
};

export default NotFound;
