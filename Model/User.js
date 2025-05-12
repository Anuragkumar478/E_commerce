const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);
//  "_id": "6821e643db77ce24ab55c7bf",
//     "name": "anurag kumar",
//     "email": "kumaranurag9795@gmail.com",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjFlNjQzZGI3N2NlMjRhYjU1YzdiZiIsImlhdCI6MTc0NzA1MjA5OSwiZXhwIjoxNzQ3NjU2ODk5fQ.6PXg5vawxRIWemcXn2e2-nNZXQC5M32hfNNvhMiBe9c"

//  "_id": "6821eb29d26173eda0b27cc5",
//     "name": "anurag",
//     "email": "anurag9795@gmail.com",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjFlYjI5ZDI2MTczZWRhMGIyN2NjNSIsImlhdCI6MTc0NzA1MzM1MywiZXhwIjoxNzQ3NjU4MTUzfQ.HEiTmcFFyz6XIIe1lqJxBjGBq_2210ryVrwKYeA2urg"