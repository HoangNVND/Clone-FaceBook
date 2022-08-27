const jwt = require("jsonwebtoken");

exports.authUser = async (req, res, next) => {
  try {
    let temp = req.header("Authorization");
    const token = temp ? temp.slice(7, temp.length) : "";
    if (!token) {
      return res.status(401).json({ message: "Auth error" });
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err)
        return res.status(400).json({ message: "Invalid Authentication" });
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
