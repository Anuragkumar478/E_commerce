const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const token = req.cookies.token; // Get token from cookies
  //console.log("Token:", token);
  if (!token) return res.status(401).json({ message: 'unauthorized' });

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    // Use isAdmin from token (because you include it in generateToken)
    req.user = { id: decode.id, isAdmin: decode.isAdmin };
    console.log("Decoded user:", req.user);
    next();
  } catch (err) {
    res.status(401).json({ message: 'unauthorized' });
  }
};

module.exports = { protect };
