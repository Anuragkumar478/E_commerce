const mongoose = require('mongoose');

// Add connection options and handle errors
mongoose.connect('mongodb://127.0.0.1:27017/E-commerce') 

const db = mongoose.connection;

db.on('connected', () => console.log('MongoDB connected successfully'));
db.on('error', (err) => console.error('MongoDB connection error:', err));
