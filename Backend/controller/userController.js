const User = require('../Model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 🔐 Generate JWT Token
const generateToken = (user) => {
  return jwt.sign({ id:user._id,isAdmin:user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// 📝 Register User
exports.registUser = async (req, res) => {
  const { name,phone, email, password,isAdmin } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name,phone, email, password: hashedPassword,isAdmin:isAdmin||false });

    const token = generateToken(user);
    res.cookie('token', token, {
      httpOnly: true,
      secure:true,
      sameSite:"Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
     
    res.status(201).json({
      _id: user._id,
      name: user.name,
      phone:user.phone,
      email: user.email,
       isAdmin: user.isAdmin
     
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔐 Login User
exports.loginUser = async (req, res) => {

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
   
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
   
       const token = generateToken(user);
       res.cookie('token', token, {
      httpOnly: true,
      secure:true,
      sameSite:"lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
       }); 

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
        isAdmin: user.isAdmin
      
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// 👤 Get Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✏️ Update Profile
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = req.body.name || user.name;
    if (req.body.address) user.address = req.body.address;
    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      phone:updatedUser.phone,
      address: updatedUser.address,
      token: generateToken(updatedUser),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.logoutUser = async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  res.json({ message: "Logged out successfully" });
}
