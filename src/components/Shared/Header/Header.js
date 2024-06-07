// import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
// import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   Box,
//   IconButton,
//   Menu,
//   MenuItem,
//   Tooltip,
//   Typography,
// } from "@mui/material";

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { userLogoutAction } from "../../../redux/actions/userAction";
// import { useCart } from "../../../hooks";
// import { useAuth } from "../../../AuthContext";

// const Header = ({ totalServices, name, searchQuery, setSearchQuery  }) => {
//   // const { user, handleSignOut } = useAuth()
//   const history = useNavigate();

//   const { isAuthenticated, logout } = useAuth();

//   const { cart } = useCart();
//   const linkHandler = (link) => history(link);

//   const [isCompanyOpen, setCompanyOpen] = useState(false);
//   const [isProductsOpen, setProductsOpen] = useState(false);
//   const [isPartnersOpen, setPartnersOpen] = useState(false);

//   const openCompanyDropdown = () => {
//     setCompanyOpen(true);
//   };

//   const closeCompanyDropdown = () => {
//     setCompanyOpen(false);
//   };

//   const openProductsDropdown = () => {
//     setProductsOpen(true);
//   };

//   const closeProductsDropdown = () => {
//     setProductsOpen(false);
//   };

//   const openPartnersDropdown = () => {
//     setPartnersOpen(true);
//   };

//   const closePartnersDropdown = () => {
//     setPartnersOpen(false);
//   };

//   // for new login header
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { userInfo } = useSelector((state) => state.signIn);

//   const [anchorElNav, setAnchorElNav] = useState(null);
//   const [anchorElUser, setAnchorElUser] = useState(null);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   const logOutUser = () => {
//     logout(() => {
//       dispatch(userLogoutAction());
//     });
//   };

//   console.log({ isAuthenticated });
//   return (
//     <>
//       <nav className="navbar navbar-expand-lg bg-body-tertiary">
//         <div
//           className="collapse navbar-collapse d-flex flex-lg-row flex-md-row flex-sm-column flex-column justify-content-around"
//           id="navbarSupportedContent"
//         >
//           <div className="d-flex justify-content-around ">
//             <div>
//               <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                 <li className="nav-item">
//                   <Link className="text-decoration-none" to="/">
//                     <h2 className="fs-1 fw-bold text-black" aria-current="page">
//                       Helper<span className="font-color">Hub</span>
//                     </h2>
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//           </div>

//           <div className="d-flex">
//             <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex ">
//               {/* Become a Seller */}
//               {/* <li className="nav-item">
//                 <Link className="text-decoration-none" to="/user/dashboard">
//                   <p className=" fw-bold text-black" aria-current="page">
//                     User Dashboard
//                   </p>
//                 </Link>
//               </li> */}

//               <li className="nav-item">
//                 <Link className="text-decoration-none" to="/seller-login">
//                   <p className=" fw-bold text-black" aria-current="page">
//                     Become a Seller
//                   </p>
//                 </Link>
//               </li>

//               {/* login */}
//               <li className="nav-item">
//                 <a className="nav-link active" aria-current="page" href="#">
//                   <Box sx={{ flexGrow: 0 }}>
//                     <Tooltip title="Open settings">
//                       <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                         {/* <Avatar alt="Remy Sharp" src="" /> */}
//                         <FontAwesomeIcon
//                           className="fs-5 font-color"
//                           icon={faUser}
//                         />
//                       </IconButton>
//                     </Tooltip>
//                     <Menu
//                       PaperProps={{
//                         sx: {
//                           "& 	.MuiMenu-list": {
//                             bgColor: "primary.white",
//                             color: "white",
//                           },
//                         },
//                       }}
//                       sx={{ mt: "45px" }}
//                       id="menu-appbar"
//                       anchorEl={anchorElUser}
//                       anchorOrigin={{
//                         vertical: "top",
//                         horizontal: "right",
//                       }}
//                       keepMounted
//                       transformOrigin={{
//                         vertical: "top",
//                         horizontal: "right",
//                       }}
//                       open={Boolean(anchorElUser)}
//                       onClose={handleCloseUserMenu}
//                     >
//                       <MenuItem onClick={handleCloseUserMenu}>
//                         <Typography textAlign="center">
//                           <Link
//                             className="text-black"
//                             style={{ textDecoration: "none" }}
//                             to="/admin/dashboard"
//                           >
//                             Admin{" "}
//                           </Link>
//                         </Typography>
//                       </MenuItem>
//                       <MenuItem onClick={handleCloseUserMenu}>
//                         <Typography textAlign="center">
//                           <Link
//                             className="text-black"
//                             style={{ textDecoration: "none" }}
//                             to="/register"
//                           >
//                             Register{" "}
//                           </Link>
//                         </Typography>
//                       </MenuItem>
//                       {isAuthenticated ? (
//                         <MenuItem onClick={logOutUser}>
//                           <Typography textAlign="center" color="#8e67b2">
//                             Log Out{" "}
//                           </Typography>
//                         </MenuItem>
//                       ) : (
//                         <MenuItem onClick={handleCloseUserMenu}>
//                           <Typography textAlign="center">
//                             <Link
//                               className="text-black"
//                               style={{ textDecoration: "none" }}
//                               to="/login"
//                             >
//                               User Login{" "}
//                             </Link>
//                           </Typography>
//                         </MenuItem>
//                       )}
//                     </Menu>
//                   </Box>
//                 </a>
//               </li>

//               <li className="nav-item">
//                 <a className="nav-link" href="#">
//                   <FontAwesomeIcon className="fs-5 font-color" icon={faHeart} />
//                 </a>
//               </li>

//               <li className="nav-item">
//                 <Link className="nav-link" to="/cart">
//                   <FontAwesomeIcon
//                     className="fs-5 font-color"
//                     icon={faCartShopping}
//                   />
//                   <span className="ps-1 fw-bold ">{cart?.length}</span>
//                 </Link>
//               </li>

//               <li className="nav-item">
//                 <div className="nav-link" href="#">
//                   {name && (
//                     <Typography
//                       variant="body1"
//                       textAlign="center"
//                       color="text.primary"
//                     >
//                       Hello {name}
//                     </Typography>
//                   )}
//                 </div>
//               </li>

//               {isAuthenticated && (
//                 <li className="nav-item">
//                   <Link className="text-decoration-none" to="/user/dashboard">
//                     <p className=" fw-bold text-black" aria-current="page">
//                       User Dashboard
//                     </p>
//                   </Link>
//                 </li>
//               )}

//             </ul>
//             <div>
//               {isAuthenticated ? (
//                 <MenuItem onClick={logOutUser}>
//                   <Typography textAlign="center" color="#8e67b2">
//                     Log Out{" "}
//                   </Typography>
//                 </MenuItem>
//               ) : (
//                 <MenuItem onClick={handleCloseUserMenu}>
//                   <Typography textAlign="center">
//                     <Link
//                       className="text-black bg-danger text-white p-2"
//                       style={{ textDecoration: "none" }}
//                       to="/admin-login"
//                     >
//                       Admin
//                     </Link>
//                   </Typography>
//                 </MenuItem>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Header;

import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../../hooks";
import { useAuth } from "../../../AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { userLogoutAction } from "../../../redux/actions/userAction";

const Header = ({ totalServices, name, searchQuery, setSearchQuery }) => {
  const history = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { cart } = useCart();
  const dispatch = useDispatch();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logOutUser = () => {
    logout(() => {
      dispatch(userLogoutAction());
    });
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-5">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <h2 className="fs-1 fw-bold text-black">
            Helper<span className="font-color">Hub</span>
          </h2>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item fw-bold">
              <Link className="nav-link" to="/seller-login">
                Become a Seller
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0">
            {/* <li className="nav-item fw-bold mx-3">
              <Link className="nav-link" to="/user/dashboard">
                User Dashboard
              </Link>
            </li> */}

            {isAuthenticated && (
              <li className="nav-item me-5">
                <Link className="text-decoration-none" to="/user/dashboard">
                  <p className=" fw-bold text-black" aria-current="page">
                    User Dashboard
                  </p>
                </Link>
              </li>
            )}

            

            {/* <li className="nav-item">
              <a className="nav-link" href="#">
                <FontAwesomeIcon className="fs-5 font-color" icon={faHeart} />
              </a>
            </li> */}

            <li className="nav-item me-3">
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <FontAwesomeIcon className="fs-5 font-color" icon={faUser} />
                </IconButton>
              </Tooltip>
              <Menu
                PaperProps={{
                  sx: {
                    "& .MuiMenu-list": {
                      bgColor: "primary.white",
                      color: "white",
                    },
                  },
                }}
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Link
                      className="text-black"
                      style={{ textDecoration: "none" }}
                      to="/admin/dashboard"
                    >
                      Admin
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Link
                      className="text-black"
                      style={{ textDecoration: "none" }}
                      to="/register"
                    >
                      Register
                    </Link>
                  </Typography>
                </MenuItem>
                {isAuthenticated ? (
                  <MenuItem onClick={logOutUser}>
                    <Typography textAlign="center" color="#8e67b2">
                      Log Out
                    </Typography>
                  </MenuItem>
                ) : (
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link
                        className="text-black"
                        style={{ textDecoration: "none" }}
                        to="/login"
                      >
                        User Login
                      </Link>
                    </Typography>
                  </MenuItem>
                )}
              </Menu>
            </li>

            <li className="nav-item me-3">
              <Link className="nav-link" to="/cart">
                <FontAwesomeIcon
                  className="fs-5 font-color"
                  icon={faCartShopping}
                />
                <span className="ps-1 fw-bold ">{cart?.length}</span>
              </Link>
            </li>

            <li className="nav-item">
              {/* <Link className="nav-link" to="/admin-login">
                Admin
              </Link> */}
              <div>
                {isAuthenticated ? (
                  <MenuItem onClick={logOutUser}>
                    <Typography textAlign="center" color="#8e67b2">
                      Log Out{" "}
                    </Typography>
                  </MenuItem>
                ) : (
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link
                        className="text-black bg-color text-white px-3 py-2"
                        style={{ textDecoration: "none" }}
                        to="/admin-login"
                      >
                        Admin
                      </Link>
                    </Typography>
                  </MenuItem>
                )}
              </div>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/admin-login">
                Admin
              </Link>
            </li> */}
            {/* <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <FontAwesomeIcon
                  className="fs-5 font-color"
                  icon={faCartShopping}
                />
                <span className="ps-1 fw-bold ">{cart?.length}</span>
              </Link>
            </li>
            <li className="nav-item">
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <FontAwesomeIcon className="fs-5 font-color" icon={faUser} />
                </IconButton>
              </Tooltip>
              <Menu
                PaperProps={{
                  sx: {
                    "& .MuiMenu-list": {
                      bgColor: "primary.white",
                      color: "white",
                    },
                  },
                }}
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Link className="text-black" style={{ textDecoration: "none" }} to="/admin/dashboard">
                      Admin
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Link className="text-black" style={{ textDecoration: "none" }} to="/register">
                      Register
                    </Link>
                  </Typography>
                </MenuItem>
                {isAuthenticated ? (
                  <MenuItem onClick={logOutUser}>
                    <Typography textAlign="center" color="#8e67b2">
                      Log Out
                    </Typography>
                  </MenuItem>
                ) : (
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link className="text-black" style={{ textDecoration: "none" }} to="/login">
                        User Login
                      </Link>
                    </Typography>
                  </MenuItem>
                )}
              </Menu>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <FontAwesomeIcon className="fs-5 font-color" icon={faHeart} />
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
