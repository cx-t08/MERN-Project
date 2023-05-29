import React, { useState, useEffect, useRef } from "react";
import { baseURL } from "../utils/constants";
import axios from "axios";
import { useDownloadExcel } from "react-export-table-to-excel";
import { Download } from "react-bootstrap-icons";

export default function AdminProductTable({ data, onEdit, onDelete }) {
  const [tasks, setTasks] = useState([]);
  const [updateUI, setupdateUI] = useState(false);

  useEffect(() => {
    axios.get(`${baseURL}/getproduct`).then((res) => {
      // console.log(res.data);
      setTasks(res.data);
    });
  }, [updateUI]);

  const tableRef = useRef(null);
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Burrow Products",
    sheet: "Admin",
  });

  const defaultOption = { value: "", label: "Select category" };

  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const uniqueCategories = [...new Set(tasks.map((task) => task.category))];

  const filteredTasks = tasks.filter((task) => {
    return selectedOption === "" || task.category === selectedOption;
  });

  return (
    <div className="d-block">
      <div className="d-flex justify-content-end mb-2">
        <select
          className="py-2 p-1 mx-2"
          id="category-selector"
          value={selectedOption}
          onChange={(e) => handleOptionChange(e)}
        >
          <option value={defaultOption.value}>{defaultOption.label}</option>
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button
          onClick={onDownload}
          style={{
            padding: "0.2rem 1.5rem",
            border: "1px solid #d1d0d0",
            backgroundColor: "#514f4d",
            color: "#fff",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#383633")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#514f4d")}
        >
          Download&nbsp;
          <Download />
        </button>
      </div>

      <table ref={tableRef}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Name</th>
            <th>Size</th>
            <th>Quantity</th>
            <th>Price($)</th>
            <th>Action</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks &&
            filteredTasks.map((task, index) => {
              return (
                <tr key={task._id}>
                  <td>{task.productid}</td>
                  <td>{task.category}</td>
                  <td>{task.productname}</td>
                  <td>{task.size}</td>
                  <td>{task.quantity}</td>
                  <td>{task.price}</td>
                  <td>
                    <button
                      className="edit"
                      onClick={() => onEdit(task)}
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
                      className="delete"
                      onClick={() => onDelete(task)}
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
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
