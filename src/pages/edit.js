import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Update from "../components/Item";
import { useParams } from "react-router-dom";

function Edit() {
  const { id } = useParams();
  const todoList = useSelector((state) => state.list.list);
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(
    todoList && todoList.length > 0 && todoList[id - 1]
  );

  console.log({ selectedItem, todoList, id });

  return (
    <div className="App">
      <div className="main">
        <h3>Edit Task</h3>
        {selectedItem && (
          <Update
            item={selectedItem}
            handleDescription={(e) =>
              setSelectedItem({ ...selectedItem, description: e })
            }
            handleTitle={(e) => setSelectedItem({ ...selectedItem, title: e })}
            id={id}
          />
        )}
      </div>
    </div>
  );
}

export default Edit;
