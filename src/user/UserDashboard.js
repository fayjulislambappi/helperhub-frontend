import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userProfileAction } from "../redux/actions/userAction";
import axiosInstance from "../pages/axiosInstance";
import { CartProvider } from "../hooks";
import Header from "../components/Shared/Header/Header";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.userProfile);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (user && user._id) {
          const response = await axiosInstance.get(
            `/api/orders/user/${user._id}`
          );
          setOrders(response.data.orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  useEffect(() => {
    dispatch(userProfileAction());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <CartProvider>
        <Header />
      </CartProvider>
      <Box className="ms-5 mt-2">
        <div className="d-flex flex-lg-row flex-md-row flex-sm-column flex-column gap-5">
          <div className="bg-secondary text-white p-5">
            <h1 className="fw-bold">Dashboard</h1>
            <p>
              <span className="fw-bold">Complete name:</span>{" "}
              {user && user.name}
            </p>
            <p>
              <span className="fw-bold">E-mail:</span> {user && user.email}
            </p>
            <p>
              <span className="fw-bold">Role:</span> {user && user.role}
            </p>
          </div>

          <div>
            <h2 className="mt-4">{user && user.name}'s Orders</h2>

            <table className="order-table border border-2 border-black">
              <thead>
                <tr className="border border-2 border-black text-center ">
                  <th className="border-end">Order ID</th>
                  <th className="border-end">Order Date</th>
                  <th className="border-end">Product ID</th>
                  <th className="border-end px-2">Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody className="border border-2 border-black">
                {orders.map((order) => (
                  <React.Fragment key={order._id}>
                    <tr className="border border-2 border-black">
                      <td
                        className="border border-black border-2 px-3 text-center"
                        rowSpan={order.orderItems.length}
                      >
                        {order._id}
                      </td>
                      <td
                        className="border border-black border-2 px-3 text-center"
                        rowSpan={order.orderItems.length}
                      >
                        {new Date(order.orderDate).toLocaleDateString()}
                      </td>
                      <td className="border border-black border-1 px-3 text-center">
                        {order.orderItems[0].productId}
                      </td>
                      <td className="border border-black border-2 border-black px-3 text-center">
                        {order.orderItems[0].quantity}
                      </td>
                      <td className="border border-black border-2  px-3 text-center">
                        ${order.orderItems[0].price}
                      </td>
                    </tr>
                    {order.orderItems.slice(1).map((item, index) => (
                      <tr key={index}>
                        <td className="border border-2 border-black px-3 text-center">
                          {item.productId}
                        </td>
                        <td className="border border-2 border-black px-3 text-center">
                          {item.quantity}
                        </td>
                        <td className="border border-2 border-black   px-3 border-start text-center">
                          ${item.price}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Box>
    </>
  );
};

export default UserDashboard;
