import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import { assets } from "../../assets/admin_assets/assets";
import toast from "react-hot-toast";

const ListOrders = () => {
  const { fetchFullOrderDetails, updateOrderStatus } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  // Function to update order item status
  const handleOrderStatusChange = async (orderId, itemId, status) => {
    try {
      const data = await updateOrderStatus(orderId, itemId, status);
      if (data) {
        toast.success(data, {
          duration: 3000,
          position: "bottom-right",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        duration: 3000,
        position: "bottom-right",
      });
    }
  };

  // Fetch orders when component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      const data = await fetchFullOrderDetails();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xl font-semibold">Order Page</p>

      {orders.length > 0 ? (
        orders.map((order) =>
          order.items.map((item) => (
            <div
              key={item._id} // ✅ Unique key for each item
              className="grid grid-cols-4 border border-gray-400 py-5 text-center text-gray-600 w-full h-38 rounded-lg"
            >
              {/* Order Image */}
              <img
                src={assets.parcel_icon}
                alt={item.name}
                className="w-12 h-12 mx-auto"
              />

              {/* Order Details */}
              <div className="flex flex-col items-start">
                <p className="whitespace-nowrap">
                  {item.name} x {item.quantity} ({item.size})
                </p>
                <p className="font-semibold">
                  {order.firstName} {order.lastName}
                </p>
                <p>{order.street}</p>
                <p>
                  {order.city}, {order.state}, {order.country}, {order.zipcode}
                </p>
              </div>

              {/* Payment Details */}
              <div className="flex flex-col items-start">
                <p>Items: {item.quantity}</p>
                <p>Method: COD</p>
                <p>Payment: Pending</p>
              </div>

              {/* Order Status Dropdown */}
              <select
                value={item.status}
                onChange={(e) =>
                  handleOrderStatusChange(order._id, item._id, e.target.value)
                }
                className="h-10 w-1/2 p-2 cursor-pointer outline-pink-300 rounded-md border-none"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        )
      ) : (
        <p className="text-center text-gray-600">Loading orders...</p>
      )}
    </div>
  );
};

export default ListOrders;
