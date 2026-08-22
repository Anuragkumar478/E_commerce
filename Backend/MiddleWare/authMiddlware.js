const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Please login first",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decode.id,
      isAdmin: decode.isAdmin,
    };

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Please login first",
    });
  }
};

module.exports = { protect };