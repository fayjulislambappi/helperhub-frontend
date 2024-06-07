import "./App.css";
import Home from "./components/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contact from "./components/Contact/Contact";
import NotFound from "./pages/NotFound/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Provider } from "react-redux";
import store from "./redux/store";
import AdminDashboard from "./admin/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import UserRoute from "./components/UserRoute";
import CreatePost from "./admin/CreatePost";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import Layout from "./admin/global/Layout";
import EditPost from "./admin/EditPost";
import UserDashboard from "./user/UserDashboard";
import SinglePost from "./pages/SinglePost";
//main
import BlogHome from "./pages/BlogHome";
import BlogPro from "./pages/BlogPro";
import SinglePro from "./pages/SinglePro";
import CreateProduct from "./admin/CreateProduct";
import EditProduct from "./admin/EditProduct";
import BuyContact from "./components/BuyContact";
import { useState } from "react";
import CreateItem from "./admin/CreateItem";
import EditItem from "./admin/EditItem";
import Products from "./pages/Products";
import CreateGallery from "./admin/CreateGallery";
import EditGallery from "./admin/EditGallery";
import ProductCart from "./components/Products/ProductCart";
import AdminLogin from "./pages/AdminLogin";
import LoginUser from "./pages/LoginSeller";
import CheckOut from "./pages/CheckOut";
import ShowUsers from "./pages/ShowUsers";
import { CartProvider } from "./hooks";
import Header from "./components/Shared/Header/Header";
import CartComponent from "./components/CartComponent";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./AuthContext";
import OrderSingle from "./admin/OrderSingle";
import Seller from "./components/Seller";
import Users from "./admin/Users/Users";
import Bkash from "./pages/Bkash";
//HOC
const AdminDashboardHOC = Layout(AdminDashboard);

const CreatePostHOC = Layout(CreatePost);
const CreateItemHOC = Layout(CreateItem);
const CreateProductHOC = Layout(CreateProduct);
const CreateGalleryHOC = Layout(CreateGallery);
const EditPostHOC = Layout(EditPost);
const EditItemHOC = Layout(EditItem);
const EditProductHOC = Layout(EditProduct);
const EditGalleryHOC = Layout(EditGallery);
const UserDashboardHOC = Layout(UserDashboard);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <>
      <ToastContainer />
      <Provider store={store}>
        <BrowserRouter>
          <AuthProvider>
            <ProSidebarProvider>
              {/* <ScrollButton /> */}
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <CartProvider>
                        <Header />
                      </CartProvider>
                      <Home />
                    </>
                  }
                ></Route>
                <Route
                  path="/home"
                  element={
                    <>
                      <CartProvider>
                        <Header />
                      </CartProvider>
                      <Home />
                    </>
                  }
                ></Route>
                <Route path="/contact" element={<Contact />}></Route>
                <Route path="/seller-login" element={<LoginUser />}></Route>
                <Route path="/seller" element={<Seller />} />
                <Route path="/users" element={<Users />} />
                <Route path="/bkash-payment" element={<Bkash/>} />

              

                <Route path="/admin-login" element={<AdminLogin />}></Route>
                <Route path="/show-users" element={<ShowUsers />}></Route>
                <Route path="/order-single" element={<OrderSingle />}></Route>

                <Route path="/" element={<BlogHome />} />
                <Route path="/bloghome" element={<BlogHome />} />
                <Route path="/buycontact" element={<BuyContact />} />
                <Route path="/product-sample" element={<ProductCart />} />
                <Route
                  path="/checkout"
                  element={
                    <PrivateRoute>
                      <CartProvider>
                        <CheckOut />
                      </CartProvider>
                    </PrivateRoute>
                  }
                />

                
                <Route
                  path="/login"
                  element={
                    <LogIn
                      element={
                        <LogIn setIsAuthenticated={setIsAuthenticated} />
                      }
                    />
                  }
                />
                <Route path="/register" element={<Register />} />

                <Route path="/post/:id" element={<SinglePost />} />

                <Route path="/medicine" element={<Products />} />
                <Route
                  path="/product/:id"
                  element={
                    <CartProvider>
                      <Header />
                      <SinglePro />
                    </CartProvider>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <PrivateRoute>
                      <CartProvider>
                        <Header />
                        <CartComponent />
                      </CartProvider>
                    </PrivateRoute>
                  }
                />


                <Route
                  path="/admin/dashboard"
                  element={
                    <AdminRoute>
                      <AdminDashboardHOC />
                    </AdminRoute>
                  }
                />

                <Route
                  path="/admin/post/create"
                  element={
                    <AdminRoute>
                      <CreatePostHOC />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/item/create"
                  element={
                    <AdminRoute>
                      <CreateItemHOC />
                    </AdminRoute>
                  }
                />

                <Route
                  path="/admin/product/create"
                  element={
                    <AdminRoute>
                      <CreateProductHOC />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/gallery/create"
                  element={
                    <AdminRoute>
                      <CreateGalleryHOC />
                    </AdminRoute>
                  }
                />

                <Route
                  path="/admin/post/edit/:id"
                  element={
                    <AdminRoute>
                      <EditPostHOC />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/item/edit/:id"
                  element={
                    <AdminRoute>
                      <EditItemHOC />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/product/edit/:id"
                  element={
                    <AdminRoute>
                      <EditProductHOC />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/gallery/edit/:id"
                  element={
                    <AdminRoute>
                      <EditGalleryHOC />
                    </AdminRoute>
                  }
                />

                <Route
                  path="/user/dashboard"
                  element={
                    <UserRoute>
                      <UserDashboardHOC />
                    </UserRoute>
                  }
                />
                <Route path="*" element={<NotFound />}></Route>
              </Routes>
            </ProSidebarProvider>
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
