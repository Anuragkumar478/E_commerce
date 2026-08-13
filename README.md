# 🛒 Full-Stack E-Commerce Website

A full-stack e-commerce web application built using the **MERN stack**, featuring user authentication, admin product management, backend-powered product search, shopping cart, Cash on Delivery, online payment integration, and email notifications.

## 🚀 Features

### 👤 User Authentication

* User registration and login
* Secure authentication
* User logout
* Protected routes
* User session/authentication handling

### 🛠️ Admin Panel

* Separate admin section
* Add new products
* Delete products
* Manage products from the admin panel
* Admin-only access to product management

### 🔎 Product Search

* Backend-based product search
* Search products by relevant product information
* Search requests are processed through the backend API
* Search results are dynamically displayed on the frontend

### 🛒 Shopping Cart

* Add products to cart
* Remove products from cart
* Manage products before checkout
* Calculate order details before placing an order

### 💳 Payment System

* Integrated online payment gateway
* Customers can make online payments during checkout
* Payment status is handled through the backend

### 📦 Cash on Delivery

* Customers can choose Cash on Delivery
* Order is created after checkout
* Order information is stored in the database

### 📧 Email Notification

* Email notification is sent when a customer places an order
* Admin receives order-related email notifications
* Helps the admin know when a new order has been placed

## 🧑‍💻 Technology Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT / Authentication
* REST APIs

### Other Technologies

* Payment Gateway
* Email Service
* Cloudinary
* Git & GitHub

## 🔄 Application Flow

```text
User
 │
 ├── Register / Login
 │
 ├── Browse Products
 │
 ├── Search Products
 │       │
 │       └── Backend Search API
 │
 ├── Add Product to Cart
 │
 ├── Checkout
 │       │
 │       ├── Cash on Delivery
 │       │
 │       └── Online Payment
 │
 ├── Order Created
 │
 └── Email Notification
          │
          └── Admin
```

## 🔐 Admin Flow

```text
Admin Login
     │
     ▼
Admin Panel
     │
     ├── Add Product
     │
     ├── Delete Product
     │
     └── Manage Products
```

## 📁 Project Structure

```text
E-Commerce/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── services/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
└── README.md
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd <project-folder>
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the backend:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

PAYMENT_KEY_ID=your_payment_key
PAYMENT_KEY_SECRET=your_payment_secret

EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_password

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

### 5. Run the backend

```bash
npm run dev
```

### 6. Run the frontend

```bash
npm run dev
```

## 🎯 Future Improvements

The current application provides the core e-commerce functionality. The following features can make it more production-ready:

* [ ] Product update/edit from admin panel
* [ ] Product stock/inventory management
* [ ] Order management for admin
* [ ] Order status tracking
* [ ] User order history
* [ ] Product reviews and ratings
* [ ] Wishlist
* [ ] Product pagination
* [ ] Advanced filtering and sorting
* [ ] Product categories management
* [ ] Coupon/discount system
* [ ] Automatic order confirmation email to customer
* [ ] Payment verification/webhook handling
* [ ] Invoice generation
* [ ] User profile and address management
* [ ] Password reset / forgot password
* [ ] Image upload validation
* [ ] Input validation and error handling
* [ ] Rate limiting and security improvements
* [ ] Redis caching
* [ ] Docker containerization
* [ ] CI/CD pipeline
* [ ] Automated testing
* [ ] Production monitoring and logging

## 📌 Future Production Architecture

```text
                    ┌──────────────┐
                    │    React     │
                    │   Frontend   │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │   Express    │
                    │   REST API   │
                    └──────┬───────┘
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
        ┌─────────┐   ┌──────────┐   ┌──────────┐
        │ MongoDB │   │  Redis   │   │ Payment  │
        │         │   │  Cache   │   │ Gateway  │
        └─────────┘   └──────────┘   └──────────┘
                           │
                           ▼
                     Email Service
```

## 📈 Project Goal

The goal of this project is to build a practical, scalable e-commerce platform while implementing real-world concepts such as authentication, REST APIs, database management, payment processing, backend search, order processing, email notifications, and admin management.

What I would add next

For your project, I wouldn't add random features just to make the README longer. The most valuable next additions are:

1. Admin order management — highest priority

See all orders
See customer/order details
Change status: Pending → Confirmed → Shipped → Delivered
Cancel order

2. Inventory management

Product stock quantity
Decrease stock after successful order
Prevent buying when stock = 0

3. Customer order history

My Orders
Order details
Current order status

4. Payment verification
Since you already have a payment gateway, make sure the backend verifies the payment, rather than trusting only the frontend success response.

5. Email to customer
Currently you mentioned notifying the admin. Add:

Order confirmation to customer
Payment confirmation
Shipping/delivery update

6. Security

Request validation
Password hashing
Admin authorization middleware
Rate limiting
Secure cookies
Proper payment webhook/verification

7. Deployment
Since you want this to be a strong backend project, deploy:

Frontend
Backend
MongoDB
Payment gateway
Email service

Then later add Docker + Redis. That will make the project considerably stronger for a backend/software-engineering resume.