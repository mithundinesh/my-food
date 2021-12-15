import "../App.scss";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteItem } from "../slice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

function Home() {
  const todoList = useSelector((state) => state.list.list);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  return (
    <div className="App">
      <main className="main">
        <Button
          onClick={() => navigate("/create")}
          style={{ margin: 15 }}
          variant="contained"
        >
          Create Task
        </Button>
        <TableContainer className="table" component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Desciption</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todoList.map((row, index) => (
                <TableRow
                  key={row.title}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>
                    {" "}
                    <Button
                      variant="contained"
                      onClick={() => {
                        navigate("/edit/" + (index + 1));
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      style={{ backgroundColor: "red" }}
                      variant="contained"
                      onClick={() => {
                        setDeleteModal(true);
                        setDeleteIndex(index);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
      <Modal
        open={deleteModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div style={{backgroundColor:"white", margin:100,padding:15, borderWidth:2, borderColor:'red', borderStyle:'solid'}}>
          <div>Are you sure, do you want to delete it?</div>
          <div style={{ textAlign: "end" }}>
            <Button
              variant="contained"
              onClick={() => {
                setDeleteModal(false);
                setDeleteIndex(null);
              }}
            >
              Cancel
            </Button>
            <Button
              style={{ backgroundColor: "red" }}
              variant="contained"
              onClick={() => {
                  if(deleteIndex!==null){
                  dispatch(deleteItem(deleteIndex));
                  setDeleteModal(false);
                  setDeleteIndex(null);
                  }
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Home;
