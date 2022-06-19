const { createSlice } = require("@reduxjs/toolkit"); // Method from Redux Toolkit

const initialState = [];

// WITH "createSlice" WE CAN DIRECTLY MUTATE THE STATE

// ---> Accepts an object
const cartSlice = createSlice({
  name: "cart",

  // Pass initial State
  initialState,

  // Create functions inside reducers to change the state
  // "add" and "remove" are reducers basically function with which we mutate our state
  //  and our pure functions
  reducers: {
    add(state, action) {
      state.push(action.payload);
    },

    remove(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { add, remove } = cartSlice.actions; // We get actions property in
// "cartSlice method"

export default cartSlice.reducer;
