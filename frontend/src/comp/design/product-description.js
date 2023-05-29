import React, { useState, useEffect } from "react";
import "../App.css";
import Carousel from "react-bootstrap/Carousel";
import Cart from "../shopping/cart";
import { baseURL } from "../utils/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Product() {
  const [cartShow, setCartShow] = React.useState(false);
  const [pname, setPName] = useState([]);
  const [productid, setProductId] = useState("");
  const [productname, setProductName] = useState("");
  const [productsize, setProductSize] = useState("");
  const [productcolor, setProductColor] = useState("");
  const [productprice, setProductPrice] = useState("");
  const [productdescription, setProductDescription] = useState("");
  const [images, setImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/getProductDescription`);
        const dataArray = response.data;
        const lastData = dataArray[dataArray.length - 1];
        console.log(lastData);
        setPName(lastData.productname);
        setProductId(lastData.productid);
        setProductName(lastData.productname);
        setProductSize(lastData.size);
        setProductColor(lastData.color);
        setProductPrice(lastData.price);
        setProductDescription(lastData.description);
        setImage(lastData.url);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const id = localStorage.getItem("customeremail");
  const [isCartSaved, setIsCartSaved] = useState(false);

  const addToCart = (event, id) => {
    event.preventDefault();

    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      window.alert("Required User Login for Add to Cart");
      navigate("/user-profile");
      return;
    }

    if (isCartSaved) {
      console.log("Cart is already saved");
      return;
    }

    axios
      .put(`${baseURL}/updateCart/${id}`, {
        task: {
          products: {
            product_id: productid,
            product_name: productname,
            product_price: productprice,
            product_image: images,
          },
        },
      })

      .then((response) => {
        console.log("Cart saved:", response.data);
        setIsCartSaved(true);
        axios
          .post(`${baseURL}/saveOrder/${id}`, {
            task: {
              customer: id,
            },
          })
          .then((response) => {
            console.log("Order ID Created:", response.data);
          })
          .catch((error) => {
            console.error("Error updating Order ID:", error.message);
          });
      })
      .catch((error) => {
        console.error("Error saving cart:", error.message);
      });
  };

  return (
    <div className="px-3" style={{ overflowX: "hidden" }}>
      <p>Nomad Collection</p>
      <div className="row gx-0 d-flex flex-wrap">
        <div className="col-9">
          <Carousel id="caro-description">
            <Carousel.Item>
              <img className="d-block w-100" src={images} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="./images/nomad2.webp"
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="./images/nomad3.webp"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="./images/nomad4.webp"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="./images/nomad5.webp"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="./images/nomad6.webp"
                alt="First slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="col-3 px-3">
          <h4 className="text-wrap">{productname}</h4>
          <span
            className="d-flex flex-wrap py-3"
            style={{ fontSize: "x-large" }}
          >
            <div>
              <span className="fw-light">Price:</span>&nbsp;
              {productprice.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </div>
          </span>
          <div
            className="d-flex text-wrap py-3"
            style={{ fontSize: "x-large" }}
          >
            <span className="fw-light">Size:</span>&nbsp;
            {productsize}
          </div>
          <div
            className="d-flex flex-wrap py-3"
            style={{ fontSize: "x-large" }}
          >
            <span className="fw-light">Color:</span>&nbsp;
            {productcolor}
          </div>
          <div className="my-3 d-flex flex-wrap">
            <button
              style={{ border: "none" }}
              onClick={() => setCartShow(true)}
            >
              <div style={{ textDecoration: "", color: "#484543" }}>
                <button
                  className="add-cart"
                  onClick={(event) =>
                    addToCart(event, id, productid, productname, productprice)
                  }
                >
                  ADD TO CART
                </button>
              </div>
            </button>
            <Cart show={cartShow} onHide={() => setCartShow(false)} />
          </div>
          <div>
            <div className="shop-seat container my-1 text-center"></div>
          </div>
          <p>In stock! Ships in 5-10 business days</p>
        </div>
      </div>
      <div className="container mt-4">
        <div className="about-piece">
          <h4>About this piece</h4>
          <p style={{ fontSize: "1.4rem" }}>
            {productdescription}
            {/* The cornerstone of our Nomad Collection is the essential sofa
            reinvented for modern life. The first truly easy-to-move sofa thanks
            to our award-winning modular design; it has plenty of room for three
            people, or more if you're into cuddling. It's packed with all the
            clever, life-changing features you expect from Burrow, starting with
            a built-in USB charger. */}
          </p>
        </div>
        <div>
          <h4>Dimensions</h4>
          <img
            src="./images/nomad-dimensions.webp"
            alt=""
            width="100%"
            height="100%"
          />
        </div>

        <div className="row">
          <div className="col-4">
            <h6>Customizable</h6>
            <p>
              Create your ideal sectional sofa with five fabric colors, six leg
              finishes, and three armrest heights. You can even swap the
              reversible back cushions: one side is tufted for a classic look,
              the other smooth and contemporary.
            </p>
          </div>
          <div className="col-4">
            <h6>Adaptable</h6>
            <p>
              Rest easy with the knowledge that your new furniture can grow and
              expand with your life, thanks to the universal, modular design of
              our Nomad Collection.
            </p>
          </div>
          <div className="col-4">
            <h6>Comfortable</h6>
            <p>
              The cushions are formulated for lasting comfort with our
              proprietary three-layer foam and fiber architecture, and feature a
              plush crown for a soft initial sit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
