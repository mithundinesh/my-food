import "../App.scss";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { update, add } from "../slice";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

function Update({ item, handleTitle, handleDescription, id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const save = () => {
    try {
      let newItem = { ...item };
      if (id == 0) dispatch(add(newItem));
      else dispatch(update({ id: id - 1, item: newItem }));
      navigate("/");
    } catch (e) {}
  };

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <TextField
          label="Title"
          variant="outlined"
          value={item.title}
          onChange={(e) => handleTitle(e.target.value)}
        />
        <TextField
          style={{ marginTop: 10 }}
          multiline
          row={4}
          label="Desciption"
          variant="outlined"
          value={item.description}
          onChange={(e) => handleDescription(e.target.value)}
        />
      </div>
      <div style={{ textAlign: "end" }}>
        <Button
          style={{ margin: 15 }}
          variant="contained"
          onClick={() => save()}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default Update;
