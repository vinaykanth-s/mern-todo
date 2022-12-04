const jwt = require("jsonwebtoken");
module.exports = function createAuthResObject({ email, _id }) {
  const token = jwt.sign({ _id }, process.env.JWT_SECRET);
  return {
    token,
    email,
  };
};
