import React, { useState, useEffect } from "react";
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
import axios from "axios";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Item from "../components/Item";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Home() {
  const todoList = useSelector((state) => state.list.list);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [restaurantName, setRestaurantName] = useState();
  const [restaurantImg, setRestaurantImg] = useState();
  const [menuList, setMenuList] = useState();

  useEffect(() => {
    axios
      .get("https://run.mocky.io/v3/a67edc87-49c7-4822-9cb4-e2ef94cb3099")
      .then((res) => {
        if (res.status == 200) {
          console.log({res})
          setRestaurantName(res.data[0].restaurant_name);
          setRestaurantImg(res.data[0].restaurant_image);
          setMenuList(res.data[0].table_menu_list);
        }
      });
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
console.log({value})
  return (
    <div className="App">
      <header className="App-header">
        {restaurantName ? (
          <h3 style={{ margin: 5 }}>{restaurantName}</h3>
        ) : null}
      </header>
      <main className="main">
        <TabContext value={value}>
          <div style={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList variant="scrollable" onChange={handleChange} aria-label="lab API tabs example">
              {menuList &&
                menuList.length > 0 &&
                menuList.map((e) => {
                  return (
                    <Tab
                      value={e.menu_category_id}
                      label={e.menu_category}
                      {...a11yProps(0)}
                    />
                  );
                })}
            </TabList>
          </div>
          {menuList &&
            menuList.length > 0 &&
            menuList.map((e) => {
              return <TabPanel style={{padding:0}} value={e.menu_category_id}>{e.category_dishes && e.category_dishes.length>0 && e.category_dishes.map(d=>{
                return(<Item item={d}/>)})}</TabPanel>;
            })}
        </TabContext>
      </main>
      <Modal open={false} aria-labelledby="delete-confirmation-popup">
        <div className="delete-modal"></div>
      </Modal>
    </div>
  );
}

export default Home;
