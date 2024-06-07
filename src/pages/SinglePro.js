import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  faAward,
  faCalendarDays,
  faLocationDot,
  faMoneyBills,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import DOMPurify from "dompurify";
import axiosInstance from "./axiosInstance";
import "./Pro.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Shared/Footer/Footer";
import CheckOut from "./CheckOut";
import {
  Box,
  CardContent,
  Divider,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import CommentList from "../components/CommentList";
import { toast } from "react-toastify";
import { Button } from "bootstrap";
import Header from "../components/Shared/Header/Header";
import { addCartItemToStorage } from "../helpers/helpers";
import { CartProvider, useCart } from "../hooks";
const socket = io("/", {
  reconnection: true,
});

const SinglePro = () => {
  const { userInfo } = useSelector((state) => state.signIn);
  const {
    cart,
    addCartItem,
    incrementItem,
    decrementItem,
    removeItemFromCart,
  } = useCart();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [comment, setComment] = useState("");
  // const [comments, setComments] = useState([]);
  const [commentsRealTime, setCommentsRealTime] = useState([]);

  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.signIn.isAuthenticated);
  const { id } = useParams();

  // Fetch single product
  const displaySingleProduct = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/product/${id}`
      );
      setProduct(data.product);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    displaySingleProduct();
  }, []);

  useEffect(() => {
    socket.on("new-comment", (newComment) => {
      setCommentsRealTime(newComment);
    });
  }, []);

  // add comment
  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.put(
        `${process.env.REACT_APP_API_URL}/api/comment/product/${id}`,
        { comment }
      );
      if (data.success === true) {
        setComment("");
        toast.success("comment added");

        socket.emit("comment", data.product?.comments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  let uiCommentUpdate =
    commentsRealTime.length > 0 ? commentsRealTime : product?.comments;

  // Calculate total price
  useEffect(() => {
    if (product) {
      const totalPrices = Number(product.price) * quantity;
      setTotalPrice(totalPrices);
    }
  }, [product, quantity]);

  const incrementQuantity = () => {
    // setQuantity(quantity + 1);
    console.log(product);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

 
  const addToCart = () => {
    addCartItem(product);
    // const checkoutUrl = `/checkout/${id}/${totalPrice}`;
    // history(checkoutUrl);
  };

  const handleBuyNow = () => {
    navigate("/checkout");
  };

  return (
    <div className="overflow-hidden">
      <div
        className="bg-white overflow-hidden"
        sx={{
          display: "flex",
          justifyContent: "center",
          pt: 4,
          pb: 4,
          minHeight: "100vh",
        }}
      >
        {loading || !product ? (
          <Loader />
        ) : (
          <>
            <div className="overflow-hidden container my-4 singlepro-bg d-flex bg-white flex-lg-row flex-md-column flex-sm-column flex-column">
              <div>
                <div className="row d-flex ">
                  <div className="col-lg-3 col-md-3 col-sm-12 pt-4">
                    <img
                      src={product.image?.url}
                      className="img-fluid pt-2 border"
                      alt="name"
                    />
                  </div>
                  <div className="col-lg-9 col-md-9 col-sm-12 mt-3 pt-2">
                    <p>
                      <h2>{product.title}</h2>
                      <span className="py-2">
                        <FontAwesomeIcon
                          icon={faStar}
                          className="text-warning "
                        />
                        <FontAwesomeIcon
                          icon={faStar}
                          className="text-warning "
                        />
                        <FontAwesomeIcon
                          icon={faStar}
                          className="text-warning "
                        />
                        <FontAwesomeIcon
                          icon={faStar}
                          className="text-warning "
                        />
                        <FontAwesomeIcon
                          icon={faStar}
                          className="text-warning "
                        />
                      </span>
                    </p>
                    <p className="">
                      {/* <span className="fw-bold ">Brand:</span>{" "} */}
                      <span className="font-color">{product.brand}</span>
                    </p>
                    <p className="pb-5">
                      <span className="fw-bold ">Origin:</span>{" "}
                      {product.content}
                      <p>
                        <hr />
                        <p className="fw-bold font-color fs-2">
                          ${product.price}
                        </p>
                      </p>
                      <span>
                        <del className="text-secondary">$30</del> -30%
                      </span>
                      <br />
                      <p>
                        <span className="fw-bold"> Color Family:</span> Black
                      </p>
                      <br />
                      {cart?.find((itm) => itm._id === product._id) && (
                        <p className="pb-4">
                          Quantity:{" "}
                          <button
                            className="border-0 fs-4 ms-2 bg-secondary px-3 text-white"
                            onClick={() => {
                              if (
                                cart.find((itm) => itm._id === product._id)
                                  ?.quantity === 1
                              ) {
                                removeItemFromCart(product._id);
                              } else {
                                decrementItem(product._id);
                              }
                            }}
                          >
                            -
                          </button>{" "}
                          <span className="fs-4 mx-3">
                            {cart?.find((itm) => itm._id === product._id)
                              ?.quantity || 1}
                          </span>{" "}
                          <button
                            className="border-0 fs-4 bg-secondary px-3 text-white"
                            onClick={() => incrementItem(product._id)}
                          >
                            +
                          </button>
                        </p>
                      )}
                      <div className="pb-4">
                        <span className="fw-bold">Total Price: </span> $
                        {totalPrice.toFixed(2) *
                          (cart.find((itm) => itm._id === product._id)
                            ?.quantity || 1)}
                      </div>
                      {cart?.find((itm) => itm._id === product._id) && (
                        <button
                          onClick={() => handleBuyNow()}
                          className="bg-warning border-0 text-white fw-bold py-2 px-5"
                        >
                          Buy Now
                        </button>
                      )}
                      <button
                        className="mx-3 bg-color border-0 text-white fw-bold py-2 px-5"
                        onClick={() => addToCart()}
                      >
                        Add To Cart
                      </button>
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-5 card2-bg px-5">
                <p className="font-color fw-bold">Delivery</p>
                <hr />
                <p>
                  <FontAwesomeIcon icon={faLocationDot} className="pe-2 " />
                  Kalabagan, Dhaka-1205
                </p>
                <p className="fw-bold">
                  <FontAwesomeIcon icon={faTruck} className="pe-2 " />
                  Free Delivery 20 june - 23 june
                </p>
                <p className="bg-white p-2 fw-bold">
                  Enjoy free shipping promotion with minimum 1 items.
                </p>
                <p>
                  <FontAwesomeIcon icon={faMoneyBills} className="pe-2 " />
                  Cash On Delivery
                </p>
                <hr />
                <span className="font-color fw-bold">Service</span>
                <p className="py-3">
                  <FontAwesomeIcon icon={faCalendarDays} className="pe-2 " />7
                  Days Return
                </p>
                <p>Change of mind applicable</p>
                <p className="pb-5  fw-bold">
                  <FontAwesomeIcon icon={faAward} className="pe-2 " />
                  Warranty Not Available
                </p>
              </div>
            </div>


{/* comment here */}
            <CardContent>
              {userInfo ? (
                <>
                  <Box sx={{ pt: 1, pl: 3, pb: 3, bgColor: "#fafafa" }}>
                    <h2>Add your comment here!</h2>
                    <form onSubmit={addComment}>
                      <TextareaAutosize
                        onChange={(e) => setComment(e.target.value)}
                        value={product.comment}
                        aria-label="minimum height"
                        minRows={3}
                        placeholder="Add a comment..."
                        style={{ width: "80%", padding: "5px" }}
                      />
                      <Box sx={{ pt: 1 }}>
                        <button
                          type="submit"
                          variant="contained"
                          className="mx-3 bg-color border-0 text-white fw-bold py-2 px-5"
                        >
                          Comment
                        </button>
                      </Box>
                    </form>
                  </Box>
                </>
              ) : (
                <>
                  <Link to="/login"> Log In to add a comment</Link>
                </>
              )}

              <Typography variant="body2" color="text.secondary"></Typography>
              <Divider variant="inset" />
              {/* add comment list */}
              {product?.comments.length === 0 ? (
                ""
              ) : (
                <Typography variant="h5" sx={{ pt: 3, mb: 2 }}>
                  Comments:
                </Typography>
              )}

              {uiCommentUpdate.map((comment) => (
                <CommentList
                  key={comment._id}
                  name={comment.postedBy.name}
                  text={comment.text}
                />
              ))}
            </CardContent>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SinglePro;
