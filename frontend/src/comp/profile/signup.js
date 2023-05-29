import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import "../App.css";
import { baseURL } from "../utils/constants";
import axios from "axios";

function Signup(setUpdateUI) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailUp, setEmail] = useState("");
  const [passwordUp, setPassword] = useState("");
  const [cpasswordUp, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [language, setLanguage] = useState("");
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const backgroundColor = isHovered ? "#faf4ed" : "#fff";
  const handleMouseOver = () => {
    setIsHovered(true);
  };
  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);

  function handleCheckboxChange1(event) {
    setIsChecked1(event.target.checked);
    $("#error-furniture").hide();
  }

  function handleCheckboxChange2(event) {
    setIsChecked2(event.target.checked);
    $("#error-furniture").hide();
  }

  function handleCheckboxChange3(event) {
    setIsChecked3(event.target.checked);
    $("#error-furniture").hide();
  }

  function handleCheckboxChange4(event) {
    setIsChecked4(event.target.checked);
    $("#error-furniture").hide();
  }

  const [tasks, setTasks] = useState([]);
  const id = emailUp;
  useEffect(() => {
    axios.get(`${baseURL}/get/:${id}`).then((res) => {
      setTasks(res.data);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    var final = [];
    var isChecked = $("#checkbox").is(":checked");
    $(".error").remove();

    if (firstName.length < 1) {
      $("#firstname").after('<div class="error">Enter the Firstname</div>');
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
    if (lastName.length < 1) {
      $("#lastname").after('<div class="error">Enter the Lastname</div>');
    } else {
      regEx = /^[A-Za-z\s]*$/;
      validName = regEx.test(lastName);
      if (!validName) {
        $("#lastname").after(
          '<div class="error">Lastname contains only Alphabetics</div>'
        );
      }
      final.push("2");
    }
    var validEmail = "";
    if (emailUp.length < 1) {
      $("#emailup").after('<div class="error">This field is required</div>');
    } else {
      // var regEx1 = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
      var regEx1 = /[a-z0-9]{4,}@[a-z]{2,}\.[a-z]{2,3}/;

      validEmail = regEx1.test(emailUp);
      if (!validEmail) {
        $("#emailup").after(
          '<div class="error">Enter a valid email (minimum 4 alphanumeric of email name, after @ 2 letters and after dot(.) 2 letters) (example@email.com)</div>'
        );
      } else {
        const matchingUser = tasks.find(
          (user) => user.customer_login.customer_email === emailUp
        );
        if (matchingUser) {
          $("#emailup").after(
            '<div class="error">This email address already exist.</div>'
          );
        } else {
          final.push("3");
        }
      }
    }
    if (passwordUp.length < 1) {
      $("#passwordup").after('<div class="error">Enter the Password</div>');
    } else {
      var regEx2 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$/;
      var validPassword = regEx2.test(passwordUp);
      if (!validPassword) {
        $("#passwordup").after(
          '<div class="error">Enter a valid password (minimum 6 characters, including at least one uppercase letter, one lowercase letter, and one numeral)</div>'
        );
      }
    }
    if (cpasswordUp !== passwordUp) {
      $("#cpasswordup").after(
        '<div class="error">Confirm-Password does not match Password</div>'
      );
    } else {
      final.push("4");
    }
    if ($('input[name="gender"]:checked')) {
      if ($('input[name="gender"]:checked').val()) {
        final.push("5");
      } else {
        $("#gender").after(
          '<span class="error" style="color:red">Select your Gender</span>'
        );
      }
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
        final.push("6");
      }
    }
    if (language === "") {
      $("#language").after('<div class="error">Select your language</div>');
    } else {
      final.push("7");
    }
    if (!isChecked1 && !isChecked2 && !isChecked3 && !isChecked4) {
      $("#error-furniture").text("Select at least one Furniture Type").show();
    } else {
      final.push("8");
    }
    if (isChecked === false) {
      $("#check").after('<div class="error">Accept Terms And Policy</div>');
    } else {
      final.push("9");
    }
    if (final.length === 9) {
      axios
        .post(`${baseURL}/save`, {
          task: {
            customer_name: {
              first_name: firstName,
              last_name: lastName,
            },
            customer_login: {
              customer_email: emailUp,
              customer_password: passwordUp,
            },
            gender: $('input[name="gender"]:checked').val(),

            dOb: dob,
            language: language,
            interests: {
              Living: isChecked1,
              Dining: isChecked2,
              Bed: isChecked3,
              Kitchen: isChecked4,
            },
          },
        })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("customeremail", emailUp);
          window.location.href = "/";
          // navigate("/", { replace: true });
          axios
            .post(`${baseURL}/saveCart`, {
              task: {
                customer: emailUp,
              },
            })
            .then((response) => {
              console.log("Cart ID Created:", response.data);
            })
            .catch((error) => {
              console.error("Error updating Cart ID:", error.message);
            });

          axios
            .post(`${baseURL}/saveOrderHistory`, {
              task: {
                customer: emailUp,
              },
            })
            .then((response) => {
              console.log("Order History ID Created:", response.data);
            })
            .catch((error) => {
              console.error("Error updating Order History ID:", error.message);
            });

          setUpdateUI((prevState) => !prevState);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const currentDate = new Date();
  currentDate.setFullYear(currentDate.getFullYear() - 13);
  const maxDate = currentDate.toISOString().split("T")[0];

  return (
    <div
      className="row d-flex align-items-start justify-content-around gx-0 h-100"
      style={{ backgroundColor }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div className="sign-up h-auto">
        <div
          className="sign-up-box d-flex flex-start justify-content-center"
          style={{ padding: "1.5rem", minHeight: "50rem" }}
        >
          <div
            className="sign-up-content w-100 m-auto"
            style={{ maxWidth: "25rem", maxHeight: "auto" }}
          >
            <div className="sign-up-form h-100 position-relative">
              <fieldset>
                <legend className="w-100">
                  <h2 className="text-center">I'm new here</h2>
                </legend>
                <form onSubmit={handleSubmit} id="form1">
                  <div className="d-block">
                    <div className="my-2">
                      <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder="First Name"
                        className="my-2"
                        style={{
                          border: "1px solid #d1d0d0",
                          color: "#383633",
                          height: "3.2rem",
                          padding: "0 1.25rem",
                          width: "100%",
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
                    <div className="my-2">
                      <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        placeholder="Last Name"
                        className="my-2"
                        style={{
                          border: "1px solid #d1d0d0",
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
                    <div className="my-2">
                      <input
                        type="email"
                        name="email"
                        id="emailup"
                        value={emailUp}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address (example@email.com)"
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
                        name="password"
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
                      <p
                        id="cpasswordup"
                        style={{ display: "none", color: "red" }}
                      >
                        Password match: Not Valid
                      </p>
                    </div>
                    <div className="my-2">
                      <div
                        className="d-flex align-items-center text-center"
                        style={{
                          border: "1px solid #d1d0d0",
                          color: "#383633",
                          height: "3.2rem",
                          padding: "0 1.25rem",
                          width: "100%",
                        }}
                        id="gender"
                      >
                        <div className="col-3 d-flex">
                          <label>Gender:</label>
                        </div>
                        <div className="col-3">
                          <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="male"
                            checked={gender === "male"}
                            onChange={(e) => setGender(e.target.value)}
                          />
                          <label htmlFor="male">&nbsp;Male</label>
                        </div>
                        <div className="col-3">
                          <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="female"
                            checked={gender === "female"}
                            onChange={(e) => setGender(e.target.value)}
                          />
                          <label htmlFor="female">&nbsp;Female</label>
                        </div>
                        <div className="col-3">
                          <input
                            type="radio"
                            id="other"
                            name="gender"
                            value="other"
                            checked={gender === "other"}
                            onChange={(e) => setGender(e.target.value)}
                          />
                          <label htmlFor="other">&nbsp;Other</label>
                        </div>
                      </div>
                    </div>
                    <div className="my-2">
                      <div
                        className="d-flex align-items-center text-center dob1"
                        id="dob"
                        style={{
                          border: "1px solid #d1d0d0",
                          color: "#383633",
                          height: "3.2rem",
                          width: "100%",
                        }}
                      >
                        <div className="col-4">
                          <label>Date of Birth:</label>
                        </div>
                        <div className="col-8">
                          <input
                            type="date"
                            max={maxDate}
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
                    <div className="my-2">
                      <div
                        id="furniture"
                        style={{
                          border: "1px solid #d1d0d0",
                          color: "#383633",
                          height: "5rem",
                          padding: "0 1.25rem",
                          width: "100%",
                        }}
                      >
                        <div>
                          <div className="d-flex py-2">
                            <label>Furniture Room Types:</label>
                          </div>
                          <div className="d-flex align-items-center ">
                            <div className="col-3">
                              <input
                                type="checkbox"
                                name="checkbox1"
                                value="value1"
                                checked={isChecked1}
                                onChange={handleCheckboxChange1}
                              />
                              <label htmlFor="living">&nbsp;Living</label>
                            </div>
                            <div className="col-3">
                              <input
                                type="checkbox"
                                name="checkbox2"
                                value="value2"
                                checked={isChecked2}
                                onChange={handleCheckboxChange2}
                              />
                              <label htmlFor="dining">&nbsp;Dining</label>
                            </div>
                            <div className="col-3">
                              <input
                                type="checkbox"
                                name="checkbox3"
                                value="value3"
                                checked={isChecked3}
                                onChange={handleCheckboxChange3}
                              />
                              <label htmlFor="bed">&nbsp;Bed</label>
                            </div>
                            <div className="col-3">
                              <input
                                type="checkbox"
                                name="checkbox4"
                                value="value4"
                                checked={isChecked4}
                                onChange={handleCheckboxChange4}
                              />
                              <label htmlFor="kitchen">&nbsp;Kitchen</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="error-furniture" style={{ color: "red" }}></div>
                    </div>
                    <div
                      class="my-2 d-flex align-items-center px-1"
                      style={{
                        color: "#383633",
                        height: "3.2rem",
                        width: "100%",
                      }}
                      id="check"
                    >
                      <div class="col-1">
                        <input
                          style={{
                            border: "1px solid #d1d0d0",
                            color: "#383633",
                            height: "1.1rem",
                            padding: "0 1rem",
                            width: "100%",
                          }}
                          type="checkbox"
                          id="checkbox"
                          checked={agree}
                          onChange={(e) => setAgree(e.target.value)}
                        />
                      </div>
                      <div class="col-11 d-flex justify-content-center">
                        <p style={{ marginTop: "0.5rem" }}>
                          I agree to the Terms of service and Privacy Policy
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      style={{
                        border: "1px solid #d1d0d0",
                        backgroundColor: "#514f4d",
                        color: "#fff",
                        height: "3.2rem",
                        padding: "0 1.25rem",
                        width: "100%",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = "#383633")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = "#514f4d")
                      }
                    >
                      CREATE AN ACCOUNT
                    </button>
                  </div>
                </form>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
