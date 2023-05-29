import React, { useState } from "react";
import { ArrowLeft, BagPlusFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import "../App.css";
import Data from "./product.json";
import AdminProductTable from "./admin-product-table";
import AdminProductEdit from "./admin-product-edit";
import { baseURL } from "../utils/constants";
import axios from "axios";

export default function AdminProduct() {
  const [data, setData] = useState(Data);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleEdit = (item) => {
    setSelectedItem(item);
  };
  const [updateUI, setupdateUI] = useState(false);

  function handleDelete(data) {
    const id = data.productid;
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      axios.delete(`${baseURL}/deleteproduct/${id}`).then((res) => {
        setupdateUI((prevState) => !prevState);
      });
      window.location.href = "/admin-product";
    }
  }

  const handleSave = (item) => {
    setData((prevData) =>
      prevData.map((prevItem) =>
        prevItem === selectedItem ? { ...prevItem, ...item } : prevItem
      )
    );
    setSelectedItem(null);
  };

  const handleCancel = () => {
    setSelectedItem(null);
  };

  return (
    <div>
      <div className="row d-flex align-items-start justify-content-around gx-0 h-auto">
        <div style={{ backgroundColor: "#faf4ed" }}>
          <div className="d-flex justify-content-between p-2">
            <Link to="/admin-management">
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
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#383633")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#514f4d")}
              >
                <ArrowLeft /> Admin Home
              </button>
            </Link>
            <Link to="/admin-product-new">
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
                Add New Product <BagPlusFill />
              </button>
            </Link>
          </div>
          <div
            className="sign-in-box d-flex flex-start justify-content-center"
            style={{ padding: "1.5rem", minHeight: "auto" }}
          >
            <div
              className="w-100 m-auto"
              style={{ maxWidth: "auto", height: "auto" }}
            >
              <div className="position-relative" style={{ minHeight: "100vh" }}>
                <div>
                  <legend className="w-100">
                    <h2 className="text-center">Product Management</h2>
                  </legend>
                  <div className="d-flex justify-content-center">
                    {selectedItem ? (
                      <AdminProductEdit
                        data={selectedItem}
                        onSave={handleSave}
                        onCancel={handleCancel}
                      />
                    ) : (
                      <AdminProductTable
                        data={data}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
