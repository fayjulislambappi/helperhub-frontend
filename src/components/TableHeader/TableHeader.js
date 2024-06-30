import {
  faAngleDown,
  faAngleRight,
  faBars,
  faBed,
  faBullhorn,
  faChargingStation,
  faChildReaching,
  faGifts,
  faPercent,
  faPerson,
  faPersonDress,
  faShop,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import './TableHeader.css';

const TableHeader = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="table-header-container">
      <div className="header-row pt-4 px-5">
        <div className="browse-categories ">
          <li className="nav-item dropdown list-unstyled text-decoration-none bg-color text-white d-flex align-items-center justify-content-center p-2 mx-3 rounded">
            <a
              className="nav-link dropdown-toggle p-2"
              href="#"
              id="dropdownMenu"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FontAwesomeIcon  icon={faBars} />
              <span className="px-sm-1 px-5 fw-bold mx-2 ">Browse Categories</span>
              {/* <FontAwesomeIcon icon={faAngleDown} /> */}
            </a>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu">
              <li>
                <a className="dropdown-item" href="#">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-black">
                      <FontAwesomeIcon
                        icon={faPerson}
                        className="pe-1 fw-bold"
                      />
                      Men
                    </span>
                    <FontAwesomeIcon icon={faAngleRight} />
                  </div>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="custom">
                <a className="dropdown-item" href="#">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-black">
                      <FontAwesomeIcon icon={faPersonDress} />
                      Women
                    </span>
                    <FontAwesomeIcon icon={faAngleRight} />
                  </div>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-black">
                      <FontAwesomeIcon icon={faChildReaching} />
                      Baby & Kids
                    </span>
                    <FontAwesomeIcon icon={faAngleRight} />
                  </div>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-black">
                      <FontAwesomeIcon icon={faChargingStation} />
                      Electronics
                    </span>
                    <FontAwesomeIcon icon={faAngleRight} />
                  </div>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-black">
                      <FontAwesomeIcon icon={faBed} />
                      Home & Living
                    </span>
                    <FontAwesomeIcon icon={faAngleRight} />
                  </div>
                </a>
              </li>
            </ul>
          </li>
        </div>

        <div className="search-products  mx-3">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="additional-info d-none d-lg-flex gap-4">
          <div className="info-item font-color fw-bold">
            <FontAwesomeIcon className="pe-1" icon={faShop} />
            SHOP
          </div>
          <div className="info-item text-black fw-bold">
            <FontAwesomeIcon className="pe-1" icon={faPercent} />
            OFFER & DISCOUNT
          </div>
          {/* <div className="info-item text-black fw-bold">
            <FontAwesomeIcon className="pe-1" icon={faGifts} />
            GIFT CART
          </div> */}
          {/* <div className="info-item text-black">
            <FontAwesomeIcon className="pe-1" icon={faBullhorn} />
            MEGA OFFER
          </div> */}
        </div>

        <div className="hotline d-none d-lg-flex  fw-bold border border-1 align-items-center p-3 text-black">HOTLINE: 01521584662</div>
      </div>
    </div>
  );
};

export default TableHeader;

