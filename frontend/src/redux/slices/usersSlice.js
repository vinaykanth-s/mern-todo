import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    isLoading: false,
    user: null,
  },
  reducers: {
    logout() {
      //define later
    },
  },
});

export default usersSlice.reducer;
