import { createSlice } from "@reduxjs/toolkit";
let list = [];
try {
  if (window !== "undefined") {
    list = JSON.parse(localStorage.getItem("list", null));
  }
} catch (e) {}
export const listSlice = createSlice({
  name: "list",
  initialState: {
    list: list ?? [],
  },
  reducers: {
    add: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      let newStateList = state.list;
      newStateList.push(action.payload);
      state.list = newStateList;
      if (window !== "undefined")
        localStorage.setItem("list", JSON.stringify(newStateList));
    },
    update: (state,action) => {
      let newStateList = state.list;
      newStateList[action.payload.id]=action.payload.item;
      state.list = newStateList;
      if (window !== "undefined")
        localStorage.setItem("list", JSON.stringify(newStateList));
    },
    deleteItem: (state, action) => {
      let newStateList = state.list;
      newStateList.splice(action.payload,1);
      state.list = newStateList;
      if (window !== "undefined")
        localStorage.setItem("list", JSON.stringify(newStateList));
    },
  },
});

// Action creators are generated for each case reducer function
export const { add, update, deleteItem } = listSlice.actions;

export default listSlice.reducer;
