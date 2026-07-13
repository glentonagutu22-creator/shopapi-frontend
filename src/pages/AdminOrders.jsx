import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function AdminOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);


  async function fetchOrders() {
    try {

      const token = localStorage.getItem("token");

      const response = await api.get("/api/orders/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(response.data);

    } catch (error) {
      console.log(error);
    }
  }
  async function updateStatus(orderId, status) {
  try {
    const token = localStorage.getItem("token");

    await api.put(
      `/api/orders/${orderId}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Order status updated successfully");

    fetchOrders();

  } catch (error) {
    console.log(error);
  }
}


  return (
    <div style={{ padding: "30px" }}>

      <h1>Admin Orders</h1>


      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (

        orders.map((order) => (

          <div
            key={order._id}
            style={{
              border: "1px solid gray",
              padding: "15px",
              marginBottom: "15px"
            }}
          >

            <h3>
              Order ID: {order._id}
            </h3>


            <p>
              Customer: {order.user?.name}
            </p>


            <p>
              Email: {order.user?.email}
            </p>


            <p>
              Total: KSh {order.totalAmount}
            </p>

<div>
  <strong>Status:</strong>

  <select
    value={order.status}
    onChange={(e) =>
      updateStatus(order._id, e.target.value)
    }
  >
    <option value="Pending">Pending</option>
    <option value="Paid">Paid</option>
    <option value="Shipped">Shipped</option>
    <option value="Delivered">Delivered</option>
  </select>
</div>

            <h4>Products:</h4>

            {order.items.map((item)=>(
  <p key={item._id}>
    {item.product 
      ? `${item.product.name} x${item.quantity}`
      : "Product no longer available"
    }
  </p>
))}

          </div>

        ))

      )}

    </div>
  );
}


export default AdminOrders;