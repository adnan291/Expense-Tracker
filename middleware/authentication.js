const jwt = require("jsonwebtoken");
const User = require("../models/users");

const dotenv = require("dotenv");

dotenv.config();

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const verifyuser = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(verifyuser._id);
    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ success: false });
  }
};

module.exports = { authenticate };
