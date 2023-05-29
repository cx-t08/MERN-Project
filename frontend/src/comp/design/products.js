import React, { useState, useEffect } from "react";
import "../App.css";
import { baseURL } from "../utils/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Aside from "./aside";

export default function Products({ category }) {
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${baseURL}/getproduct`).then((res) => {
      const data = res.data;
      if (data.length > 0) {
        if (category) {
          const filteredData = data.filter(
            (item) => item.category === category
          );
          setProductData(filteredData);
        } else {
          setProductData(data);
        }
      }
    });
  }, [category]);

  const handleProductClick = (
    _id,
    productname,
    size,
    color,
    price,
    url,
    description
  ) => {
    axios
      .post(`${baseURL}/saveProductDescription`, {
        task: {
          productid: _id,
          productname: productname,
          size: size,
          color: color,
          description: description,
          price: price,
          url: url,
        },
      })
      .then((res) => {
        console.log(res);
        // navigate("/product-description", { replace: true });
        window.location.href = "/product-description";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="container">
        <div className="row d-flex py-2">
          {productData.map((item) => (
            <div
              key={item._id}
              className="d-flex col-4 py-2"
              onClick={() =>
                handleProductClick(
                  item._id,
                  item.productname,
                  item.size,
                  item.color,
                  item.price,
                  item.url,
                  item.description
                )
              }
            >
              <div>
                <div className="img">
                  <img
                    src={item.url}
                    className="img-fluid"
                    alt=""
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <div style={{ cursor: "pointer" }}>{item.productname}</div>
                  <div>
                    <p className="text-danger">
                      {item.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
