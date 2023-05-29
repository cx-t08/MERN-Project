import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import { baseURL } from "../utils/constants";
import axios from "axios";

function Signin() {
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleMouseOver = () => {
    setIsHovered(true);
  };
  const handleMouseOut = () => {
    setIsHovered(false);
  };
  const backgroundColor = isHovered ? "#faf4ed" : "#fff";

  const [tasks, setTasks] = useState([]);
  const id = email;
  useEffect(() => {
    axios
      .get(`${baseURL}/get`)
      .then((res) => {
        const data = res.data;
        setTasks(data);
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    $(".error").remove();

    if (email === "") {
      $("#emailin").after('<div class="error">Enter the Email</div>');
    } else {
      const matchingUser = tasks.find((user) => user._id === email);
      if (!matchingUser) {
        if (email === "") {
          $("#emailin").after('<div class="error">Enter the Email</div>');
        } else {
          const matchingUser = tasks.find(
            (user) => user.customer_login.customer_email === email
          );
          if (!matchingUser) {
            $("#emailin").after(
              '<div class="error">The email address does not exist.</div>'
            );
            $("#login").after(
              '<div class="error text-center py-2">If you are new, Create an Account!</div>'
            );
          } else {
            if (!password) {
              $("#passwordin").after(
                '<div class="error">Enter the Password</div>'
              );
            } else {
              if (matchingUser.customer_login.customer_password === password) {
                navigate("/");
              } else {
                $("#passwordin").after(
                  '<div class="error">This password is incorrect.</div>'
                );
              }
            }
          }
        }
      } else {
        if (!password) {
          $("#passwordin").after('<div class="error">Enter the Password</div>');
        } else {
          if (matchingUser.customer_login.customer_password === password) {
            window.location.href = "/";
            // navigate("/");
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem(
              "customeremail",
              matchingUser.customer_login.customer_email
            );
          } else {
            $("#passwordin").after(
              '<div class="error">This password is incorrect.</div>'
            );
          }
        }
      }
    }
  };

  return (
    <div>
      <div className="row d-flex align-items-start justify-content-around gx-0 h-100">
        <div
          className="sign-in h-auto"
          style={{ backgroundColor }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <div
            className="sign-in-box d-flex flex-start justify-content-center"
            style={{ padding: "1.5rem", minHeight: "auto" }}
          >
            <div
              className="sign-in-content w-100 m-auto"
              style={{ maxWidth: "25rem", height: "70rem" }}
            >
              <div className="sign-in-form h-100 position-relative mt-4">
                <fieldset>
                  <legend className="w-100">
                    <h2 className="text-center">Welcome Back</h2>
                    {/* <p className="text-center" style={{ fontSize: "1rem" }}>
                      email: arun@gmail.com || password: 123Qwe
                    </p> */}
                  </legend>
                  <form onSubmit={handleSubmit} method="POST" id="form2">
                    <div className="d-block">
                      <div className="my-2">
                        <input
                          type="email"
                          name="emailin"
                          id="emailin"
                          placeholder="Enter Email"
                          className="my-2"
                          htmlFor="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
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
                          name="passwordin"
                          id="passwordin"
                          placeholder="Enter Password"
                          className="my-2"
                          htmlFor="password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
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
                    <div>
                      <button
                        type="submit"
                        id="login"
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
                        LOG IN
                      </button>
                    </div>
                  </form>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
