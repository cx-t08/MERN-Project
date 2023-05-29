import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";
import $ from "jquery";
import { baseURL } from "../utils/constants";
import axios from "axios";

const generateProductId = () => {
  const randomNumber = Math.floor(Math.random() * 100000) + 100;
  return `P${randomNumber}`;
};

function AdminProductNew() {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const generatedProductId = generateProductId();
    setProductId(generatedProductId);
  }, []);

  const handleOptionCategory = (event) => {
    setCategory(event.target.value);
  };
  const handleOptionSubCategory = (event) => {
    setSubCategory(event.target.value);
  };
  const handleOptionColor = (event) => {
    setColor(event.target.value);
  };
  const handleOptionSize = (event) => {
    setSize(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var final = [];

    $(".error").remove();
    if (category === "") {
      $("#category").after('<div class="error">Select a Category</div>');
    } else {
      final.push("1");
    }
    if (subCategory === "") {
      $("#subCategory").after('<div class="error">Select a Sub Category</div>');
    } else {
      final.push("2");
    }
    if (productId.length < 1) {
      $("#productId").after('<div class="error">Enter the Product ID</div>');
    } else {
      var regEx1 = /^[A-Za-z\d\s]*$/;
      var validName1 = regEx1.test(productId);
      if (!validName1) {
        $("#productId").after(
          '<div class="error">Product ID contains only Alphabetics and Numbers</div>'
        );
      }
      final.push("3");
    }
    if (productName.length < 1) {
      $("#productName").after(
        '<div class="error">Enter the Product Name</div>'
      );
    } else {
      var regEx2 = /^[A-Za-z\s]*$/;
      var validName2 = regEx2.test(productName);
      if (!validName2) {
        $("#productName").after(
          '<div class="error">Product Name contains only Alphabetics</div>'
        );
      }
      final.push("4");
    }
    if (size === "") {
      $("#size").after('<div class="error">Select the size</div>');
    } else {
      final.push("6");
    }
    if (color === "") {
      $("#color").after('<div class="error">Select a Color</div>');
    } else {
      final.push("6");
    }
    if (quantity.length < 1) {
      $("#quantity").after(
        '<div class="error">Enter the number of products</div>'
      );
    } else {
      final.push("7");
    }
    if (description.length < 1) {
      $("#description").after(
        '<div class="error">Enter the description of the product</div>'
      );
    } else {
      final.push("8");
    }
    if (price.length < 1) {
      $("#price").after(
        '<div class="error">Enter the price($) of single product</div>'
      );
    } else {
      final.push("9");
    }
    // const fileInput = $("#file")[0];
    // if (!fileInput.files || !fileInput.files[0]) {
    //   $("#image-file").after(
    //     '<div class="error">Please upload an image file</div>'
    //   );
    // } else {
    //   final.push("10");
    // }
    if (final.length === 9) {
      axios
        .post(`${baseURL}/saveproduct`, {
          task: {
            category: category,
            subcategory: subCategory,
            productid: productId,
            productname: productName,
            size: size,
            color: color,
            quantity: quantity,
            description: description,
            price: price,
            url: image,
          },
        })
        .then((res) => {
          setCategory("");
          setSubCategory("");
          setProductId("");
          setProductName("");
          setSize("");
          setColor("");
          setQuantity("");
          setDescription("");
          setImage("");
          setupdateUI((prevState) => !prevState);
        })
        .catch((err) => {
          console.log(err.message);
        });
      navigate("/admin-product");
    }
  };

  const [tasksCategory, setTasksCategory] = useState([]);
  const [tasksSubcategory, setTasksSubcategory] = useState([]);
  const [tasksColor, setTasksColor] = useState([]);
  const [tasksSize, setTasksSize] = useState([]);
  const [updateUI, setupdateUI] = useState(false);

  useEffect(() => {
    axios.get(`${baseURL}/getcategory`).then((res) => {
      console.log(res.data);
      setTasksCategory(res.data);
    });
  }, [updateUI]);

  useEffect(() => {
    axios.get(`${baseURL}/getsubcategory`).then((res) => {
      console.log(res.data);
      setTasksSubcategory(res.data);
    });
  }, [updateUI]);

  useEffect(() => {
    axios.get(`${baseURL}/getcolor`).then((res) => {
      console.log(res.data);
      setTasksColor(res.data);
    });
  }, [updateUI]);

  useEffect(() => {
    axios.get(`${baseURL}/getsize`).then((res) => {
      console.log(res.data);
      setTasksSize(res.data);
    });
  }, [updateUI]);

  const defaultOptionCategory = { value: "", label: "-- Select Category --" };
  const defaultOptionSubCategory = { value: "", label: "--Select SubCategory" };
  const defaultOptionColor = { value: "", label: "-- Select Color --" };
  const defaultOptionSize = { value: "", label: "-- Select Size --" };

  return (
    <div
      className="row d-flex align-items-start justify-content-around gx-0 h-100"
      style={{ backgroundColor: "#faf4ed" }}
    >
      <div className="sign-up h-auto">
        <div className="p-2">
          <Link to="/admin-product">
            <button
              type="submit"
              style={{
                border: "1px solid #d1d0d0",
                backgroundColor: "#514f4d",
                color: "#fff",
                height: "2rem",
                padding: "0 1.25rem",
                width: "10rem",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#383633")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#514f4d")}
            >
              <ArrowLeft /> Product List
            </button>
          </Link>
        </div>
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
                  <h2 className="text-center">Add New Product</h2>
                </legend>
                <form onSubmit={handleSubmit} id="adminform">
                  <div className="d-block">
                    <div className="my-2">
                      <div
                        className="d-flex align-items-center"
                        id="category"
                        style={{
                          border: "1px solid #d1d0d0",
                          color: "#383633",
                          height: "3.2rem",
                          width: "100%",
                        }}
                      >
                        <label className="col-4 d-flex p-3">Product ID:</label>
                        <input
                          type="text"
                          id="productId"
                          placeholder="Product ID"
                          className="my-2"
                          // value="1"
                          disabled
                          value={productId}
                          onChange={(e) => setProductId(e.target.value)}
                          style={{
                            border: "1px solid #d1d0d0",
                            color: "#383633",
                            height: "3.2rem",
                            padding: "0 1.25rem",
                            width: "100%",
                            backgroundColor: "#d1d0d0",
                          }}
                        />
                      </div>
                    </div>
                    <div className="my-2">
                      <div
                        className="d-flex align-items-center"
                        id="category"
                        style={{
                          border: "1px solid #d1d0d0",
                          color: "#383633",
                          height: "3.2rem",
                          width: "100%",
                        }}
                      >
                        <label className="col-4 d-flex p-3">Category:</label>
                        <select
                          className="col-8 py-2 p-2"
                          id="category-selector"
                          value={category}
                          onChange={(e) => handleOptionCategory(e)}
                          style={{
                            border: "1px solid #d1d0d0",
                            height: "3.2rem",
                          }}
                        >
                          <option value={defaultOptionCategory.value} disabled>
                            {defaultOptionCategory.label}
                          </option>
                          {tasksCategory.map((task) => (
                            <option key={task._id} value={task.category}>
                              {task.category}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="my-2">
                      <div
                        className="d-flex align-items-center"
                        id="subCategory"
                        style={{
                          border: "1px solid #d1d0d0",
                          color: "#383633",
                          height: "3.2rem",
                          width: "100%",
                        }}
                      >
                        <label className="col-4 d-flex p-3">
                          Sub Category:
                        </label>
                        <select
                          className="col-8 py-2 p-2"
                          id="category-selector"
                          value={subCategory}
                          onChange={(e) => handleOptionSubCategory(e)}
                          style={{
                            border: "1px solid #d1d0d0",
                            height: "3.2rem",
                          }}
                        >
                          <option
                            value={defaultOptionSubCategory.value}
                            disabled
                          >
                            {defaultOptionSubCategory.label}
                          </option>
                          {tasksSubcategory.map((task) => (
                            <option key={task._id} value={task.subcategory}>
                              {task.subcategory}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="my-2">
                      <div
                        className="d-flex align-items-center"
                        id="category"
                        style={{
                          border: "1px solid #d1d0d0",
                          color: "#383633",
                          height: "3.2rem",
                          width: "100%",
                        }}
                      >
                        <label
                          className="col-4 d-flex"
                          style={{ paddingLeft: "1rem" }}
                        >
                          Product Name:
                        </label>
                        <input
                          type="text"
                          id="productName"
                          placeholder="Product Name"
                          className="my-2"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
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
                    <div className="my-2">
                      <div
                        className="d-flex align-items-center"
                        id="size"
                        style={{
                          border: "1px solid #d1d0d0",
                          color: "#383633",
                          height: "3.2rem",
                          width: "100%",
                        }}
                      >
                        <div className="col-4 d-flex justify-content-center p-2">
                          <label>Product Size:</label>
                        </div>
                        <select
                          className="col-8 py-2 p-2"
                          id="category-selector"
                          value={size}
                          onChange={(e) => handleOptionSize(e)}
                          style={{
                            border: "1px solid #d1d0d0",
                            height: "3.2rem",
                          }}
                        >
                          <option value={defaultOptionSize.value} disabled>
                            {defaultOptionSize.label}
                          </option>
                          {tasksSize.map((task) => (
                            <option key={task._id} value={task.material}>
                              {task.material}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="my-2">
                      <div
                        className="d-flex align-items-center"
                        id="color"
                        style={{
                          border: "1px solid #d1d0d0",
                          color: "#383633",
                          height: "3.2rem",
                          width: "100%",
                        }}
                      >
                        <div className="col-4 d-flex justify-content-center p-2">
                          <label>Product Color:</label>
                        </div>
                        <select
                          className="col-8 py-2 p-2"
                          id="category-selector"
                          value={color}
                          onChange={(e) => handleOptionColor(e)}
                          style={{
                            border: "1px solid #d1d0d0",
                            height: "3.2rem",
                          }}
                        >
                          <option value={defaultOptionColor.value} disabled>
                            {defaultOptionColor.label}
                          </option>
                          {tasksColor.map((task) => (
                            <option key={task._id} value={task.color}>
                              {task.color}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div id="error-color" style={{ color: "red" }}></div>
                    </div>
                    <div className="my-2">
                      <div
                        className="d-flex align-items-center dob1"
                        id="quantity"
                        style={{
                          border: "1px solid #d1d0d0",
                          color: "#383633",
                          height: "3.2rem",
                          width: "100%",
                        }}
                      >
                        <div className="col-4 p-3">
                          <label>Quantity:</label>
                        </div>
                        <div className="col-8">
                          <input
                            type="number"
                            placeholder="Number of Products(1-100)"
                            min="1"
                            max="1000"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
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
                      <textarea
                        rows="10"
                        cols="50"
                        id="description"
                        name="description"
                        placeholder="Product Description..."
                        form="adminform"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{
                          border: "1px solid #d1d0d0",
                          color: "#383633",
                          padding: "0.5rem 0.5rem",
                          width: "100%",
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor = "#d1d0d0")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor = "#fff")
                        }
                      ></textarea>
                    </div>
                    <div className="my-2">
                      <div
                        className="d-flex align-items-center text-center"
                        id="image-file"
                        style={{
                          border: "1px solid #d1d0d0",
                          color: "#383633",
                          height: "3.2rem",
                          width: "100%",
                        }}
                      >
                        <div className="col-4">
                          <label>Product Images:</label>
                        </div>
                        <div className="col-8">
                          <div
                            className="d-flex align-items-center"
                            style={{
                              border: "1px solid #d1d0d0",
                              color: "#383633",
                              height: "3.2rem",
                              width: "100%",
                            }}
                          >
                            <input
                              type="text"
                              id="file"
                              placeholder="Enter the image url"
                              value={image}
                              onChange={(e) => setImage(e.target.value)}
                              style={{
                                border: "1px solid #d1d0d0",
                                color: "#383633",
                                height: "3.2rem",
                                padding: "0 0.5rem",
                                width: "100%",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="my-2">
                      <div
                        className="d-flex align-items-center text-center"
                        id="price"
                        style={{
                          border: "1px solid #d1d0d0",
                          color: "#383633",
                          height: "3.2rem",
                          width: "100%",
                        }}
                      >
                        <div className="col-4">
                          <label>Product Price:</label>
                        </div>
                        <div className="col-8">
                          <input
                            type="number"
                            min="1"
                            max="100000"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Price of Single Product in $"
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
                      ADD PRODUCT
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

export default AdminProductNew;
