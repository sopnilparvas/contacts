const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json({ msg: "No token! authorization denied." });

  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) throw err;
      req.user = user;
      next();
    });
  } catch (err) {
    res.status(401).json({ msg: "Token not valid! authorization denied." });
  }
};

module.exports = auth;
