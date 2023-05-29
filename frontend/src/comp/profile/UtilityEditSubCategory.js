import { Form, Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { baseURL } from "../utils/constants";
import axios from "axios";

function Update(props) {
  const [ucategory, setUCategory] = useState("");
  const [usubcategory, setUSubCategory] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (props && Object.keys(props).length !== 0) {
      const task = props.task;
      if (Object.keys(task).length !== 0) {
        setId(task._id);
        setUCategory(task.category);
        setUSubCategory(task.subcategory);
      }
    }
  }, [props.task]);

  const updateTask = (e) => {
    props.onHide();
    axios
      .put(`${baseURL}/updatesubcategory/${id}`, {
        task: { subcategory: usubcategory },
      })
      .then((res) => {
        console.log(res.data);
        props.setupdateUI((prevState) => !prevState);
      });
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
          Update SubCategory
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
              placeholder="Enter the Category"
              disabled
              value={ucategory}
              onChange={(e) => setUCategory(e.target.value)}
            />
            <br />
            <Form.Label style={{ fontWeight: "bold" }}>
              SubCategory Title
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the SubCategory"
              value={usubcategory}
              onChange={(e) => setUSubCategory(e.target.value)}
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
