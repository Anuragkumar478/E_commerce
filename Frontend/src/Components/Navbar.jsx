import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCart } from "../utils/cartApi";
import SearchProductBar from "./productSearch";
import { useUser } from "./UserContext";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    async function fetchCart() {
      try {
        const data = await getCart();
        setCartCount(data.items?.length || 0);
      } catch {
        setCartCount(0);
      }
    }

    if (user) {
      fetchCart();
    } else {
      setCartCount(0);
    }
  }, [user]);

  useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 40);
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);


  return (
    <nav
      className="
        fixed
        top-0
        left-0
        w-full
        z-50
        bg-[#FAF7F1]
        backdrop-blur-lg
        shadow-md
        text-black
      "
    >

      {/* ================= MOBILE NAVBAR ================= */}

     {/* ================= MOBILE NAVBAR ================= */}

<div className="md:hidden">

  {/* Shop Name */}
  <div
    className={`
      overflow-hidden
      transition-all
      duration-300
      ${
        isScrolled
          ? "max-h-0 opacity-0 py-0"
          : "max-h-20 opacity-100 py-3"
      }
    `}
  >
    <div className="px-4 flex items-center justify-center">

      <Link
        to="/"
        className="
          text-xl
          font-extrabold
          text-black
          tracking-wide
        "
      >
        📚 Book Shop
      </Link>

    </div>
  </div>


  {/* Mobile Search */}
  <div
    className={`
      px-4
      transition-all
      duration-300
      ${
        isScrolled
          ? "pb-3 pt-2"
          : "pb-3"
      }
    `}
  >
    <SearchProductBar />
  </div>

</div>


      {/* ================= DESKTOP NAVBAR ================= */}

      <div
        className="
          hidden
          md:flex
          max-w-7xl
          mx-auto
          px-4
          md:px-6
          py-3
          items-center
          justify-between
          gap-4
        "
      >

        {/* Logo + Home */}

        <div className="
          flex
          items-center
          gap-4
          shrink-0
        ">

          <Link
            to="/"
            className="
              text-xl
              md:text-2xl
              font-extrabold
              text-black
              hover:text-blue-900
              transition
            "
          >
            📚 Book Shop
          </Link>


          {/* <Link
            to="/"
            className="
              text-lg
              md:text-2xl
              font-extrabold
              text-black
              hover:text-blue-900
              transition
            "
          >
            Home
          </Link> */}

        </div>


        {/* Desktop Search */}

        <div className="
          flex-1
          max-w-md
        ">

          <SearchProductBar />

        </div>


        {/* Desktop Menu */}

        <div className="
          flex
          items-center
          space-x-4
          lg:space-x-6
          shrink-0
        ">

          {!user ? (

            <>

              <Link
                to="/register"
                className="
                  px-4
                  py-1
                  rounded-full
                  bg-blue-600
                  text-white
                  hover:bg-blue-700
                  whitespace-nowrap
                "
              >
                Register
              </Link>


              <Link
                to="/login"
                className="
                  px-4
                  py-1
                  rounded-full
                  bg-gray-800
                  text-white
                  hover:bg-black
                  whitespace-nowrap
                "
              >
                Login
              </Link>

            </>

          ) : (

            <>

              <Link
                to="/cart"
                className="
                  px-4
                  py-1
                  rounded-full
                  bg-black
                  text-white
                  hover:bg-gray-700
                  whitespace-nowrap
                "
              >
                🛒 Cart
                {cartCount > 0
                  ? ` (${cartCount})`
                  : ""}
              </Link>


              <Link
                to="/profile"
                className="shrink-0"
              >

                <div
                  className="
                    h-9
                    w-9
                    rounded-full
                    bg-gray-200
                    flex
                    items-center
                    justify-center
                    border-2
                    border-pink-300
                  "
                >
                  👤
                </div>

              </Link>

            </>

          )}

        </div>

      </div>

    </nav>
  );
};

export default Navbar;