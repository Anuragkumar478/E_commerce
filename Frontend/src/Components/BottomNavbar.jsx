import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Grid2X2,
  ShoppingCart,
  User
} from "lucide-react";

const BottomNavbar = ({ cartCount = 0 }) => {

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: Home
    },
    // {
    //   name: "Categories",
    //   path: "/categories",
    //   icon: Grid2X2
    // },
    {
      name: "Cart",
      path: "/cart",
      icon: ShoppingCart
    },
    {
      name: "Account",
      path: "/profile",
      icon: User
    }
  ];

  return (

    <nav className="
      fixed
      bottom-0
      left-0
      right-0
      z-50
      bg-white
      border-t
      border-gray-200
      shadow-lg
      md:hidden
    ">

      <div className="
        max-w-md
        mx-auto
        h-16
        flex
        items-center
        justify-around
      ">

        {navItems.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `relative flex flex-col items-center justify-center
                 text-xs gap-1
                 ${
                   isActive
                     ? "text-yellow-500"
                     : "text-gray-500"
                 }`
              }
            >

              <div className="relative">

                <Icon size={22} />

                {item.name === "Cart" && cartCount > 0 && (

                  <span className="
                    absolute
                    -top-2
                    -right-3
                    bg-yellow-500
                    text-white
                    text-[10px]
                    w-5
                    h-5
                    rounded-full
                    flex
                    items-center
                    justify-center
                  ">
                    {cartCount}
                  </span>

                )}

              </div>

              <span>
                {item.name}
              </span>

            </NavLink>

          );

        })}

      </div>

    </nav>

  );

};

export default BottomNavbar;