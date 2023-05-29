import { Form, Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import $ from "jquery";
import { baseURL } from "../utils/constants";
import axios from "axios";

function Update(props) {
  const [ucategory, setUCategory] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (props && Object.keys(props).length !== 0) {
      const task = props.task;
      if (Object.keys(task).length !== 0) {
        setId(task._id);
        setUCategory(task.category);
      }
    }
  }, [props.task]);

  const updateTask = (e) => {
    props.onHide();
    e.preventDefault();
    var final = [];
    $(".error").remove();
    if (ucategory.length < 1) {
      $("#category").after('<div class="error">Enter the Category</div>');
    } else {
      var regEx2 = /^[A-Za-z\s]*$/;
      var validName2 = regEx2.test(ucategory);
      if (!validName2) {
        $("#category").after(
          '<div class="error">Category Name contains only Alphabetics</div>'
        );
      } else {
        final.push("1");
      }
    }
    if (final.length === 1) {
      axios
        .put(`${baseURL}/updatecategory/${id}`, {
          task: { category: ucategory },
        })
        .then((res) => {
          console.log(res.data);
          props.setupdateUI((prevState) => !prevState);
        });
    }
  };
  return (
    <Modal
      {...props}
      size="md"
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ fontWeight: "bold" }}
        >
          Update Category
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ fontWeight: "bold" }}>
              Category Title
            </Form.Label>
            <Form.Control
              type="text"
              id="category"
              required
              placeholder="Enter the Category"
              value={ucategory}
              onChange={(e) => setUCategory(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          style={{
            background: "#383633",
            fontWeight: "bold",
            border: "none",
          }}
          onClick={(e) => updateTask(e)}
        >
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Update;
