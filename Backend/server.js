const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const http = require('http');

dotenv.config();
// Database connection
require('./config/db');

// Routes
const userRoutes = require('./Router/userRoute');
const productRoutes = require('./Router/ProductRoutes');
const adminRoutes = require('./Router/adminRoutes');
const cartRoutes = require('./Router/cartRoutes');
const orderRoutes = require('./Router/orderRoute');
const paymentRoutes=require('./Router/payment');
const uploadRoutes=require('./Router/upload_api');
// Socket.io
const { initSocket } = require('./socket');

dotenv.config();

const app = express();
const server = http.createServer(app); // Create HTTP server first

// Initialize Socket.io
const io = initSocket(server);
app.set('io', io);

// Middleware
app.use(cors({
  origin:[ "http://localhost:5173",
   "https://e-commerce-h9ke.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());
app.use(cors());

// Static files
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use("/api/cart", cartRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/', (req, res) => {
    console.log('app is running on port 3000');
    res.status(201).json({ message: 'your app is running' });
});

// Listen on the server, not app
server.listen(3000, () => console.log('app is running on port 3000'));