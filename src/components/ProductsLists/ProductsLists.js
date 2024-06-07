import React from "react";
import SideNav from "../SideNav/SideNav";
import Products from "../Products/Products";
import HomeCarousel from "../SideNav/HomeCarousel/HomeCarousel";
import BlogPro from "../../pages/BlogPro";

const ProductsLists = ({ searchQuery }) => {


  return (
    <div>
      <div className="d-flex mx-2 mt-5 ">
        <div>
          <SideNav />
        </div>

        <div className="w-100">
          <HomeCarousel className="pb-2" />
          <BlogPro  searchQuery={searchQuery} />
        
        </div>
      </div>
    </div>
  );
};

export default ProductsLists;
