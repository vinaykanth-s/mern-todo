const { Types } = require("mongoose");
const Todo = require("../models/Todo");

module.exports = async function verifyMyTodo(req, res, next) {
  try {
    // console.log(req.params.id);
    if (!Types.ObjectId.isValid(req.params.id)) {
      throw new Error("Object Id is invalid");
    }
    const todo = await Todo.findById(req.params.id);
    if (todo.userID.toString() !== req.user._id.toString()) {
      throw new Error("Can update only your Todos");
    }
    req.todo = todo;
    next();
  } catch ({ message }) {
    res.status(403).send({ message });
  }
};
