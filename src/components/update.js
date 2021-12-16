import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { update, add } from "../slice";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

let schema = yup.object().shape({
  title: yup.string().required().max(50),
  description: yup.string().required().max(200),
});

function Update({ item, handleTitle, handleDescription, id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const save = async () => {
    let ok = false;
    try {
      const res = await schema.validate(item, { abortEarly: false });
      ok = true;
    } catch (err) {
      ok = false;
      const validationErrors = err.inner.reduce((r, e) => {
        r[e.path] = r[e.path] || e.message;
        return r;
      }, {});
      setErrors(validationErrors);
    }
    if (ok) {
      try {
        let newItem = { ...item };
        if (id == 0) dispatch(add(newItem));
        else dispatch(update({ id: id - 1, item: newItem }));
        navigate("/");
      } catch (e) {}
    }
  };

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <TextField
          error={errors.title ? true : false}
          helperText={errors.title ?? ""}
          label="Title"
          variant="outlined"
          value={item.title}
          onChange={(e) => handleTitle(e.target.value)}
        />
        <TextField
          error={errors.description ? true : false}
          helperText={errors.description ?? ""}
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
