import { Link } from "react-router-dom";
import "../App.css";
import Dropdown from "react-bootstrap/Dropdown";

function Header() {
  const head_utility = ["Free Swatches", "Showrooms", "Reviews"];
  const about = [
    { image: "./images/about1.webp", content: "Our Story" },
    { image: "./images/about2.webp", content: "Free Shipping" },
    { image: "./images/about3.webp", content: "Pet-Friendly" },
    { image: "./images/about4.webp", content: "Inspiration" },
    { image: "./images/about5.webp", content: "Our Blog" },
  ];
  return (
    <div className="app">
      <header
        className="app-header"
        style={{ backgroundColor: "#f7eee3", fontSize: "0.8rem" }}
      >
        <div className="header-utility container-fluid d-flex justify-content-between flex-wrap">
          <div className="d-flex align-items-center">
            Free shipping on all orders!
          </div>
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <div className="d-flex gap-3 d-none d-lg-block">
              {head_utility.map((props) => {
                return (
                  <Link
                    to="/products"
                    className="link"
                    style={{ marginRight: "1rem" }}
                  >
                    {props}
                  </Link>
                );
              })}
            </div>
            <div className="d-none d-lg-block">
              <a href="#footer" className="link">
                Refer a Friend
              </a>
            </div>
            <div className="d-none d-lg-block">
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  style={{ fontSize: "0.8rem" }}
                >
                  About
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item className="nav-link m-1 w-auto">
                    {about &&
                      about.map((item) => (
                        <div className="row">
                          <Link to="/products" className="link row">
                            <img
                              src={item.image}
                              alt="About"
                              className="col-6"
                            />
                            <p className="col-6 d-flex align-items-center">
                              {item.content}
                            </p>
                          </Link>
                        </div>
                      ))}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div>
              <div className="usa"></div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
