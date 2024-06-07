import React from "react";
import { useCart } from "../hooks";
import { Link } from "react-router-dom";
import Footer from "./Shared/Footer/Footer";

const CartComponent = () => {
  const {
    cart,
    addCartItem,
    incrementItem,
    decrementItem,
    removeItemFromCart,
  } = useCart();
  //   console.log({ cart });
  let totalSum = 0;
  cart.forEach((itm) => {
    totalSum += Number(itm.price) * itm.quantity;
    // totalSum += Number(itm.feature1) * itm.quantity;
  });
  return (
    <>
    <div className="p-5 mb-5">
      {cart?.map((itm) => (
        <div
          className="border border-1 p-3 my-2 d-flex flex-lg-row flex-md-row flex-sm-column flex-column justify-content-between"
          key={itm._id}
        >
          <h6>
            {itm.title} - {Number(itm.price)}
            {/* {itm.title} - {Number(itm.feature1)} */}
          </h6>
          <div>
            <span>Total: {Number(itm.price) * itm.quantity}</span>
            {/* <span>Total: {Number(itm.feature1) * itm.quantity}</span> */}
            <button
              className="mx-2 px-3 bg-primary text-white border-0 py-1 rounded fw-bold fs-5"
              onClick={() => decrementItem(itm._id)}
            >
              -
            </button>
            <span className="mx-2 px-3 fw-bold fs-5">{itm.quantity}</span>
            <button
              className="mx-2 px-3 bg-primary text-white border-0 py-1 rounded fw-bold fs-5"
              onClick={() => incrementItem(itm._id)}
            >
              +
            </button>
            <button
              className="mx-2 px-3 bg-danger text-white border-0 py-1 rounded"
              onClick={() => removeItemFromCart(itm._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <h4 className="text-end m-3">Subtotal : {totalSum} BDT</h4>
      <div className="text-end m-3">
      <Link to={"/checkout"}>
        <button className="bg-color text-white border-0 rounded px-3 py-2">Proceed to checkout</button>
      </Link>
        </div>
    </div>
    <Footer />
    </>
  );
};

export default CartComponent;
