import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import Shippingaddress from "./ShippingAddress";
import { baseURL } from "../utils/constants";
import { HouseExclamationFill } from "react-bootstrap-icons";
import axios from "axios";
import $ from "jquery";
<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Unbounded&display=swap');
</style>;

export default function Checkout(props) {
  const [email, setEmail] = useState("");
  const [updateUI, setupdateUI] = useState(false);
  // const isLoggedIn = localStorage.getItem("isLoggedIn");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [passwordUp, setPassword] = useState("");
  const [cpasswordUp, setConfirmPassword] = useState("");
  const [dob, setDob] = useState("");
  const [language, setLanguage] = useState("");
  const [data, setData] = useState("");
  const id = localStorage.getItem("customeremail");
  useEffect(() => {
    axios.get(`${baseURL}/get/${id}`).then((res) => {
      const data = res.data;
      setData(res.data);
      const matchingData = data.find((item) => item._id === id);
      setEmail(matchingData);

      if (matchingData) {
        setFirstName(matchingData.customer_name.first_name);
        setLastName(matchingData.customer_name.last_name);
        setPassword(matchingData.customer_login.customer_password);
        setDob(matchingData.dOb);
        setLanguage(matchingData.language);
      }
    });
  }, [updateUI]);

  const [task, setTask] = useState("");
  const updateCustomer = (task) => {
    console.log("update task");
    setTask(task);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var final = [];
    $(".error").remove();

    const firstname = $("#firstname").val();
    if (firstname.length < 1) {
      $("#firstname").after('<div class="error">*Enter the First Name</div>');
    } else {
      var regEx = /^[A-Za-z\s]*$/;
      var validName = regEx.test(firstName);
      if (!validName) {
        $("#firstname").after(
          '<div class="error">Firstname contains only Alphabetics</div>'
        );
      }
      final.push("1");
    }
    const lastname = $("#lastname").val();
    if (lastname.length < 1) {
      $("#lastname").after('<div class="error">*Enter the Last Name</div>');
    } else {
      var regEx = /^[A-Za-z\s]*$/;
      var validName = regEx.test(lastname);
      if (!validName) {
        $("#lastname").after(
          '<div class="error">Lastname contains only Alphabetics</div>'
        );
      }
      final.push("2");
    }
    const password = $("#passwordup").val();
    if (password.length < 1) {
      $("#passwordup").after('<div class="error">*Enter the password</div>');
    } else {
      var regEx2 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$/;
      var validPassword = regEx2.test(password);
      if (!validPassword) {
        $("#passwordup").after(
          '<div class="error">Enter a valid password (minimum 6 characters, including at least one uppercase letter, one lowercase letter, and one numeral)</div>'
        );
      }
    }
    const cpassword = $("#cpasswordup").val();
    if (cpassword < 1) {
      $("#cpasswordup").after(
        '<div class="error">Enter the Conform Password</div>'
      );
    } else if (cpassword !== password) {
      $("#cpasswordup").after(
        '<div class="error">Confirm-Password does not match Password</div>'
      );
    } else {
      final.push("3");
    }
    if (dob === "") {
      $("#dob").after('<div class="error">Select a DOB</div>');
    } else {
      let dobDate = new Date(dob);
      let currentDate = new Date();
      let thirteenYearsAgo = new Date(
        currentDate.getFullYear() - 13,
        currentDate.getMonth(),
        currentDate.getDate()
      );
      if (dobDate >= thirteenYearsAgo) {
        $("#dob").after(
          '<div class="error">*You must be at least 13 years old</div>'
        );
      } else {
        final.push("4");
      }
    }
    if (final.length === 4) {
      axios
        .put(`${baseURL}/update/${id}`, {
          task: {
            customer_name: {
              first_name: firstName,
              last_name: lastName,
            },
            customer_login: {
              customer_password: passwordUp,
            },
            dOb: dob,
            language: language,
          },
        })
        .then((res) => {
          console.log(res.data);
          window.alert("Information Updated");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const divcustomer = useRef(null);

  function edithandleclick() {
    $(divcustomer.current).toggle();
  }
  function cancelhandleclick() {
    $(divcustomer.current).hide();
  }

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
      <div className="container" style={{ padding: "0 12rem" }}>
        <div className="shipping-details col-12">
          <div className="py-3">
            <b>Customer</b>
            <div
              className="d-flex py-3 justify-content-between align-items-center"
              style={{ borderBottom: "1px solid silver" }}
            >
              <div>
                <label>Email Address:&nbsp;</label>
                <input
                  type="text"
                  id="email"
                  className="my-2"
                  disabled
                  style={{
                    border: "1px solid silver",
                    color: "#383633",
                    backgroundColor: "#d1d0d0",
                    padding: "0 0.5rem",
                    height: "2rem",
                  }}
                  value={localStorage.getItem("customeremail")}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <button
                  onClick={() => edithandleclick(task)}
                  style={{
                    border: "1px solid #d1d0d0",
                    backgroundColor: "#514f4d",
                    color: "#fff",
                    padding: "0 1.25rem",
                    height: "2rem",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#383633")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "#514f4d")
                  }
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
          <div className="pb-3" ref={divcustomer} style={{ display: "none" }}>
            <div className="pb-3" style={{ borderBottom: "1px solid silver" }}>
              <form onSubmit={handleSubmit} id="form1">
                <div className="d-block">
                  <div className="d-flex">
                    <div className="col-6">
                      <div>First Name</div>
                      <input
                        type="text"
                        id="firstname"
                        className="my-2"
                        style={{
                          border: "1px solid silver",
                          color: "#383633",
                          height: "3.2rem",
                          padding: "0 1.25rem",
                          width: "95%",
                        }}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor = "#d1d0d0")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor = "#fff")
                        }
                      />
                    </div>
                    <div className="col-6">
                      <div>Last Name</div>
                      <input
                        type="text"
                        id="lastname"
                        className="my-2"
                        style={{
                          border: "1px solid silver",
                          color: "#383633",
                          height: "3.2rem",
                          padding: "0 1.25rem",
                          width: "100%",
                        }}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor = "#d1d0d0")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor = "#fff")
                        }
                      />
                    </div>
                  </div>
                  <div className="my-2">
                    <input
                      type="password"
                      name="password"
                      id="passwordup"
                      value={passwordUp}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password (min 6-letters, 1 capital & 1 number)"
                      className="my-2"
                      style={{
                        border: "1px solid #d1d0d0",
                        color: "#383633",
                        height: "3.2rem",
                        padding: "0 1.25rem",
                        width: "100%",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = "#d1d0d0")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = "#fff")
                      }
                    />
                    <p
                      id="passwordup"
                      style={{ display: "none", color: "red" }}
                    >
                      Enter Atleast 8-Letters, 1 Uppercase & 1 Number
                    </p>
                  </div>
                  <div className="my-2">
                    <input
                      type="password"
                      name="cpassword"
                      id="cpasswordup"
                      value={cpasswordUp}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm Password"
                      className="my-2"
                      style={{
                        border: "1px solid #d1d0d0",
                        color: "#383633",
                        height: "3.2rem",
                        padding: "0 1.25rem",
                        width: "100%",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = "#d1d0d0")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = "#fff")
                      }
                    />
                  </div>
                  <div className="my-2">
                    <div
                      className="d-flex align-items-center dob1"
                      id="dob"
                      style={{
                        border: "1px solid #d1d0d0",
                        color: "#383633",
                        height: "3.2rem",
                        width: "100%",
                      }}
                    >
                      <div className="col-4 p-3">
                        <label>Date of Birth:</label>
                      </div>
                      <div className="col-8">
                        <input
                          type="date"
                          id="date"
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                          style={{
                            border: "1px solid #d1d0d0",
                            color: "#383633",
                            height: "3.2rem",
                            padding: "0 1.25rem",
                            width: "100%",
                          }}
                          onMouseOver={(e) =>
                            (e.target.style.backgroundColor = "#d1d0d0")
                          }
                          onMouseOut={(e) =>
                            (e.target.style.backgroundColor = "#fff")
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="my-2">
                    <div
                      className="d-flex align-items-center text-center"
                      style={{
                        border: "1px solid #d1d0d0",
                        color: "#383633",
                        height: "3.2rem",
                        width: "100%",
                      }}
                      id="language"
                    >
                      <label
                        className="col-4 text-start p-3"
                        htmlFor="language-selector"
                      >
                        Language:
                      </label>
                      <select
                        className="col-8 p-1"
                        id="language-selector"
                        style={{
                          border: "1px solid #d1d0d0",
                          color: "#383633",
                          height: "3.2rem",
                          padding: "0 1.25rem",
                          // width: "100%",
                        }}
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                      >
                        <option value="" disabled>
                          --Select Preferred Language--
                        </option>
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Telugu">Telugu</option>
                        <option value="Marathi">Marathi</option>
                        <option value="Tamil">Tamil</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="d-flex gap-2 mt-3">
                  <button
                    type="submit"
                    onClick={() => updateCustomer(task)}
                    style={{
                      border: "1px solid #d1d0d0",
                      backgroundColor: "#514f4d",
                      color: "#fff",
                      height: "3.2rem",
                      padding: "0 1.25rem",
                      width: "50%",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#383633")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#514f4d")
                    }
                  >
                    UPDATE AN ACCOUNT
                  </button>
                  <button
                    onClick={() => cancelhandleclick(task)}
                    style={{
                      border: "1px solid #d1d0d0",
                      backgroundColor: "#514f4d",
                      color: "#fff",
                      height: "3.2rem",
                      padding: "0 1.25rem",
                      width: "50%",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#383633")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#514f4d")
                    }
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div>
            <Shippingaddress />
          </div>
        </div>
      </div>
    </div>
  );
}
