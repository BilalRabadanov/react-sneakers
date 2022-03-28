import Card from "../../components/Card";
import { AppContext } from "../../App";
import { useContext } from "react";

export default function Favorites() {
  const { favorites, onAddToFavorite } = useContext(AppContext);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои закладки</h1>
      </div>

      <div className="d-flex flex-wrap justify-around">
        {favorites.map((item, index) => {
          return (
            <Card
              key={item.name}
              favorited={true}
              onFavorite={onAddToFavorite}
              {...item}
            />
          );
        })}
      </div>
    </div>
  );
}
