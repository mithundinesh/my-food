import { createSlice } from "@reduxjs/toolkit";
let cart = {};
try {
  if (window !== "undefined") {
    cart = JSON.parse(localStorage.getItem("cart", null));
  }
} catch (e) {}
export const cartSlice = createSlice({
  name: "list",
  initialState: cart ?? {
    cartNumber: 0,
    cartList: {},
  },
  reducers: {
    increment: (state, action) => {
      let item = state.cartList[action.payload.id] ?? {
        ...action.payload,
        number: 0,
      };
      item.number = item.number + 1;
      state.cartNumber = state.cartNumber + 1;
      let newState = {
        ...state,
        cartList: { ...state.cartList, [action.payload.id]: item },
      };
      state.cartNumber = newState.cartNumber;
      state.cartList = { ...newState.cartList };
      if (window !== "undefined")
        localStorage.setItem("cart", JSON.stringify(newState));
    },
    decrement: (state, action) => {
      state.cartList[action.payload.id].number =
        state.cartList[action.payload.id].number - 1;
      if (state.cartList[action.payload.id] == 0) {
        delete state.cartList[action.payload.id];
      }
      state.cartNumber = state.cartNumber - 1;

      if (window !== "undefined")
        localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { increment, decrement } = cartSlice.actions;

export default cartSlice.reducer;
