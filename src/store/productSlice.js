const { createSlice } = require("@reduxjs/toolkit"); // Method from Redux Toolkit

// WITH "createSlice" WE CAN DIRECTLY MUTATE THE STATE

// CANNOT CHANGE ANY PROPERTY INSIDE OBJECT FREEZE
export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

// ---> Accepts an object
const productSlice = createSlice({
  name: "product",

  // Pass initial State
  initialState: {
    data: [], // Contains list of products
    status: STATUSES.IDLE, // Has 3 statuses so we need a "STATUSES OBJECT"
  },

  // Create functions inside reducers to change the state
  // "add" and "remove" are reducers basically function with which we mutate our state
  //  and our pure functions
  reducers: {
    setProducts(state, action) {
      // NO ASYNCHRONOUS CALL INSIDE REDUCER AS REDUCERS ARE CALLED SYNCHRONOUSLY
      // const res = await fetch("https://fakestoreapi.com/products");

      state.data = action.payload;
    },
    setStatus(state, action) {
      // NO ASYNCHRONOUS CALL INSIDE REDUCER AS REDUCERS ARE CALLED SYNCHRONOUSLY
      // const res = await fetch("https://fakestoreapi.com/products");

      state.status = action.payload;
    },
  },
});

export const { setProducts, setStatus } = productSlice.actions; // We get actions property in
// "cartSlice method"

export default productSlice.reducer;

// Thunk

// CREATING THUNK MANUALLY
export function fecthProducts() {
  return async function fetchProductThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      dispatch(setProducts(data));
      dispatch(setStatus(STATUSES.IDLE));
    } catch (err) {
      console.log(err);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
