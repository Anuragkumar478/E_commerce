import React from 'react'
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import { searchProducts,addToCart } from "../utils/api";
import productCard from "../Components/ProductCard";
import ProductCard from '../Components/ProductCard';



const SearchProduct = () => {
    const [searchParams] = useSearchParams();
           const query = searchParams.get("query");

    const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
 
useEffect(()=>{
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await searchProducts(query);
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    fetchProducts();
}, [query]);

const handleAddToCart = async (product) => {
    try {
      await addToCart(product._id, 1);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };


if (loading) {
    return <p>Loading...</p>;
}  

  return (
    
       <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Search results for "{query}"
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onAddToCart={handleAddToCart}
          />
            
          // <div
          //   key={product._id}
          //   className="border p-4 rounded shadow"
          // >

          //   {product.image && (
          //     <img
          //       src={product.image}
          //       alt={product.name}
          //       className="h-40 w-full object-cover rounded mb-3"
          //     />
          //   )}

          //   <h2 className="font-bold">
          //     {product.name}
          //   </h2>

          //   <p>
          //     {product.description}
          //   </p>

          //   <p className="font-semibold">
          //     ₹{product.price}
          //   </p>

          // </div>
        ))}

      </div>

    </div>
    
  )
}

export default SearchProduct
