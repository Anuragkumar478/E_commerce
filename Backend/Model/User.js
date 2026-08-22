const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    phone:{type:String },
    email: { type: String, required: true, unique: true },
    password: { type: String},
     authSource: {
    type: String,
    enum: ["local", "google"],
    default: "local"
  },

  googleId: {
    type: String
  },  
    profilePicture: {
    type: String
  },

    isAdmin: { type: Boolean, default: false },
    address: { type: String },
     // Password reset fields
    resetPasswordToken: {
        type: String,
        default: null
    },

    resetPasswordExpire: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model('User', userSchema);
