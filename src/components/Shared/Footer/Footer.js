import "./Footer.css";
import {
  faLocationDot,
  faMobileScreen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import i1 from "../../../assets/Bkash-logo.png";
import i2 from "../../../assets/nagad.png";
import i3 from "../../../assets/rocket.png";
import i4 from "../../../assets/Dutch_Bangla_Bank.jpg";
import i5 from "../../../assets/visa-icon.png";
import i6 from "../../../assets/master-card.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="text-black card2-bg">
      <div className="d-flex justify-content-around flex-lg-row flex-md-row flex-sm-column flex-column py-5 px-sm-4 px-3 g-4 gap-4">
        <div>
          <h2 className="fs-1 fw-bold" aria-current="page">
          Helper<span className="font-color">Hub</span>
          </h2>
          <br />
          <p className="">HelperHub is a sample e-commerce website</p>
          <p className="">
            <FontAwesomeIcon icon={faLocationDot} /> Dhaka, Bangladesh
          </p>
          <p className="">
            <FontAwesomeIcon icon={faMobileScreen} /> Phone: 01317424004
          </p>
        </div>

        <div>
          <h6 className="fw-bold">PAYMENT</h6>
          <div className="d-flex w-100 gap-2 rounded">
            <img src={i1} className=" logo-sizing rounded " alt="im" />
            <img src={i2} className=" logo-sizing rounded " alt="im" />
            <img src={i3} className=" logo-sizing rounded " alt="im" />
            <img src={i4} className=" logo-sizing rounded " alt="im" />
            <img src={i5} className=" logo-sizing rounded " alt="im" />
            <img src={i6} className=" logo-sizing rounded " alt="im" />
          </div>
        </div>

        <div>
          <h6 className="fw-bold">USER AREA</h6>
          <ul className="list-unstyled">
            <li>My Account</li>
            <li>Cart</li>
            <li><Link className="text-decoration-none text-black" to='/bloghome'>Blog</Link></li>
          </ul>
        </div>

        <div>
          <h6 className="fw-bold">INFORMATION</h6>
          <ul className="list-unstyled">
            <li>Information</li>
            <li>Terms & Conditions</li>
            <li><Link className="text-black text-decoration-none" to='/contact'>Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h6 className="fw-bold">GUIDE AND HELP</h6>
          <ul className="list-unstyled">
            <li>Career</li>
            <li>Order Returns</li>
            <li>FAQs</li>
          </ul>
        </div>
      </div>
      <hr className=""/>
      <p className="text-center fw-bold py-3">
        <i>Copyright © 2024 HelperHub. All Rights Reserved.</i>
      </p>
    </div>
  );
};

export default Footer;
