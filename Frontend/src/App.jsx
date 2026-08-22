import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./Components/ScrollToTop";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile";
import Products from "./pages/Products";
import CreateProduct from "./pages/CreateProduct";
import UpdateProduct from "./pages/UpdateProduct";
import PlaceOrder from "./Components/PlaceOrder";
import UserOrders from "./Components/UserOrders";
import Cart from "./pages/Cart";
import Footer from "./Components/Footer";
import SearchProduct from "./pages/searchProduct";
import ProductDetails from "./pages/ProductDetails";
import { UserProvider } from "./Components/UserContext";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import BottomNavbar from "./Components/BottomNavbar";

function App() {
  return (
    <UserProvider>
         
      <Router>
        <Navbar />
        <Toaster position="top-center" />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/products" element={<Products />} />
          <Route path="/products/create" element={<CreateProduct />} />        
          <Route path="/products/update/:id" element={<UpdateProduct />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/update-profile" element={<UpdateProfile />} />

          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/my-orders" element={<UserOrders />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<SearchProduct />} />

          
          <Route
  path="/products/:id"
  element={<ProductDetails />} />

  <Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

<Route
  path="/reset-password/:token"
  element={<ResetPassword />}
/>

        </Routes>
       <BottomNavbar/>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
