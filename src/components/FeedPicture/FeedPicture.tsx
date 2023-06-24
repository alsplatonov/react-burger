import React from "react";
import styles from "./FeedPicture.module.css";

export const FeedPicture = ({ ingredient, elemNumber, Counter }) => {
  return (
    <>
      {elemNumber <= 5 && ( //показываем не более 6 элементов
        <li className={`${styles['feed-picture']}`}>
          <img
            src={ingredient.image_mobile}
            className={`${styles['feed-picture__image']}`}
            alt={ingredient.name}
          />
          {Counter && elemNumber === 5 && ( //показываем оставшееся кол-во элементов
            <p className={`text text_type_main-default ${styles['feed-picture__counter']}`}>{`+${Counter}`} </p>
          )}
        </li>
      )}
    </>
  );
};

export default FeedPicture;


