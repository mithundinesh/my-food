import "../App.scss";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Update from "../components/update";

function Create() {
  const dispatch = useDispatch();

  const [editModal, setEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    title: "",
    description: "",
    status: "Pending",
  });

  return (
    <div className="App">
      <div style={{ backgroundColor: "white", margin: 50, padding: 15 }}>
        <h3>Add Task</h3>
        <Update item={selectedItem} handleDescription={(e)=>setSelectedItem({...selectedItem,description:e})} handleTitle={(e)=>setSelectedItem({...selectedItem,title:e})} id={0} />
      </div>
    </div>
  );
}

export default Create;
