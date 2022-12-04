const mongoose = require("mongoose");
//mongoose.connect("mongodb://localhost:27017/test");

module.exports = async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("DB connected");
  } catch (err) {
    console.log(err);
    process.exit();
  }
};
