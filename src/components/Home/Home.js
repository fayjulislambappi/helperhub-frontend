import React, { useState } from "react";
import TableHeader from "../TableHeader/TableHeader";
import ProductsLists from "../ProductsLists/ProductsLists";
import Footer from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";
import { CartProvider } from "../../hooks";
import SellerProductsShow from "../SellerProductsShow.js/SellerProductsShow";
const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="overflow-hidden">
      <TableHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery}  />
      <ProductsLists searchQuery={searchQuery} />
      <SellerProductsShow />
      <Footer />
    </div>
  );
};

export default Home;
