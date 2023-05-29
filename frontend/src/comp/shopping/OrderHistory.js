import React, { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { HouseExclamationFill } from "react-bootstrap-icons";
import { baseURL } from "../utils/constants";
import axios from "axios";
import $ from "jquery";
<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Unbounded&display=swap');
</style>;

export default function OrderHistory() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const id = localStorage.getItem("customeremail");

  const [customer, setCustomer] = useState([]);
  console.log(customer);

  useEffect(() => {
    axios.get(`${baseURL}/getOrderHistory`).then((res) => {
      const customers = res.data;
      const matchingUser = customers.find((user) => user._id == id);
      console.log(matchingUser.orderhistory.reverse());

      if (matchingUser) {
        setCustomer([matchingUser]);
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
            BURROWS
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
      <div className="container p-3" style={{ border: "1px solid silver" }}>
        <h5>Order History</h5>
        <div>
          {customer.length > 0 &&
            customer
              .filter((item) => item._id === id)
              .map((item) => (
                <div key={item._id}>
                  {item.orderhistory &&
                    item.orderhistory.map((detail, index) => (
                      <div key={index}>
                        <div
                          className="d-flex m-2 p-2"
                          style={{ border: "1px solid grey" }}
                        >
                          <div
                            className="col-4"
                            style={{ borderRight: "1px solid grey" }}
                          >
                            <h4>
                              <u>Shipping Address</u>
                            </h4>
                            <p>
                              <strong>Name:</strong> {detail.first_name}&nbsp;
                              {detail.last_name}
                            </p>
                            <p>
                              <strong>Email:</strong> {detail.customer_email}
                            </p>
                            <p>
                              <strong>Address:</strong>{" "}
                              <div>{detail.street_address},&nbsp;</div>
                              <div>
                                {detail.city},&nbsp;
                                {detail.state},&nbsp;
                                {detail.country},&nbsp;
                                {detail.pincode}
                              </div>
                            </p>
                            <p>
                              <strong>Mobile:</strong> {detail.mobile}
                            </p>
                            <div>
                              <strong>Order Date & Time:</strong>{" "}
                              {detail.order_date}
                            </div>
                          </div>
                          <div className="col-8 px-2">
                            <h4>
                              <u>Product(s)</u>
                            </h4>
                            {detail.orderdetails.map((product, index) => (
                              <div
                                key={index}
                                style={{
                                  border: "1px solid silver",
                                }}
                                className="row py-2 m-2"
                              >
                                <div className="col-8">
                                  <div>
                                    <strong>Product:</strong>{" "}
                                    {product.product_name}
                                  </div>
                                  <div>
                                    <strong>Price:</strong>{" "}
                                    {product.product_price.toLocaleString(
                                      "en-US",
                                      {
                                        style: "currency",
                                        currency: "USD",
                                      }
                                    )}
                                  </div>
                                  <div>
                                    <strong>Quantity:</strong>{" "}
                                    {product.product_quantity}
                                  </div>
                                  <div>
                                    <strong>Subtotal:</strong>{" "}
                                    {(
                                      product.product_quantity *
                                      product.product_price
                                    ).toLocaleString("en-US", {
                                      style: "currency",
                                      currency: "USD",
                                    })}
                                  </div>
                                </div>
                                <div className="col-4">
                                  <img
                                    src={product.product_image}
                                    height="100"
                                    width="100%"
                                    alt="Product"
                                  />
                                </div>
                              </div>
                            ))}
                            <h4>
                              <u>Billing</u>
                            </h4>
                            <p>
                              <strong>Total Amount:</strong>{" "}
                              {detail.total_price.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                              })}
                            </p>
                            <p>
                              <strong>Payment Method:</strong>{" "}
                              {detail.payment_method}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
