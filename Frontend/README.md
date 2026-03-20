Frontend
|-node Module
|-public // only single image
|-component-|-Categories
            |-Footer.jsx
            |-Navbar.jsx
            |-NewProduct.jsx
            |-PlaceOrder.jsx
            |-SearchBar.jsx
            |-UserContext.jsx
            |-UserOrder.jsx
|-pages-|-About.jsx
        |-Cart.jsx
        |-Contact.jsx
        |CreateProduct.jsx
        |-Home.jsx
        |-Login.jsx
        |-Products.jsx|
        |-Profile.jsx
        |-Register.jsx
        |-UpdateProduct.jsx
        |-UpdatePorfile.jsx
utils-|-api.js     // for save the all the api there    

 // caching used in my for the heavy load system 
// “I use caching in my e-commerce website mainly for product listings, search results, and read-heavy APIs using Redis. It reduces database load and improves performance. I avoid caching sensitive or frequently changing data like payments and stock. On the frontend, I use React Query for API caching.”