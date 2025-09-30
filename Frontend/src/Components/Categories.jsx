import React from 'react'
import { useEffect, useState } from 'react'
import API from '../utils/api'




const Categories = () => {
    const [categories, setCategories] = useState([]);
 useEffect(() => {
    const fetchCategories = async () => {
      try { 
        const response = await API.get('/products/category');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);
  return (
    <div>
       {categories.map((cat, index) => (
        <button
          key={index}
          className="px-4 py-2 rounded-lg bg-black dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {cat}
        </button>
      ))}
    </div>
  )
}

export default Categories
