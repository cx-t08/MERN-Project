import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, CashCoin } from "react-bootstrap-icons";
import "../App.css";
import $ from "jquery";
import { baseURL } from "../utils/constants";
import axios from "axios";

export default function Payment() {
  const [payment, setPayment] = useState("");
  const [upiId, setUpiId] = useState("");
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const id = localStorage.getItem("customeremail");

  const [customer, setCustomer] = useState([]);
  const [order, setOrder] = useState([]);
  const [updateUI, setupdateUI] = useState(false);

  useEffect(() => {
    axios.get(`${baseURL}/get`).then((res) => {
      const customers = res.data;
      const matchingUser = customers.find((user) => user._id === id);
      if (matchingUser) {
        setCustomer([matchingUser]);
        console.log(matchingUser);
      }
    });
  }, [updateUI]);

  useEffect(() => {
    axios.get(`${baseURL}/getOrder/${id}`).then((res) => {
      const order = res.data;
      const matchingOrder = order.find((user) => user._id === id);
      setOrder(matchingOrder);
      console.log(matchingOrder);
    });
  }, [updateUI]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const final = [];
    $(".error").remove();

    const isUPISelected =
      $('input[name="payment-option"]:checked').val() === "upi";
    if (isUPISelected) {
      const upi = $("#upi").val();
      if (upi.length < 1) {
        $("#upi").after('<div class="error">This field is required</div>');
      }
    }

    if ($('input[name="payment-option"]:checked').val()) {
      final.push("1");
    } else {
      $("#order-error").before(
        '<span class="error text-center" style="color:red">Choose the Payment option</span>'
      );
    }

    if (
      final.length === 1 &&
      (!isUPISelected || ($("#upi").val() && $("#upi").val().length >= 1))
    ) {
      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getFullYear()}`;
      const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
      const dateTimeString = `${formattedDate} ${formattedTime}`;

      axios
        .put(`${baseURL}/updateOrder/${id}`, {
          task: {
            payment_method: payment,
            order_date: dateTimeString,
          },
        })
        .then((res) => {
          axios
            .delete(`${baseURL}/deleteAllCart/${id}`)
            .then((response) => {
              console.log("All Products in Cart Deleted:", response.data);
            })
            .catch((error) => {
              console.error("Error deleting cart products:", error.message);
            });

          window.alert("Order Placed Successfully!");
          navigate("/orderdetials");

          const orderHistory = {
            first_name: customer[0].customer_name.first_name,
            last_name: customer[0].customer_name.last_name,
            customer_email: customer[0].customer_login.customer_email,
            street_address: customer[0].customer_address.street_address,
            city: customer[0].customer_address.city,
            state: customer[0].customer_address.state,
            country: customer[0].customer_address.country,
            pincode: customer[0].customer_address.pincode,
            mobile: customer[0].mobile,
            orderdetails: order.orderdetails.map((product) => ({
              product_id: product.product_id,
              product_name: product.product_name,
              product_price: product.product_price,
              product_quantity: product.product_quantity,
              product_image: product.product_image,
            })),
            total_price: order.total_price,
            payment_method: payment,
            order_date: dateTimeString,
          };

          axios
            .put(`${baseURL}/updateOrderHistory/${id}`, {
              order: orderHistory,
            })
            .then((res) => {
              console.log(res);
            })
            .catch((error) => {
              console.log(error.message);
            });

          const productsToDelete = order.orderdetails.map((product) => ({
            product_id: product.product_id,
            quantity: product.product_quantity,
          }));

          // axios
          //   .post(`${baseURL}/deleteMultipleProducts`, productsToDelete)
          //   .then((res) => {
          //     // Handle the response if needed
          //     console.log("Products deleted/updated successfully");
          //   })
          //   .catch((error) => {
          //     // Handle the error if needed
          //     console.log("Error deleting/updating products:", error.message);
          //   });

          const productIds = order.orderdetails.map(
            (product) => product.product_id
          );
          const deleteProduct = productIds.join(",");
          console.log(productIds, "------");
          axios
            .delete(`${baseURL}/deleteMultipleProducts/${deleteProduct}`)
            .then((res) => {
              // Handle the response if needed
            });
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const buttonText = payment === "UPI" ? "PROCEED TO PAYMENT" : "PLACE ORDER";

  return (
    <form onSubmit={handleSubmit} className="gap-3 d-flex flex-column">
      <div className="d-flex">
        <div className="col-6">
          <div className="gap-3 d-flex flex-column">
            <b>Payment</b>
            <label className="d-flex gap-3">
              <input
                type="radio"
                name="payment-option"
                value="UPI"
                checked={payment === "UPI"}
                onChange={(e) => setPayment(e.target.value)}
              />
              UPI <Phone />
            </label>
            {payment === "UPI" && (
              <input
                type="text"
                name="upi"
                id="upi"
                placeholder="Enter UPI ID"
                style={{
                  border: "1px solid #d1d0d0",
                  color: "#383633",
                  padding: "0.5rem 1rem",
                }}
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            )}
            <label className="d-flex gap-3">
              <input
                type="radio"
                name="payment-option"
                value="COD"
                checked={payment === "COD"}
                onChange={(e) => setPayment(e.target.value)}
              />
              Cash on Delivery <CashCoin />
            </label>
          </div>
        </div>
        <div className="col-6 text-center">
          <img
            src="https://i.pinimg.com/originals/94/96/e7/9496e7d9729e14408f0e21272e8885c7.gif"
            width="100"
            height="100"
          />
        </div>
      </div>
      <button
        type="submit"
        id="order-error"
        style={{
          border: "1px solid #d1d0d0",
          backgroundColor: "#514f4d",
          color: "#fff",
          height: "3.2rem",
          padding: "0 1.25rem",
          width: "100%",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#383633")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#514f4d")}
      >
        {buttonText}
      </button>
    </form>
  );
}
