const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const http = require('http');

// Database connection
require('./config/db');

// Routes
const userRoutes = require('./Router/userRoute');
const productRoutes = require('./Router/ProductRoutes');
const adminRoutes = require('./Router/adminRoutes');
const cartRoutes = require('./Router/cartRoutes');
const orderRoutes = require('./Router/orderRoute');

// Socket.io
const { initSocket } = require('./socket');

dotenv.config();

const app = express();
const server = http.createServer(app); // Create HTTP server first

// Initialize Socket.io
const io = initSocket(server);
app.set('io', io);

// Middleware
app.use(express.json());
app.use(cors());

// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use("/api/cart", cartRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
    console.log('app is running on port 3000');
    res.status(201).json({ message: 'your app is running' });
});

// Listen on the server, not app
server.listen(3000, () => console.log('app is running on port 3000'));