// console.clear();
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "backend/config.env" });
const getProdDetails = require("./scripts/getProdDetails");
const [PORT] = getProdDetails(5000);
const connectDB = require("./scripts/connectDB");

const todosRoute = require("./routes/todosRoute");
const usersRoute = require("./routes/usersRoute");
app.use(express.json());
app.use("/api/todos", todosRoute);
app.use("/api/users", usersRoute);
app.listen(PORT, () => {
  console.log("server started on port 5000");
  connectDB();
});
