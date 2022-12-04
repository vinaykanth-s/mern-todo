const express = require("express");
const verifyMyTodo = require("../middlewares/verifyMyTodo");
const verifyToken = require("../middlewares/verifyToken");
const Todo = require("../models/Todo");
const router = express.Router();

// const todos = [];
router.get("/me", verifyToken, async (req, res) => {
  try {
    const todos = await Todo.find({ userID: req.user._id });
    res.send(todos);
  } catch (err) {}
  console.log(req.user);
  res.send("todo");
});

router.post("/", verifyToken, async (req, res) => {
  try {
    // console.log({ user: req.user });
    const todo = new Todo({ ...req.body, userID: req.user._id });
    // console.log({ todo });
    await todo.save();
    res.status(201).send(todo);
  } catch ({ message }) {
    res.status(400).send({ message });
  }
});

router.put("/:id", verifyToken, verifyMyTodo, async (req, res) => {
  try {
    //get the id  of the todo that you want to delete, then update it
    ["text", "isComplete"].forEach((prop) => (req.todo[prop] = req.body[prop]));
    const updated = await req.todo.save();
    res.send(updated);
  } catch ({ message }) {
    res.status(400).send({ message });
  }
});

router.delete("/me", verifyToken, async (req, res) => {
  //delete all based on a certain _id
  try {
    await Todo.deleteMany({ userID: req.user._id });
    res.send("Delete All Done!");
  } catch ({ message }) {
    res.status(400).send({ message });
  }
});

router.delete("/:id", verifyToken, verifyMyTodo, async (req, res) => {
  try {
    //get the id  of the todo that you want to delete, then delete it
    // console.log("delete id");
    await req.todo.remove();
    res.send("");
  } catch ({ message }) {
    res.status(400).send({ message });
  }
});

module.exports = router;
