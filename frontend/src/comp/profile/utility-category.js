import "../App.css";
import React, { useState, useEffect } from "react";
import $ from "jquery";
import Table from "react-bootstrap/esm/Table";
import { useNavigate } from "react-router-dom";
import Update from "./UtilityEditCategory";
import { baseURL } from "../utils/constants";
import axios from "axios";

const generatecategoryId = () => {
  const randomNumber = Math.floor(Math.random() * 100) + 10;
  return `C${randomNumber}`;
};

export default function UtilityCategory() {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");
  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    var final = [];
    $(".error").remove();
    if (inputValue.length < 1) {
      $("#productName").after('<div class="error">Enter the Category</div>');
    } else {
      var regEx2 = /^[A-Za-z\s]*$/;
      var validName2 = regEx2.test(inputValue);
      if (!validName2) {
        $("#productName").after(
          '<div class="error">Category Name contains only Alphabetics</div>'
        );
      } else {
        final.push("1");
      }
    }

    if (final.length === 1) {
      axios
        .post(`${baseURL}/savecategory`, {
          task: {
            category: inputValue,
          },
        })
        .then((res) => {
          setInputValue("");
          setupdateUI((prevState) => !prevState);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    navigate("/admin-utility");
  }

  const [tasks, setTasks] = useState([]);
  const [updateUI, setupdateUI] = useState(false);
  useEffect(() => {
    axios.get(`${baseURL}/getcategory`).then((res) => {
      // console.log(res.data);
      setTasks(res.data);
    });
  }, [updateUI]);

  const handleDeleteButtonClick = (task) => {
    const id = task._id;
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      axios.delete(`${baseURL}/deletecategory/${id}`).then((res) => {
        setupdateUI((prevState) => !prevState);
      });
    }
  };

  const [modalShow, setModalShow] = React.useState(false);
  const [task, setTask] = useState("");
  const updateTask = (task) => {
    console.log("update task");
    setTask(task);
    setModalShow(true);
  };

  return (
    <div className="p-3">
      <h2>Add Category</h2>
      <form
        onSubmit={handleSubmit}
        className="text-start mb-2 d-flex gap-2"
        id="productName"
      >
        <input
          type="text"
          placeholder="Enter Category"
          style={{
            border: "1px solid gray",
            color: "#383633",
            height: "2.5rem",
            padding: "0 1.25rem",
            width: "20rem",
          }}
          value={inputValue}
          onChange={handleInputChange}
        />
        <input
          type="submit"
          value="Add"
          style={{
            border: "1px solid #d1d0d0",
            backgroundColor: "#514f4d",
            color: "#fff",
            height: "2.5rem",
            padding: "0 3.2rem",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#383633")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#514f4d")}
        ></input>
      </form>
      <Table className="utility-table">
        <tr>
          <th>ID</th>
          <th>Categories</th>
          <th>Action</th>
          <th>Action</th>
        </tr>

        {tasks &&
          tasks.map((task, index) => {
            return (
              <tr key={task._id}>
                <td>{index + 1}</td>
                <td className="text-start">{task.category}</td>
                <td>
                  <button
                    className="edit"
                    onClick={() => updateTask(task)}
                    style={{
                      padding: "0.2rem 1.5rem",
                      border: "1px solid #d1d0d0",
                      borderRadius: "8px",
                      backgroundColor: "#514f4d",
                      color: "#fff",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#383633")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#514f4d")
                    }
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="edit"
                    style={{
                      padding: "0.2rem 1.5rem",
                      border: "1px solid #d1d0d0",
                      borderRadius: "8px",
                      backgroundColor: "#514f4d",
                      color: "#fff",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#383633")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#514f4d")
                    }
                    onClick={() => handleDeleteButtonClick(task)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
      </Table>
      <Update
        show={modalShow}
        task={task}
        setupdateUI={setupdateUI}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}
