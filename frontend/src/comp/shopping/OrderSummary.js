import React, { useState, useEffect } from "react";
import "../App.css";
import Payment from "./Payment";
import { baseURL } from "../utils/constants";
import axios from "axios";
import { Link } from "react-router-dom";
import { HouseExclamationFill } from "react-bootstrap-icons";

export default function Ordersummary() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const id = localStorage.getItem("customeremail");
  const [orderTotal, setOrderTotal] = useState("");
  const [matchingData, setMatchingData] = useState("");
  console.log(id);

  useEffect(() => {
    axios.get(`${baseURL}/getOrder/${id}`).then((res) => {
      const data = res.data;
      const matchingData = data.find((item) => item._id === id);
      setMatchingData(matchingData);
      if (matchingData) {
        const orderTotal = matchingData.total_price;
        setOrderTotal(orderTotal);
      }
    });
  }, []);
  return (
    <div>
      <div className="py-4" style={{ borderBottom: "1px solid silver" }}>
        <div className="container d-flex justify-content-between align-items-center">
          <Link
            to="/"
            style={{
              fontFamily: "Unbounded, cursive",
              fontSize: "xx-large",
              textDecoration: "none",
              color: "black",
            }}
          >
            BURROW
          </Link>
          <div>
            <Link to="/" style={{ textDecoration: "none", color: "#000" }}>
              Home &nbsp;
              <HouseExclamationFill />
            </Link>
          </div>
        </div>
      </div>
      <div className="container" style={{ padding: "0 12rem" }}>
        <div className="p-3" style={{ borderBottom: "1px solid silver" }}>
          <b>Order Summary</b>
        </div>
        <div className="items p-3" style={{ borderBottom: "1px solid silver" }}>
          <div>
            <div>
              {matchingData && matchingData.orderdetails.length} Item(s)
            </div>
          </div>
          {matchingData &&
            matchingData.orderdetails.map((item) => {
              const subtotal = item.product_price * item.product_quantity;
              return (
                <div className="row gx-0 py-2" key={item.product}>
                  <div className="col-3">
                    <img
                      src={item.product_image}
                      alt="item1"
                      className="d-block w-100"
                    />
                  </div>
                  <div className="col-9">
                    <div className="px-1 d-flex justify-content-between">
                      <div style={{ fontSize: 20 }}>{item.product_name}</div>
                      <div>
                        {item.product_price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </div>
                    </div>
                    <div className="px-1 d-flex justify-content-between">
                      <div>
                        Quantity:&nbsp;
                        {item.product_quantity}
                      </div>
                      <div>
                        Subtotal:&nbsp;
                        {subtotal.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div
          className="p-3 d-flex justify-content-between"
          style={{ borderBottom: "1px solid silver" }}
        >
          <div>Total (USD)</div>
          <div>
            {orderTotal.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
        </div>
        <div className="p-3">
          <Payment />
        </div>
      </div>
    </div>
  );
}
