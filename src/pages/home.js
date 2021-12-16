import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteItem, completed, pending } from "../slice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

function Home() {
  const todoList = useSelector((state) => state.list.list);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [filter, setFilter] = useState(0);

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
        <FormControl style={{ width: 200 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filter}
            label="Status"
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          >
            <MenuItem value={0}>All</MenuItem>
            <MenuItem value={"Pending"}>Pending</MenuItem>
            <MenuItem value={"Completed"}>Completed</MenuItem>
          </Select>
        </FormControl>
        <TableContainer className="table" component={Paper}>
          <Table size="small" aria-label="task table">
            <TableHead>
              <TableRow style={{ backgroundColor: "grey" }}>
                <TableCell style={{ color: "white" }}>Title</TableCell>
                <TableCell style={{ color: "white" }}>Desciption</TableCell>
                <TableCell style={{ color: "white" }}>Status</TableCell>
                <TableCell style={{ color: "white" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todoList && todoList.length > 0 ? (
                todoList
                  .filter((x) => {
                    if (filter) return x.status == filter;
                    else return true;
                  })
                  .map((row, index) => (
                    <TableRow
                      key={row.title}
                      style={{
                        backgroundColor:
                          row.status === "Completed" ? "#7cf37c" : "white",
                      }}
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
                          style={{ margin: 5 }}
                          variant="contained"
                          onClick={() => {
                            navigate("/edit/" + (index + 1));
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          style={{ backgroundColor: "red", margin: 5 }}
                          variant="contained"
                          onClick={() => {
                            setDeleteModal(true);
                            setDeleteIndex(index);
                          }}
                        >
                          Delete
                        </Button>
                        {row.status == "Pending" ? (
                          <Button
                            style={{ backgroundColor: "green", margin: 5 }}
                            variant="contained"
                            onClick={() => {
                              dispatch(completed(index));
                            }}
                          >
                            Completed
                          </Button>
                        ) : (
                          <Button
                            style={{ backgroundColor: "#ff7600", margin: 5 }}
                            variant="contained"
                            onClick={() => {
                              dispatch(pending(index));
                            }}
                          >
                            Move to Pending
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell>No Task available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="analysis">
          <Card style={{ flexBasis: "45%", margin: 5 }}>
            <CardContent>
              <div className="analysis-content">
                <h2>TOTAL TASKS</h2>
                <div className="analysis-number">
                  {todoList && todoList.length > 0 ? todoList.length : 0}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card style={{ flexBasis: "45%", margin: 5 }}>
            <CardContent>
              <div className="analysis-content">
                <h2>PENDING TASKS</h2>
                <div className="analysis-number">
                  {todoList && todoList.length > 0
                    ? todoList.filter((x) => x.status == "Pending").length
                    : 0}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card style={{ flexBasis: "45%", margin: 5 }}>
            <CardContent>
              <div className="analysis-content">
                <h2>COMPLETION PERCENTAGE</h2>
                <div className="analysis-number">
                  {todoList && todoList.length > 0
                    ? (todoList.filter((x) => x.status == "Completed").length /
                        todoList.length) *
                        100 +
                      "%"
                    : "0%"}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Modal open={deleteModal} aria-labelledby="delete-confirmation-popup">
        <div className="delete-modal">
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
                if (deleteIndex !== null) {
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
