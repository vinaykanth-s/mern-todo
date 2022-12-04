const { model, Schema, SchemaTypes } = require("mongoose");

const Todo = model(
  "Todo",
  new Schema({
    userID: {
      type: SchemaTypes.ObjectId,
      required: [true, "ObjectId is required!"],
    },
    text: {
      type: String,
      required: [true, "Text is required!"],
    },
    isComplete: {
      type: Boolean,
      required: [true, "IsComplete is required"],
    },
  })
);

module.exports = Todo;
