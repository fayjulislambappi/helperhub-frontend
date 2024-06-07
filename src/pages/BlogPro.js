import React, { useEffect, useState } from "react";
import { Box, Button, Container, Grid } from "@mui/material";
import moment from "moment";
import Loader from "../components/Loader";
import { io } from "socket.io-client";
import ProductCard from "../components/ProductCard";
import NavbarProducts from "../components/NavbarProducts";
import "./Pro.css";
import axiosInstance from "./axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import SinglePro from "./SinglePro";
const socket = io("/", {
  reconnection: true,
});

const BlogPro = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postAddLike, setPostAddLike] = useState([]);
  const [postRemoveLike, setPostRemoveLike] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12;

  const showProducts = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(
        // `${process.env.REACT_APP_API_URL}/api/products/show`
        `${process.env.REACT_APP_API_URL}/api/products/paginated?page=${page}&limit=${itemsPerPage}`
      );
      setProducts(data.products);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    showProducts();
  }, []);

  useEffect(() => {
    socket.on("add-like", (newPosts) => {
      setPostAddLike(newPosts);
      setPostRemoveLike("");
    });
    socket.on("remove-like", (newPosts) => {
      setPostRemoveLike(newPosts);
      setPostAddLike("");
    });
  }, []);

  let uiPosts =
    postAddLike.length > 0
      ? postAddLike
      : postRemoveLike.length > 0
      ? postRemoveLike
      : products;
  // products.slice(0, visibleProducts);

  // Filter products based on search query
  if (searchQuery) {
    uiPosts = uiPosts.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  useEffect(() => {
    showProducts(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <>
      <Box sx={{ bgColor: "#fafafa", minHeight: "100vh" }}>
        <div className="text-center mt-3"></div>
        {/* <Container> */}
        <Box sx={{ flexGrow: 1 }}>
          <Grid container className="me-1" spacing={1}>
            {loading ? (
              <Loader />
            ) : (
              uiPosts.map((product, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={2}>
                  <ProductCard
                    image={product.image ? product.image.url : ""}
                    id={product._id}
                    title={product.title}
                    content={product.content}
                    price={product.price}
                    brand={product.brand}
                    subheader={moment(product.createdAt).format(
                      "MMMM DD, YYYY"
                    )}
                    comments={product.comments.length}
                    likes={product.likes.length}
                    likesId={product.likes}
                    showProducts={showProducts}
                  />
                </Grid>
              ))
            )}
          </Grid>

          
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Button
              variant="outlined"
              disabled={currentPage === 1}
              onClick={handlePrevPage}
              sx={{ mr: 1 }}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              disabled={currentPage === totalPages}
              onClick={handleNextPage}
            >
              Next
            </Button>
          </Box>

          {/* pagination end */}
        </Box>
        {/* </Container> */}
      </Box>
    </>
  );
};
export default BlogPro;

