import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    isLoading: false,
    todos: [
      {
        text: "First todo",
        isComplete: false,
      },
      {
        text: "Second todo",
        isComplete: true,
      },
    ],
  },
  reducers: {
    clearTodos() {
      //define later
    },
  },
});

export default todosSlice.reducer;
