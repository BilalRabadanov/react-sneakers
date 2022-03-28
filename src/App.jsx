import axios from "axios";

import { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Drawer from "./components/drawer/Drawer";
import Header from "./components/header/Header";

import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Orders from "./pages/Orders/Orders";

import "./styles.scss";

export const AppContext = createContext({});

export default function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [
          itemsResponce,
          cartItemsResponce,
          favoritesResponce
        ] = await Promise.all([
          axios.get("https://621a221981d4074e85ba3ed4.mockapi.io/items"),
          axios.get("https://621a221981d4074e85ba3ed4.mockapi.io/cart"),
          axios.get("https://621a221981d4074e85ba3ed4.mockapi.io/favorites")
        ]);

        setIsLoading(false);

        setCartItems(cartItemsResponce.data);
        setFavorites(favoritesResponce.data);
        setItems(itemsResponce.data);
      } catch (error) {
        alert("Ошибка");
      }
    }
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      );
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        axios.delete(
          `https://621a221981d4074e85ba3ed4.mockapi.io/cart/${findItem.id}`
        );
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://621a221981d4074e85ba3ed4.mockapi.io/cart",
          obj
        );
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id
              };
            }
            return item;
          })
        );
      }
    } catch (error) {
      alert("Ошибка");
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(
          `https://621a221981d4074e85ba3ed4.mockapi.io/favorites/${obj.id}`
        );
      } else {
        const { data } = await axios.post(
          "https://621a221981d4074e85ba3ed4.mockapi.io/favorites",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в фавориты");
    }
  };

  const onRemoveCart = (id) => {
    try {
      axios.delete(`https://621a221981d4074e85ba3ed4.mockapi.io/cart/${id}`);
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
    } catch (error) {
      alert("ошибк(");
      console.log(error);
    }
  };

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        onAddToCart,
        setCartOpened,
        setCartItems
      }}
    >
      <div className="wrapper clear">
        <Drawer
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveCart}
          setCartItems={setCartItems}
          items={cartItems}
          opened={cartOpened}
        />

        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route exact path="favorites" element={<Favorites />} />
          <Route
            exact
            path="/"
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToCart={onAddToCart}
                onAddToFavorite={onAddToFavorite}
                isLoading={isLoading}
              />
            }
          />
          <Route path="orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}
