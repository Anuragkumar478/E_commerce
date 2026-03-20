const mongoose = require('mongoose');

// Add connection options and handle errors
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connection established'))
.catch((err) => console.error('MongoDB connection error:', err));

const db = mongoose.connection;

db.on('connected', () => console.log('MongoDB connected successfully'));
db.on('error', (err) => console.error('MongoDB connection error:', err));
