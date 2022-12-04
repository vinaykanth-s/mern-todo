const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async function verifyToken(req, res, next) {
  try {
    const auth = req.headers.authorization;
    console.log({ auth });
    const [name, token] = auth.trim().split(" ");
    console.log({ name, token, JWT_SECRET: process.env.JWT_SECRET });
    if (name !== "Bearer") throw new Error("Must be a Bearer token");
    // console.log("before verify");
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("after verify");
    // console.log({ id: _id });
    req.user = await User.findOne({ _id });
    next();
  } catch ({ message }) {
    res.status(403).send({ message });
  }
};
