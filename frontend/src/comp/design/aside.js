import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import * as Icon from "react-bootstrap-icons";
import Dropdown from "react-bootstrap/Dropdown";
import Cart from "../shopping/cart";
import { baseURL } from "../utils/constants";
import axios from "axios";
import Products from "./products";
<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Unbounded&display=swap');
</style>;

function Aside() {
  const [categoryTasks, setCategoryTasks] = useState([]);
  useEffect(() => {
    axios.get(`${baseURL}/getcategory`).then((res) => {
      const categories = res.data.map((task) => task.category);
      setCategoryTasks(categories);
    });
  }, []);

  const head_dropdown = [
    "Seating",
    "Living Room",
    "Outdoor",
    "Bedroom",
    "Storage",
    "Rugs",
    "Inspiration",
  ];

  const [selectedCategory, setSelectedCategory] = useState("");
  const categoryRefs = useRef([]);

  const handleCategoryHover = (category) => {
    setSelectedCategory(category);
  };

  const handleOutsideClick1 = (event) => {
    for (let ref of categoryRefs.current) {
      if (ref && !ref.current.contains(event.target)) {
        setSelectedCategory("");
      }
    }
  };

  const handleDropdownMouseLeave = () => {
    setSelectedCategory("");
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick1);
    return () => {
      document.removeEventListener("click", handleOutsideClick1);
    };
  }, []);

  const [cartShow, setCartShow] = React.useState(false);
  const navigate = useNavigate();
  const handleUserClick = () => {
    navigate("/user-profile");
  };
  const handleAdminClick = () => {
    navigate("/admin-login");
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("customeremail");
    // navigate("/user-profile");
    window.location.href = "/user-profile";
  };

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/user-profile");
    }
  }, []);

  const id = localStorage.getItem("customeremail");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLaststName] = useState("");
  const [customeremail, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");

  useEffect(() => {
    axios.get(`${baseURL}/get/${id}`).then((res) => {
      const data = res.data;
      const matchingData = data.find((item) => item._id === id);

      if (matchingData) {
        const firstname = matchingData.customer_name.first_name;
        setFirstName(firstname);
        const lastname = matchingData.customer_name.last_name;
        setLaststName(lastname);
        const email = matchingData.customer_login.customer_email;
        setEmail(email);
        const gender = matchingData.gender;
        setGender(gender);
        const dOb = matchingData.dOb;
        setDob(dOb);
      }
    });
  }, []);

  return (
    <div id="aside">
      <aside
        id="aside-header"
        className="py-3"
        style={{ backgroundColor: "#fff" }}
      >
        <div className="header-navigation container-fluid d-flex justify-content-between flex-wrap">
          <div className="d-flex align-items-center">
            <Link
              to="/"
              style={{
                fontFamily: "Unbounded, cursive",
                fontSize: "x-large",
                textDecoration: "none",
                color: "black",
              }}
            >
              BURROW
            </Link>
          </div>
          <div
            className="header-dropdown d-flex align-items-center flex-wrap"
            onMouseLeave={handleDropdownMouseLeave}
          >
            {categoryTasks.map((category, index) => {
              return (
                <div
                  className="d-none d-xl-block dropdown"
                  ref={categoryRefs.current[index]}
                  key={index}
                >
                  <button
                    className="dropdown-toggle header-ddown mx-4"
                    type="button"
                    id={`dropdownMenuButton1${index}`}
                    data-toggle="dropdown"
                    onMouseEnter={() => handleCategoryHover(category)}
                    style={{ background: "transparent", border: "none" }}
                  >
                    {category}
                  </button>
                </div>
              );
            })}
            <div
              className={`dropdown-menu custom-dropdown-menu ${
                selectedCategory !== "" ? " show" : ""
              }`}
              aria-labelledby="dropdownMenuButton1"
              onMouseLeave={handleDropdownMouseLeave}
            >
              <div className="dropdown-item">
                {selectedCategory && <Products category={selectedCategory} />}
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center">
            <div>
              {isLoggedIn && (
                <div className="dropdown" ref={dropdownRef}>
                  <button
                    className="dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded={dropdownOpen}
                    onClick={toggleDropdown}
                    onMouseOver={(e) => (e.target.style.color = "brown")}
                    onMouseOut={(e) => (e.target.style.color = "#000")}
                  >
                    <b>Hello {firstname}!</b>
                  </button>
                  <div
                    className={`mt-2 dropdown-menu dropdown-menu-right${
                      dropdownOpen ? " show" : ""
                    }`}
                    aria-labelledby="dropdownMenuButton"
                    style={{ right: "0" }}
                  >
                    <div className="dropdown-item d-flex">
                      <div className="col-6" style={{ color: "grey" }}>
                        Full Name:
                      </div>
                      <div className="col-6">
                        {firstname} {lastname}
                      </div>
                    </div>
                    <hr class="dropdown-divider"></hr>
                    <div className="dropdown-item">
                      <span style={{ color: "grey" }}>Email:</span>{" "}
                      {localStorage.getItem("customeremail")}
                    </div>
                    <hr class="dropdown-divider"></hr>
                    <div className="dropdown-item d-flex">
                      <div className="col-5" style={{ color: "grey" }}>
                        Gender:{" "}
                      </div>
                      <div className="col-7">
                        {gender &&
                          gender.charAt(0).toUpperCase() + gender.slice(1)}
                      </div>
                    </div>
                    <hr class="dropdown-divider"></hr>
                    <div className="dropdown-item d-flex">
                      <div className="col-5" style={{ color: "grey" }}>
                        DOB:
                      </div>
                      <div className="col-7">
                        {" "}
                        {dob && dob.split("-").reverse().join("-")}
                      </div>
                    </div>
                    <hr class="dropdown-divider"></hr>
                    <div className="d-flex align-items-center">
                      <Link
                        to="/orderhistory"
                        style={{
                          textDecoration: "none",
                          padding: "0.3rem 0.5rem",
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor = "#f4a460")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor = "#fff")
                        }
                      >
                        Order&nbsp;History
                      </Link>
                      <button
                        className="dropdown-item text-center"
                        onClick={handleLogout}
                        style={{ color: "red" }}
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor = "skyblue")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor = "#fff")
                        }
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {!isLoggedIn && (
              <Dropdown>
                <Dropdown.Toggle>
                  <Icon.PersonBoundingBox />
                </Dropdown.Toggle>
                <Dropdown.Menu className="profile-menu py-0">
                  <Dropdown.Item
                    className="profile-item"
                    style={{ borderBlockEnd: "1px solid black" }}
                    onClick={handleUserClick}
                  >
                    <Link
                      to="/user-profile"
                      className="text-decoration-none"
                      style={{ color: "black" }}
                    >
                      <div className="d-flex justify-content-evenly align-items-center">
                        <Icon.Person />
                        <span>Customer</span>
                      </div>
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item
                    className="profile-item"
                    onClick={handleAdminClick}
                  >
                    <Link
                      to="/admin-login"
                      className="text-decoration-none"
                      style={{ color: "black" }}
                    >
                      <div className="d-flex justify-content-evenly align-items-center">
                        <Icon.PersonGear />
                        <span>Admin</span>
                      </div>
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
            <button
              type="button"
              className="btn btn-demo"
              onClick={() => setCartShow(true)}
            >
              <Icon.Cart2 className="header-ddown" />
            </button>
            <Cart show={cartShow} onHide={() => setCartShow(false)} />
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Aside;
