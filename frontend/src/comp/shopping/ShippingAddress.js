import React, { useState, useEffect } from "react";
import "../App.css";
import $ from "jquery";
import { baseURL } from "../utils/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Shippingaddress(updateCustomer) {
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const navigate = useNavigate();
  const [updateUI, setupdateUI] = useState(false);
  const id = localStorage.getItem("customeremail");

  useEffect(() => {
    axios.get(`${baseURL}/get/${id}`).then((res) => {
      const data = res.data;
      const matchingData = data.find((item) => item._id === id);

      if (matchingData) {
        setNumber(matchingData.mobile);
        setAddress(matchingData.customer_address.street_address);
        setCity(matchingData.customer_address.city);
        setState(matchingData.customer_address.state);
        setCountry(matchingData.customer_address.country);
        setPincode(matchingData.customer_address.pincode);
      }
    });
  }, [updateUI]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const final = [];
    $(".error").remove();

    const addresss = $("#address").val();
    if (addresss.length < 1) {
      $("#address").after('<div class="error">This field is required</div>');
    } else {
      final.push("2");
    }
    const numbers = $("#mobileNumber").val();
    if (numbers.length < 0) {
      $("#mobileNumber").after(
        '<div class="error">This field is required</div>'
      );
    } else {
      var validNumber = "";
      // var regExnum = /^\d{3}\d{3}\d{4}$/;
      var regExnum = /^[987]\d{2}\d{3}\d{4}$/;

      validNumber = regExnum.test(numbers);
      if (!validNumber) {
        $("#mobileNumber").after(
          '<div class="error">Enter the valid 10-digit Mobile number</div>'
        );
      } else {
        final.push("1");
      }
    }
    const citys = $("#city").val();
    if (citys.length < 1) {
      $("#city").after('<div class="error">This field is required</div>');
    } else {
      final.push("3");
    }
    const states = $("#state").val();
    if (states.length < 1) {
      $("#state").after('<div class="error">This field is required</div>');
    } else {
      final.push("4");
    }
    const countrys = $("#country").val();
    if (countrys.length < 1) {
      $("#country").after('<div class="error">This field is required</div>');
    } else {
      final.push("5");
    }
    const pincodes = $("#pincode").val();
    var validNumber2 = "";
    if (pincodes.length < 1) {
      $("#pincode").after('<div class="error">This field is required</div>');
    } else {
      var regExnum2 = /^\d{6}$/;
      validNumber2 = regExnum2.test(pincode);
      if (!validNumber2) {
        $("#pincode").after(
          '<div class="error">Enter the 6-digit Pincode</div>'
        );
      } else {
        final.push("6");
      }
    }
    if (final.length === 6) {
      axios
        .put(`${baseURL}/update/${id}`, {
          task: {
            mobile: number,
            customer_address: {
              street_address: address,
              city: city,
              state: state,
              country: country,
              pincode: pincode,
            },
          },
        })
        .then((res) => {
          console.log(res.data);
          navigate("/OrderSummary");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div>
      <b>Shipping Address</b>
      <form onSubmit={handleSubmit} className="py-3">
        <div>
          <div>Mobile Number</div>
          <input
            type="number"
            id="mobileNumber"
            className="my-2"
            min="0"
            style={{
              border: "1px solid silver",
              color: "#383633",
              height: "3.2rem",
              padding: "0 1.25rem",
              width: "100%",
            }}
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#d1d0d0")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#fff")}
          />
        </div>
        <div>
          <div>Street Address</div>
          <div className="my-2">
            <textarea
              rows="3"
              cols="50"
              id="address"
              form="adminform"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{
                border: "1px solid #d1d0d0",
                color: "#383633",
                padding: "1rem 1rem",
                width: "100%",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#d1d0d0")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#fff")}
            ></textarea>
          </div>
        </div>
        <div className="d-flex">
          <div className="col-6">
            <div>City</div>
            <input
              type="text"
              id="city"
              className="my-2"
              style={{
                border: "1px solid silver",
                color: "#383633",
                height: "3.2rem",
                padding: "0 1.25rem",
                width: "95%",
              }}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#d1d0d0")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#fff")}
            />
          </div>
          <div className="col-6">
            <div>State</div>
            <input
              type="text"
              id="state"
              className="my-2"
              style={{
                border: "1px solid silver",
                color: "#383633",
                height: "3.2rem",
                padding: "0 1.25rem",
                width: "100%",
              }}
              value={state}
              onChange={(e) => setState(e.target.value)}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#d1d0d0")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#fff")}
            />
          </div>
        </div>
        <div className="d-flex">
          <div className="col-6">
            <div>Country</div>
            <input
              type="text"
              id="country"
              className="my-2"
              style={{
                border: "1px solid silver",
                color: "#383633",
                height: "3.2rem",
                padding: "0 1.25rem",
                width: "95%",
              }}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#d1d0d0")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#fff")}
            />
          </div>
          <div className="col-6">
            <div>Pincode</div>
            <input
              type="number"
              id="pincode"
              className="my-2"
              min="0"
              style={{
                border: "1px solid silver",
                color: "#383633",
                height: "3.2rem",
                padding: "0 1.25rem",
                width: "100%",
              }}
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#d1d0d0")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#fff")}
            />
          </div>
        </div>
        <div>
          <button
            className="my-3"
            type="submit"
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
            SAVE ADDRESS & PROCEED PAYMENT
          </button>
        </div>
      </form>
    </div>
  );
}
