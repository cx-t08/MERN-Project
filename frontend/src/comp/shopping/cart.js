import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import "../Cart.css";
import { PlusCircle, DashCircle } from "react-bootstrap-icons";
import { baseURL } from "../utils/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cart(props, setupdateUI) {
  const id = localStorage.getItem("customeremail");
  const [cart, setCart] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (props.show && id) {
      axios.get(`${baseURL}/getCart/${id}`).then((res) => {
        const data = res.data;
        const matchingCartItem = data.find((item) => item._id === id);
        setCart(matchingCartItem);
      });
    }
  }, [props.show, id]);

  const [counts, setCounts] = useState({});

  const handleMinus = (productId) => {
    const currentCount = counts[productId] || 1;
    if (currentCount > 1) {
      const updatedCounts = { ...counts, [productId]: currentCount - 1 };
      setCounts(updatedCounts);
    }
  };

  const handleButtonChange = (e, totalCost) => {
    e.preventDefault();

    const orderDetails = cart.products.map((product) => ({
      product_id: product.product_id,
      product_name: product.product_name,
      product_price: product.product_price,
      product_quantity: counts[product.product_id] || 1,
      product_image: product.product_image,
    }));

    axios
      .put(`${baseURL}/updateOrder/${id}`, {
        task: {
          orderdetails: orderDetails,
          total_price: totalAmount,
        },
      })
      .then((res) => {
        console.log(res);
        navigate("/checkout", { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let subtotal = 0;
  const shippingCost = 0;
  let totalCost = 0;

  if (Array.isArray(cart.products)) {
    cart.products.forEach((product) => {
      const count = counts[product.product_id] || 1;
      const calculateOrder = count * product.product_price;
      subtotal += calculateOrder;
    });
  }

  totalCost = subtotal + shippingCost;
  const [totalAmount, setTotalAmount] = useState("");
  useEffect(() => {
    setTotalAmount(totalCost);
  }, [totalCost]);

  const handleDelete = (item, product) => {
    if (!item || !product) {
      return;
    }
    const { _id } = item;
    const { _id: productId } = product;
    const confirmDelete = window.confirm("Are you sure you want to remove?");
    if (confirmDelete) {
      axios
        .delete(`${baseURL}/deleteCart/${_id}/${productId}`)
        .then((res) => {
          console.log(res);
          console.log("Deleted");
          setCart((prevItems) => {
            const updatedProducts = prevItems.products.filter(
              (p) => p._id !== productId
            );
            return { ...prevItems, products: updatedProducts };
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <style>
        {`
          .modal {
            --bs-modal-margin: 0;
          }
          .modal-dialog {
            height: 100vh;
            margin-right: 0;
          }
          .modal-content {
            height: 100vh;
            border-radius: 0;
            width: auto;
            margin-right: 0;
            padding: 0 1rem;
          }
          .modal-md {
            width: 400px;
          }
          .modal.fade .modal-dialog {
            transition: transform 0.3s ease-out;
            transform: translate3d(100%, 0, 0);
          }
          .modal.show .modal-dialog {
            transform: translate3d(0, 0, 0);
          }
          .modal-body {
            overflow-y: scroll;
            scroll-behavior: smooth;
            padding: 0;
          }
          .modal-body::-webkit-scrollbar {
            display: none;
          }
          .modal-footer {
            height: 12rem;
            box-shadow: 0 -5px 5px rgba(0, 0, 0, 0.1);
          }
          .secure-checkout {
            transition: all 0.3s ease 0s;
            background-color: #383633;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem 0;
            width: 100%;
            text-decoration: none;
            color: #f7eee3;
          }
          .secure-checkout:hover {
            transform: translateY(-7px);
            text-decoration: none;
            color: #f7eee3;
          }
        `}
      </style>
      <Modal id="cart" {...props} size="md" aria-labelledby="contained-modal">
        <Modal.Header closeButton className="mb-2">
          <Modal.Title id="contained-modal" style={{ fontWeight: "normal" }}>
            Your Cart
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <div className="container g-0">
              <div className=" d-flex flex-column">
                {Array.isArray(cart.products) && cart.products.length > 0 ? (
                  cart.products.map((product, index) => {
                    const count = counts[product.product_id] || 1;
                    const calculateOrder = count * product.product_price;
                    const subtotalItem = calculateOrder.toLocaleString(
                      "en-US",
                      {
                        style: "currency",
                        currency: "USD",
                      }
                    );

                    return (
                      <div
                        key={product._id}
                        className="row g-0 p-1 mb-2"
                        style={{
                          border: "1px solid #dee2e6",
                          borderRadius: 2,
                        }}
                      >
                        <div className="col-5 d-block align-items-center justify-content-between">
                          <div>
                            <img
                              src={product.product_image}
                              alt="item1"
                              width="100%"
                              height="100%"
                            />
                          </div>
                        </div>
                        <div className="col-7 d-flex flex-column justify-content-between px-2">
                          <div>{product.product_name}</div>
                          <div style={{ fontStyle: "italic" }}>
                            <span className="fw-light">SubTotal:</span>{" "}
                            {subtotalItem}
                          </div>
                          <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center justify-content-between">
                              <DashCircle
                                id="minus"
                                style={{
                                  color: "red",
                                  fontSize: 17,
                                  cursor: "pointer",
                                }}
                                onClick={() => handleMinus(product.product_id)}
                              />
                              <div
                                className="px-1"
                                id="pcount"
                                style={{ fontWeight: "bold", fontSize: 17 }}
                              >
                                &nbsp; {count} &nbsp;
                              </div>
                              <PlusCircle
                                id="plus"
                                style={{
                                  color: "green",
                                  fontSize: 17,
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  setCounts((prevCounts) => ({
                                    ...prevCounts,
                                    [product.product_id]:
                                      (prevCounts[product.product_id] || 1) + 1,
                                  }))
                                }
                              />
                            </div>
                            <button
                              onClick={() => handleDelete(cart, product)}
                              style={{
                                backgroundColor: "#cd6155",
                                border: "none",
                                borderRadius: 2,
                                color: "#fff",
                                padding: "0 0.4rem",
                              }}
                            >
                              REMOVE
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center">Your Cart is Empty</div>
                )}
              </div>
            </div>
          </>
        </Modal.Body>
        {Array.isArray(cart.products) && cart.products.length > 0 && (
          <Modal.Footer style={{ display: "block" }}>
            <div className="d-flex justify-content-between">
              <div>Subtotal</div>
              <div>
                {subtotal.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </div>
            </div>
            <div className="d-flex justify-content-between pb-2">
              <div>Shipping</div>
              <div>
                {shippingCost === 0
                  ? "FREE"
                  : shippingCost.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
              </div>
            </div>
            <div
              className="d-flex justify-content-between pb-2"
              style={{ fontWeight: "bold" }}
            >
              <div>Total</div>
              <div type="number" disabled style={{ border: "none" }}>
                {totalCost.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </div>
            </div>
            <Link
              type="button"
              to="/checkout"
              className="secure-checkout"
              onClick={(e) => {
                handleButtonChange(e, totalAmount);
                props.onHide();
              }}
            >
              SECURE CHECKOUT
            </Link>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
}
