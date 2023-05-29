import React, { useState, useEffect } from "react";
import $ from "jquery";
import { baseURL } from "../utils/constants";
import axios from "axios";

export default function AdminProductEdit({ data, onSave, onCancel }) {
  const [productid, setProductId] = useState(data.productid);
  const [category, setCategory] = useState(data.category);
  const [productname, setProductName] = useState(data.productname);
  const [size, setSize] = useState(data.size);
  const [color, setColor] = useState(data.color);
  const [price, setPrice] = useState(data.price);
  const [subcategory, setSubCategory] = useState(data.subcategory);
  const [quantity, setQuantity] = useState(data.quantity);
  const [description, setDescription] = useState(data.description);
  const [image, setImage] = useState(data.url);

  const handleSubmit = (event) => {
    event.preventDefault();
    const final = [];
    $(".error").remove();

    const productname = $("#pnamevalue").val();
    if (productname.length < 1) {
      $("#productName").after(
        '<div class="error">*Enter the Product Name</div>'
      );
    } else {
      final.push("1");
    }

    const quantity = $("#quantityvalue").val();
    if (quantity.length < 1) {
      $("#quantity").after(
        '<div class="error">*Enter the number of products</div>'
      );
    } else {
      final.push("2");
    }

    const description = $("#description").val();
    if (description.length < 1) {
      $("#description").after(
        '<div class="error">*Enter the description of the product</div>'
      );
    } else {
      final.push("3");
    }

    const price = $("#pricevalue").val();
    if (price.length < 1) {
      $("#price").after(
        '<div class="error">*Enter the price of the products (in $)</div>'
      );
    } else {
      final.push("4");
    }

    // const fileInput = $("#file")[0];
    // if (!fileInput.files || !fileInput.files[0]) {
    //   $("#image-file").after(
    //     '<div class="error">*Please upload an image file</div>'
    //   );
    // } else {
    //   final.push("5");
    // }

    if (final.length === 4) {
      // onSave({ productid, category, productname, size, color, price });
      axios
        .put(`${baseURL}/updateproduct/${productid}`, {
          task: {
            productid: productid,
            category: category,
            subcategory: subcategory,
            productname: productname,
            size: size,
            color: color,
            quantity: quantity,
            description: description,
            price: price,
            url: image,
          },
        })
        .then((res) => {
          console.log(res.data);
        });
      onSave();
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  const [tasksCategory, setTasksCategory] = useState([]);
  const [tasksSubcategory, setTasksSubcategory] = useState([]);
  const [tasksColor, setTasksColor] = useState([]);
  const [taskSize, setTasksSize] = useState([]);

  useEffect(() => {
    axios.get(`${baseURL}/getcategory`).then((res) => {
      console.log(res.data);
      setTasksCategory(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`${baseURL}/getsubcategory`).then((res) => {
      console.log(res.data);
      setTasksSubcategory(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`${baseURL}/getcolor`).then((res) => {
      console.log(res.data);
      setTasksColor(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`${baseURL}/getsize`).then((res) => {
      console.log(res.data);
      setTasksSize(res.data);
    });
  }, []);

  return (
    <div className="d-flex justify-content-center h-auto">
      <form onSubmit={handleSubmit} className="d-flex flex-column product-edit">
        <div className="my-2">
          <div
            className="d-flex align-items-center"
            style={{
              border: "1px solid #d1d0d0",
              height: "3.2rem",
              width: "100%",
            }}
          >
            <div className="col-4 p-2">
              <label>Product ID:</label>
            </div>
            <div className="col-8">
              <input
                type="text"
                name="pid"
                placeholder="Product ID"
                value={productid}
                onChange={(event) => setProductId(event.target.value)}
                disabled
                style={{
                  border: "1px solid #d1d0d0",
                  color: "#383633",
                  height: "3.2rem",
                  padding: "0 1.25rem",
                  width: "100%",
                }}
              />
            </div>
          </div>
        </div>
        <div className="my-2">
          <div
            className="d-flex align-items-center"
            style={{
              border: "1px solid #d1d0d0",
              color: "#383633",
              height: "3.2rem",
              width: "100%",
            }}
          >
            <div className="col-4 p-2">
              <label>Category:</label>
            </div>
            <div className="col-8">
              <select
                className="col-12 p-2"
                id="category"
                name="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                style={{
                  border: "1px solid #d1d0d0",
                  height: "3.2rem",
                  width: "100%",
                }}
              >
                {tasksCategory.map((task) => (
                  <option key={task._id} value={task.category}>
                    {task.category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="my-2">
          <div
            className="d-flex align-items-center"
            style={{
              border: "1px solid #d1d0d0",
              color: "#383633",
              height: "3.2rem",
              width: "100%",
            }}
          >
            <div className="col-4 p-2">
              <label>Sub Category:</label>
            </div>
            <div className="col-8">
              <select
                className="col-12 p-2"
                id="subcategory"
                name="subcategory"
                value={subcategory}
                onChange={(event) => setSubCategory(event.target.value)}
                style={{
                  border: "1px solid #d1d0d0",
                  height: "3.2rem",
                  width: "100%",
                }}
              >
                {tasksSubcategory.map((task) => (
                  <option key={task._id} value={task.subcategory}>
                    {task.subcategory}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="my-2">
          <div
            id="productName"
            className="d-flex align-items-center"
            style={{
              border: "1px solid #d1d0d0",
              color: "#383633",
              height: "3.2rem",
              width: "100%",
            }}
          >
            <div className="col-4 p-2">
              <label>Product Name:</label>
            </div>
            <div className="col-8">
              <input
                type="text"
                name="productname"
                id="pnamevalue"
                placeholder="Product Name"
                value={productname}
                onChange={(event) => setProductName(event.target.value)}
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
                onMouseOut={(e) => (e.target.style.backgroundColor = "#fff")}
              />
            </div>
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
            <div className="col-4 p-2">
              <label>Product Size:</label>
            </div>
            <div className="col-8">
              <select
                className="col-12 p-2"
                id="color"
                name="color"
                value={size}
                onChange={(event) => setSize(event.target.value)}
                style={{
                  border: "1px solid #d1d0d0",
                  height: "3.2rem",
                  width: "100%",
                }}
              >
                {taskSize.map((task) => (
                  <option key={task._id} value={task.material}>
                    {task.material}
                  </option>
                ))}
              </select>
            </div>
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
            <div className="col-4 p-2">
              <label>Product Color:</label>
            </div>
            <div className="col-8">
              <select
                className="col-12 p-2"
                name="color"
                id="colorvalue"
                value={color}
                onChange={(event) => setColor(event.target.value)}
                style={{
                  border: "1px solid #d1d0d0",
                  height: "3.2rem",
                  width: "100%",
                }}
              >
                {tasksColor.map((task) => (
                  <option key={task._id} value={task.color}>
                    {task.color}
                  </option>
                ))}
              </select>
            </div>
          </div>
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
            <div className="col-4 p-2">
              <label>Product Quantity:</label>
            </div>
            <div className="col-8">
              <input
                type="number"
                id="quantityvalue"
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
                onMouseOut={(e) => (e.target.style.backgroundColor = "#fff")}
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
            onMouseOver={(e) => (e.target.style.backgroundColor = "#d1d0d0")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#fff")}
          ></textarea>
        </div>
        <div className="my-2">
          <div
            className="d-flex align-items-center"
            id="image-file"
            style={{
              border: "1px solid #d1d0d0",
              color: "#383633",
              height: "3.2rem",
              width: "100%",
            }}
          >
            <div className="col-4 p-2">
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
                {/* <input
                  type="file"
                  id="file"
                  accept="image/png, image/jpeg, image/webp"
                /> */}
              </div>
            </div>
          </div>
        </div>
        <div className="my-2">
          <div
            className="d-flex align-items-center"
            id="price"
            style={{
              border: "1px solid #d1d0d0",
              color: "#383633",
              height: "3.2rem",
              width: "100%",
            }}
          >
            <div className="col-4 p-2">
              <label>Price:</label>
            </div>
            <div className="col-8">
              <input
                type="number"
                id="pricevalue"
                min="1"
                max="1000000"
                name="price"
                placeholder="Product Price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
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
                onMouseOut={(e) => (e.target.style.backgroundColor = "#fff")}
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between my-2 gap-3">
          <button
            type="submit"
            style={{
              padding: "0.5rem 5rem",
              border: "1px solid #d1d0d0",
              backgroundColor: "#514f4d",
              color: "#fff",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#383633")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#514f4d")}
          >
            Update
          </button>
          <button
            type="button"
            onClick={handleCancel}
            style={{
              padding: "0.5rem 5rem",
              border: "1px solid #d1d0d0",
              backgroundColor: "#514f4d",
              color: "#fff",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#383633")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#514f4d")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
