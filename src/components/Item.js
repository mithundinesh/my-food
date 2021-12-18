import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../slice";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

function Item({ item, handleTitle, handleDescription, id }) {
  const cart = useSelector((state) => state.cart.cartList);
  const dispatch = useDispatch();

  return (
    <div>
      {item && (
        <Card style={{ marginBottom: 5 }}>
          <CardContent style={{ paddingBottom: 0, padding: 10 }}>
            <div className="card-content">
              <div style={{ flexBasis: "3%" }}>
                <FiberManualRecordIcon
                  style={{
                    width: 15,
                    height: "auto",
                    borderWidth: 1,
                    borderStyle: "solid",
                    color: item.dish_Type == 1 ? "#820000" : "green",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexBasis: "87%",
                }}
              >
                <div style={{ fontWeight: "bold" }}>{item.dish_name}</div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    fontWeight: "bold",
                  }}
                >
                  <div>
                    {item.dish_currency} {item.dish_price}
                  </div>
                  <div>{item.dish_calories} Calories</div>
                </div>
                <div style={{ fontSize: 12 }}>{item.dish_description}</div>
                {item.dish_Availability ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: "green",
                      color: "white",
                      fontWeight: "bold",
                      borderRadius: 15,
                      padding: 5,
                      width: 100,
                      paddingInline: 15,
                    }}
                  >
                    <div>
                      <button
                        className="update-btn"
                        disabled={
                          !cart ||
                          !cart[item.dish_id] ||
                          cart[item.dish_id].number == 0
                        }
                        onClick={() =>
                          dispatch(
                            decrement({
                              id: item.dish_id,
                              name: item.dish_name,
                              price: item.dish_price,
                            })
                          )
                        }
                      >
                        -
                      </button>
                    </div>
                    <div>
                      {cart && cart[item.dish_id]
                        ? cart[item.dish_id].number
                        : 0}
                    </div>
                    <div>
                      <button
                        className="update-btn"
                        onClick={() =>
                          dispatch(
                            increment({
                              id: item.dish_id,
                              name: item.dish_name,
                              price: item.dish_price,
                            })
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ color: "red", fontSize: 12 }}>
                    Not available
                  </div>
                )}
                {item.addonCat && item.addonCat.length > 0 && (
                  <div style={{ color: "red", fontSize: 12, marginTop: 5 }}>
                    customization available
                  </div>
                )}
              </div>
              <div style={{ flexBasis: "10%", marginLeft: 10 }}>
                <img
                  src={item.dish_image}
                  style={{ width: 100, height: 100 }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default Item;
