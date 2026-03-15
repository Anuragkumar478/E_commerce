import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { UserProvider } from "./Components/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        
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
        </Routes>

        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
