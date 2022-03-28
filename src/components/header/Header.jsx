import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

export default function Header({ onClickCart }) {
  const { totalPrice } = useCart();

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/" className="d-flex">
        <img width={40} height={40} src="img/logo.png" alt="" />
        <div className="headerInfo">
          <h3 className="text-uppercase">React sneakers</h3>
          <p>Магазин лучших кроссовок</p>
        </div>
      </Link>
      <div>
        <ul className="d-flex">
          <li onClick={onClickCart} className="mr-30 cu-p">
            <img width={18} height={18} src="img/cart.svg" alt="" />
            <span>{totalPrice}₽.</span>
          </li>
          <Link to="favorites">
            <li>
              <img width={18} height={18} src="img/favorites.svg" alt="" />
            </li>
          </Link>
          <Link to="orders">
            <li>
              <img width={18} height={18} src="img/profile.svg" alt="" />
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
