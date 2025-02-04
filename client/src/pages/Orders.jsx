import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import OrderItem from "../components/OrderItem";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const { fetchOrders } = useContext(ShopContext);

  useEffect(() => {
    const handleFetchOrders = async () => {
      try {
        const getAllOrders = await fetchOrders();
        if (getAllOrders && getAllOrders.length) {
          setAllOrders((prev) => [...prev, ...getAllOrders]); // Spread getAllOrders into the previous state
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    handleFetchOrders();
  }, []); // Runs when `fetchOrders` changes

  return (
    <div className="flex flex-col h-full md:min-h-[70vh]">
      <Title text1={"MY"} text2={"ORDERS"} />
      <div className="flex flex-col gap-3 justify-center">
        {allOrders && allOrders.length > 0 ? (
          allOrders.map((order) => (
            <>
              {Array.isArray(order.items) && order.items.length > 0 ? (
                order.items.map((item) => (
                  <OrderItem
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    size={item.size}
                    status={item.status}
                    quantity={item.quantity}
                  />
                ))
              ) : (
                <p>No items found.</p>
              )}
            </>
          ))
        ) : (
          <p>Loading orders...</p> // Show a message when orders are still loading
        )}
      </div>
    </div>
  );
};

export default Orders;
