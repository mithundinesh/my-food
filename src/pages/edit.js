import "../App.scss";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, add } from "../slice";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Update from "../components/update";
import {useParams} from "react-router-dom";

function Edit() {
    const {id}=useParams();
    const todoList = useSelector((state) => state.list.list);
  const dispatch = useDispatch();

  const [editModal, setEditModal] = useState(false);
//   let selectedItem = todoList && todoList.length>0 && todoList[id-1];
  const [selectedItem, setSelectedItem] = useState(todoList && todoList.length>0 && todoList[id-1]);

  console.log({selectedItem, todoList,id});

  return (
    <div className="App">
      <div style={{ backgroundColor: "white", margin: 50, padding: 15 }}>
        <h3>Edit Task</h3>
        {selectedItem && <Update item={selectedItem} handleDescription={(e)=>setSelectedItem({...selectedItem,description:e})} handleTitle={(e)=>setSelectedItem({...selectedItem,title:e})} id={id} />}
      </div>
    </div>
  );
}

export default Edit;
