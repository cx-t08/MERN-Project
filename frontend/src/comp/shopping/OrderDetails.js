import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { baseURL } from "../utils/constants";
import { HouseExclamationFill } from "react-bootstrap-icons";
import axios from "axios";
import $ from "jquery";
<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Unbounded&display=swap');
</style>;

export default function OrderDetails() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const id = localStorage.getItem("customeremail");

  const [customer, setCustomer] = useState([]);
  const [order, setOrder] = useState([]);
  const [updateUI, setupdateUI] = useState(false);

  useEffect(() => {
    axios.get(`${baseURL}/get/${id}`).then((res) => {
      console.log(res.data);
      setCustomer(res.data);
    });
  }, [updateUI]);

  useEffect(() => {
    axios.get(`${baseURL}/getOrder/${id}`).then((res) => {
      console.log(res.data);
      setOrder(res.data);
    });
  }, [updateUI]);

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
          {/* {localStorage.getItem("customeremail")} */}
          <div>
            <Link to="/" style={{ textDecoration: "none", color: "#000" }}>
              Home &nbsp;
              <HouseExclamationFill />
            </Link>
          </div>
        </div>
      </div>
      <div
        className="container p-3 mt-2"
        style={{
          border: "1px solid silver",
        }}
      >
        <div className="row">
          <div className="col-4" style={{ borderRight: "1px solid grey" }}>
            <h2>Customer Details</h2>
            {customer &&
              customer
                .filter((item) => item._id === id)
                .map((item) => (
                  <div key={item._id}>
                    <h4>
                      <u>Shipping Address</u>
                    </h4>
                    <p>
                      <strong>Name:</strong> {item.customer_name.first_name}{" "}
                      {item.customer_name.last_name}
                    </p>
                    <p>
                      <strong>Email:</strong> {item._id}
                    </p>
                    <p>
                      <strong>Street Address:</strong>{" "}
                      {item.customer_address.street_address}
                    </p>
                    <p>
                      <strong>City:</strong> {item.customer_address.city}
                    </p>
                    <p>
                      <strong>State:</strong> {item.customer_address.state}
                    </p>
                    <p>
                      <strong>Country:</strong> {item.customer_address.country}
                    </p>
                    <p>
                      <strong>Pincode:</strong> {item.customer_address.pincode}
                    </p>
                    <p>
                      <strong>Mobile:</strong> {item.mobile}
                    </p>
                  </div>
                ))}
          </div>

          <div className="col-8 px-3">
            <h2>Order Details</h2>
            {order &&
              order
                .filter((item) => item.customer === id)
                .map((item) => (
                  <div key={item._id}>
                    <h4>
                      <u>Order Information</u>
                    </h4>
                    {item.orderdetails.map((detail, index) => (
                      <div
                        key={index}
                        style={{
                          border: "1px solid silver",
                        }}
                        className="row py-2 m-2"
                      >
                        <div className="col-8">
                          <div>
                            <strong>Product:</strong> {detail.product_name}
                          </div>
                          <div>
                            <strong>Price:</strong>{" "}
                            {detail.product_price.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })}
                          </div>
                          <div>
                            <strong>Quantity:</strong> {detail.product_quantity}
                          </div>
                          <div>
                            <strong>Subtotal:</strong>{" "}
                            {(
                              detail.product_quantity * detail.product_price
                            ).toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })}
                          </div>
                        </div>
                        <div className="col-4">
                          <img
                            src={detail.product_image}
                            height="100"
                            width="100%"
                          />
                        </div>
                      </div>
                    ))}
                    <div className="d-flex">
                      <div className="col-6">
                        <h4>
                          <u>Billing</u>
                        </h4>
                        <p>
                          <strong>Total Amount:</strong>{" "}
                          {item.total_price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </p>
                        <p>
                          <strong>Payment Method:</strong> {item.payment_method}
                        </p>
                        <h4>
                          <u>Order Timing</u>
                        </h4>
                        <p>
                          <strong>Date & Time:</strong> {item.order_date}
                        </p>
                      </div>
                      <div className="col-6">
                        <div className="text-center">
                          <img
                            src="https://www.lami.co.in/images/order.gif"
                            width="100%"
                            height="100%"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
