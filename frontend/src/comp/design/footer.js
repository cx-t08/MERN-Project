import "../App.css";
import * as Icon from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import $ from "jquery";

function Footer() {
  const [emailSubscribe, setEmail] = useState("");
  const navigate = useNavigate();
  const foot_shopping = [
    "Schedule Consultation",
    "Showrooms",
    "Trade Program",
    "Outlet",
  ];
  const foot_about = [
    "Our Story",
    "Reviews",
    "Careers",
    "Financing",
    "Patents",
    "Our Blog",
  ];
  const foot_resources = [
    "Look Up Order Status",
    "Assembly Instructions",
    "Returns",
    "Shipping & Delivery",
    "FAQ",
    "Refer a Friend",
  ];
  const foot_contact = [
    "Email: support@burrow.com",
    "Hours:",
    "Monday to Friday — 10a to 8p EST",
    "Saturday to Sunday — 10a to 2p EST",
  ];
  const foot_burr = [
    "Terms",
    "Accessibility",
    "Sitemap",
    "Privacy",
    "Do not sell my personal information",
  ];
  const handleSubmit = (event) => {
    event.preventDefault();
    var final = [];
    var validEmail = "";
    $(".error").remove();
    if (emailSubscribe.length < 1) {
      $(".subscribe-email").after(
        '<div class="error">*This field is required</div>'
      );
    } else {
      var regEx1 = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
      validEmail = regEx1.test(emailSubscribe);
      if (!validEmail) {
        $(".subscribe-email").after(
          '<div class="error">*Enter a valid email</div>'
        );
      } else {
        final.push("1");
      }
    }
    if (final.length === 1) {
      $(".subscribe-email").after(
        '<div class="error" id="green">Thank You for Subscribing</div>'
      );
      navigate("/");
    }
  };

  return (
    <div id="footer">
      <div className="foot1 row gx-0 py-5">
        <div className="subscribe col-6">
          <div className="subscribe-email">
            <form onSubmit={handleSubmit}>
              <input
                className="sub-input col-6"
                type="email"
                id="subscribe-input"
                value={emailSubscribe}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Sign up for enthralling couch reads"
              ></input>
              <button className="sub-button col-5" type="submit">
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>
        <div className="col-6 d-flex align-items-center justify-content-end gap-3">
          <a href="https://www.facebook.com/">
            <Icon.Facebook
              width="30px"
              height="30px"
              style={{ color: "#f7eee3" }}
            />
          </a>
          <a href="https://www.twitter.com/">
            <Icon.Twitter
              width="30px"
              height="30px"
              style={{ color: "#f7eee3" }}
            />
          </a>
          <a href="https://www.instagram.com/">
            <Icon.Instagram
              width="30px"
              height="30px"
              style={{ color: "#f7eee3" }}
            />
          </a>
        </div>
      </div>
      <div
        className="foot2 text-light d-flex row gx-0 align-items-start"
        style={{ fontSize: "0.85rem" }}
      >
        <div className="col-3">
          <h6 className="my-3" style={{ fontSize: "0.85rem" }}>
            Shopping Services
          </h6>
          {foot_shopping.map((props) => {
            return (
              <div>
                <p>
                  <Link to="/products" className="foot_link">
                    {props}
                  </Link>
                </p>
              </div>
            );
          })}
        </div>
        <div className="col-3">
          <h6 className="my-3" style={{ fontSize: "0.85rem" }}>
            About
          </h6>
          {foot_about.map((props) => {
            return (
              <div>
                <p>
                  <Link to="/products" className="foot_link">
                    {props}
                  </Link>
                </p>
              </div>
            );
          })}
        </div>
        <div className="col-3">
          <h6 className="my-3" style={{ fontSize: "0.85rem" }}>
            Resources
          </h6>
          {foot_resources.map((props) => {
            return (
              <div>
                <p>
                  <Link to="/products" className="foot_link">
                    {props}
                  </Link>
                </p>
              </div>
            );
          })}
        </div>
        <div className="col-3" style={{ paddingLeft: "3rem" }}>
          <h6 className="my-3" style={{ fontSize: "0.85rem" }}>
            Contact Customer Experience
          </h6>
          {foot_contact.map((props) => {
            return (
              <div style={{ overflow: "hidden" }}>
                <p className="foot_link">{props}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className="foot3 text-light d-flex row gx-0 align-items-start"
        style={{ fontSize: "0.85rem" }}
      >
        <div className="col-9">
          <p>© 2023 Burrow - </p>
          <div className="d-flex flex-wrap">
            {foot_burr.map((props) => {
              return (
                <div>
                  <p>{props}&nbsp;</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-3">
          <p>15 W 27th Street, 9th Floor New York, NY, 10001</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
