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
    completed: (state, action) => {
      let newStateList = state.list;
      newStateList[action.payload].status="Completed";
      state.list = newStateList;
      if (window !== "undefined")
        localStorage.setItem("list", JSON.stringify(newStateList));
    },
    pending: (state, action) => {
      let newStateList = state.list;
      newStateList[action.payload].status="Pending";
      state.list = newStateList;
      if (window !== "undefined")
        localStorage.setItem("list", JSON.stringify(newStateList));
    },
  },
});

export const { add, update, deleteItem,completed,pending } = listSlice.actions;

export default listSlice.reducer;
