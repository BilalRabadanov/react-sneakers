import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../components/Card";

export default function Orders() {
  const [orders, setOrders] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://621a221981d4074e85ba3ed4.mockapi.io/orders"
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert("Ошибка");
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
      </div>

      <div className="d-flex flex-wrap justify-around">
        {(isLoading ? [...Array(8)] : orders).map((item, index) => {
          return <Card key={index} loading={isLoading} {...item} />;
        })}
      </div>
    </div>
  );
}
