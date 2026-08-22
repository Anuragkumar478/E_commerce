import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { getProducts, addToCart } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Components/UserContext";
import CategorySection from "../Components/CategorySection";
import ProductCard from "../Components/ProductCard";
import Slideshow from "../Components/Slideshow";
import FooterPromoSlider from "../Components/FooterPromoSlider";



const Home = () => {

  const { user } = useUser();
const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get category from URL
  const selectedCategory =
    searchParams.get("category") || "All";


  // =========================
  // GET PRODUCTS
  // =========================

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const data = await getProducts();

        setProducts(data);

      } catch (err) {

        console.error(err);

        setError("Failed to load products");

      } finally {

        setLoading(false);

      }

    };

    fetchProducts();

  }, []);


  // =========================
  // CATEGORY CLICK
  // =========================

  const handleCategoryClick = (category) => {

    if (category === "All") {

      setSearchParams({});

    } else {

      setSearchParams({
        category: category,
      });

    }

  };


  // =========================
  // FILTER PRODUCTS
  // =========================

  const filterProduct =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category === selectedCategory
        );


  // =========================
  // ADD TO CART
  // =========================

  const handleAddToCart = async (product) => {
  if (!user) {
    toast.error("Please login first to add books to your cart");

    setTimeout(() => {
      navigate("/login");
    }, 500);

    return;
  }

  try {
    await addToCart(product._id, 1);

    toast.success("Book added to cart!");
  } catch (error) {
    console.error(error);

    if (error.response?.status === 401) {
      toast.error("Your session has expired. Please login again.");

      setTimeout(() => {
        navigate("/login");
      }, 1000);

      return;
    }

    toast.error(
      error.response?.data?.message ||
      "Failed to add book to cart"
    );
  }
};


  return (

    <div className="bg-gray-100 min-h-screen pt-16">

      {/* ================= CATEGORIES ================= */}

      <CategorySection
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryClick}
      />


      {/* ================= HERO ================= */}
{/* /*
      <div className="mt-2">
        <Slideshow />
      </div>
 */}

      {/* ================= PRODUCTS ================= */}

      <section className="
        max-w-7xl
        mx-auto
        px-3
        sm:px-6
        lg:px-8
        xl:px-10
        py-6
        lg:py-10
      ">

        <div className="
          flex
          items-center
          justify-between
          mb-5
          lg:mb-8
        ">

          <h3 className="
            text-xl
            sm:text-2xl
            lg:text-3xl
            font-bold
            text-gray-800
          ">

            {selectedCategory === "All"
              ? "All Products"
              : selectedCategory}

          </h3>


          <span className="
            text-xs
            sm:text-sm
            text-gray-500
          ">

            {filterProduct.length} items

          </span>

        </div>


        {loading ? (

          <p>Loading...</p>

        ) : error ? (

          <p className="text-red-600">
            {error}
          </p>

        ) : filterProduct.length === 0 ? (

          <div className="
            bg-white
            rounded-xl
            p-8
            text-center
          ">

            <p className="text-gray-500">
              No products found in this category.
            </p>

          </div>

        ) : (

          <div className="
            grid
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-3
            sm:gap-5
            lg:gap-6
            xl:gap-7
          ">

            {filterProduct.map((product) => (

              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={handleAddToCart}
              />

            ))}

          </div>

        )}

      </section>


      <FooterPromoSlider />

    </div>

  );

};

export default Home;