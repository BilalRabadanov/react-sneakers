import Card from "../../components/Card";

export default function Home({
  searchValue,
  setSearchValue,
  items,
  onChangeSearchInput,
  onAddToCart,
  onAddToFavorite,
  isLoading
}) {
  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => {
      return (
        <Card
          key={index}
          onFavorite={(obj) => onAddToFavorite(obj)}
          onPlus={(obj) => onAddToCart(obj)}
          loading={isLoading}
          {...item}
        />
      );
    });
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}
        </h1>
        <div className="search-block d-flex align-center">
          <img src="img/search.svg" alt="Search" />
          <input
            value={searchValue}
            onChange={onChangeSearchInput}
            placeholder="Поиск"
            type="text"
          />
          {searchValue && (
            <img
              onClick={(e) => setSearchValue("")}
              className="clear"
              src="img/cross.svg"
              alt=""
            />
          )}
        </div>
      </div>

      <div className="d-flex flex-wrap justify-around">{renderItems()}</div>
    </div>
  );
}
