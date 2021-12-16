import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Update from "../components/update";

function Create() {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState({
    title: "",
    description: "",
    status: "Pending",
  });

  return (
    <div className="App">
      <div className="main">
        <h3>Add Task</h3>
        <Update item={selectedItem} handleDescription={(e)=>setSelectedItem({...selectedItem,description:e})} handleTitle={(e)=>setSelectedItem({...selectedItem,title:e})} id={0} />
      </div>
    </div>
  );
}

export default Create;
