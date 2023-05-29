import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import { HouseFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { baseURL } from "../utils/constants";
import axios from "axios";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    axios.get(`${baseURL}/getAdmin`).then((res) => {
      setTasks(res.data);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    $(".error").remove();

    if (email === "") {
      $("#adminemail").after('<div class="error">Enter the Email</div>');
    } else {
      const matchingAdmin = tasks.find((admin) => admin.admin_email === email);
      if (!matchingAdmin) {
        if (email === "") {
          $("#adminemail").after('<div class="error">Enter the Email</div>');
        } else {
          const matchingAdmin = tasks.find(
            (admin) => admin.admin_email === email
          );
          if (!matchingAdmin) {
            $("#adminemail").after(
              '<div class="error">The email address does not exist.</div>'
            );
          } else {
            if (!password) {
              $("#adminpassword").after(
                '<div class="error">Enter the Password</div>'
              );
            } else {
              if (matchingAdmin.admin_password === password) {
                navigate("/");
              } else {
                $("#adminpassword").after(
                  '<div class="error">This password is incorrect.</div>'
                );
              }
            }
          }
        }
      } else {
        if (!password) {
          $("#adminpassword").after(
            '<div class="error">Enter the Password</div>'
          );
        } else {
          if (matchingAdmin.admin_password === password) {
            navigate("/admin-management");
            localStorage.setItem("isAdminLoggedIn", "true");
            localStorage.setItem("adminemail", matchingAdmin.admin_email);
          } else {
            $("#adminpassword").after(
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
        <div className="sign-in h-auto" style={{ backgroundColor: "#faf4ed" }}>
          <div className="p-2">
            <Link to="/">
              <button
                type="submit"
                style={{
                  border: "1px solid #d1d0d0",
                  backgroundColor: "#514f4d",
                  color: "#fff",
                  height: "2rem",
                  padding: "0 1.25rem",
                  width: "12rem",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#383633")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#514f4d")}
              >
                <HouseFill /> Website
              </button>
            </Link>
          </div>
          <div
            className="sign-in-box d-flex flex-start justify-content-center"
            style={{ padding: "1.5rem", minHeight: "auto" }}
          >
            <div
              className="sign-in-content w-100 m-auto"
              style={{ maxWidth: "25rem", height: "100vh" }}
            >
              <div className="sign-in-form h-100 position-relative mt-4">
                <fieldset>
                  <legend className="w-100">
                    <h2 className="text-center">Hello Admin!</h2>
                    <p className="text-center" style={{ fontSize: "1rem" }}>
                      {/* email: arun@gmail.com || password: 123Qwe */}
                    </p>
                  </legend>
                  <form onSubmit={handleSubmit} method="POST" id="form2">
                    <div className="d-block">
                      <div className="my-2">
                        <input
                          type="email"
                          name="email"
                          id="adminemail"
                          placeholder="Enter Email*"
                          className="my-2"
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
                          name="password"
                          id="adminpassword"
                          placeholder="Enter Password*"
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
                        id="adminlogin"
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
