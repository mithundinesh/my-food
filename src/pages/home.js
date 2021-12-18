import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Item from "../components/Item";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import CircularProgress from "@mui/material/CircularProgress";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Home() {
  const dispatch = useDispatch();
  const [menuList, setMenuList] = useState();
  const [value, setValue] = useState("0");
  const [restaurantName, setRestaurantName] = useState();
  const [loading, setLoading] = useState(false);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://run.mocky.io/v3/a67edc87-49c7-4822-9cb4-e2ef94cb3099")
      .then(
        (res) => {
          if (res.status == 200) {
            setRestaurantName(res.data[0].restaurant_name);
            setMenuList(res.data[0].table_menu_list);
            if (
              res.data[0].table_menu_list &&
              res.data[0].table_menu_list.length > 0
            ) {
              setValue(res.data[0].table_menu_list[0].menu_category_id);
            }
            setLoading(false);
          }
        },
        (err) => {
          setLoading(false);
          alert("Something went wrong.");
        }
      );
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  if (loading) {
    return (
      <div style={{ marginTop: 50, width: "100vw", textAlign: "center" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {restaurantName ? (
            <h3 style={{ margin: 5 }}>{restaurantName}</h3>
          ) : null}
        </div>
        <div>
          <a style={{ marginRight: 5 }}>My Orders</a>
          <Badge
            badgeContent={cart && cart.cartNumber ? cart.cartNumber : 0}
            sx={{
              "& .MuiBadge-badge": {
                color: "white",
                backgroundColor: "red",
              },
            }}
          >
            <ShoppingCartIcon style={{ color: "black" }} />
          </Badge>
        </div>
      </header>
      <main className="main">
        <TabContext value={value}>
          <div style={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              variant="scrollable"
              onChange={handleChange}
              aria-label="lab API tabs example"
              TabIndicatorProps={{
                sx: {
                  backgroundColor: "red",
                  color: "red",
                },
              }}
            >
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
              return (
                <TabPanel style={{ padding: 0 }} value={e.menu_category_id}>
                  {e.category_dishes &&
                    e.category_dishes.length > 0 &&
                    e.category_dishes.map((d) => {
                      return <Item item={d} />;
                    })}
                </TabPanel>
              );
            })}
        </TabContext>
      </main>
    </div>
  );
}

export default Home;
