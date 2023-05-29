import "../App.css";
import React, { useEffect } from "react";
import { useState } from "react";
import $ from "jquery";
import Table from "react-bootstrap/esm/Table";
import { useNavigate } from "react-router-dom";
import Update from "./UtilityEditSubCategory";
import { baseURL } from "../utils/constants";
import axios from "axios";

export default function UtilitySubCategory() {
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    var final = [];
    $(".error").remove();
    if (selectedOption === "") {
      $("#productName2").after('<div class="error">Select a Category</div>');
    } else {
      final.push("1");
    }
    if (inputValue.length < 1) {
      $("#productName2").after(
        '<div class="error">Enter the Sub Category</div>'
      );
    } else {
      var regEx = /^[A-Za-z\s]*$/;
      var validName = regEx.test(inputValue);
      if (!validName) {
        $("#productName2").after(
          '<div class="error">Sub Category Name contains only Alphabetics</div>'
        );
      } else {
        final.push("2");
      }
    }

    if (final.length === 2) {
      axios
        .post(`${baseURL}/savesubcategory`, {
          task: { category: selectedOption, subcategory: inputValue },
        })
        .then((res) => {
          setInputValue("");
          setSelectedOption("");
          setupdateUI((prevState) => !prevState);
        })
        .catch((err) => {
          console.log(err.message);
        });
      navigate("/admin-utility");
    }
  }

  const [tasksCategory, setTasksCategory] = useState([]);
  const [tasksSubcategory, setTasksSubcategory] = useState([]);
  const [updateUI, setupdateUI] = useState(false);

  useEffect(() => {
    axios.get(`${baseURL}/getcategory`).then((res) => {
      console.log(res.data);
      setTasksCategory(res.data);
      setupdateUI((prevState) => !prevState);
    });
  }, [updateUI]);

  useEffect(() => {
    axios.get(`${baseURL}/getsubcategory`).then((res) => {
      console.log(res.data);
      setTasksSubcategory(res.data);
    });
  }, [updateUI]);

  const handleDeleteButtonClick = (task) => {
    const id = task._id;
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      axios.delete(`${baseURL}/deletesubcategory/${id}`).then((res) => {
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
  const defaultOption = { value: "", label: "Select category" };
  return (
    <div className="p-3">
      <h2>Add Sub Category</h2>
      <form
        onSubmit={handleSubmit}
        className="text-start mb-2 d-flex gap-2"
        id="productName2"
      >
        <select
          className="py-2 p-1"
          id="category-selector"
          value={selectedOption}
          onChange={(e) => handleOptionChange(e)}
        >
          <option value={defaultOption.value} disabled>
            {defaultOption.label}
          </option>
          {tasksCategory.map((task) => (
            <option key={task._id} value={task.category}>
              {task.category}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Enter Sub Category"
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
          <th>Category</th>
          <th>SubCategories</th>
          <th>Action</th>
          <th>Action</th>
        </tr>

        {tasksSubcategory &&
          tasksSubcategory.map((task, index) => {
            return (
              <tr key={task._id}>
                <td>{index + 1}</td>
                <td className="text-start">{task.category}</td>
                <td className="text-start">{task.subcategory}</td>
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
