import { useContext, useState } from "react";

import ContentLoader from "react-content-loader";
import { AppContext } from "../../App";


import styles from "./Card.module.scss";

export default function Card({
  name,
  price,
  imageUrl,
  onFavorite,
  onPlus,
  favorited,
  id,
  loading
}) {
  const { isItemAdded } = useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(favorited);
  const obj = { id, parentId: id, name, price, imageUrl };

  const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={265}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="0" y="230" rx="5" ry="5" width="80" height="25" />
          <rect x="120" y="225" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div onClick={onClickFavorite} className={styles.favorite}>
              <img
                width={32}
                height={32}
                src={
                  isFavorite
                    ? "img/like-active.svg"
                    : "img/like-none-active.svg"
                }
                alt=""
              />
            </div>
          )}
          <img width="100%" height={135} src={imageUrl} alt="" />
          <h5>{name}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price}</b>
            </div>

            {onPlus && (
              <img
                onClick={onClickPlus}
                className={styles.plus}
                width={32}
                height={32}
                src={
                  isItemAdded(id)
                    ? "img/in-basket-active.svg"
                    : "img/in-basket-non-active.svg"
                }
                alt=""
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
