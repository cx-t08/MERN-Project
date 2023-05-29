import { Form, Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { baseURL } from "../utils/constants";
import axios from "axios";

function Update(props) {
  const [ucolor, setUColor] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (props && Object.keys(props).length !== 0) {
      const task = props.task;
      if (Object.keys(task).length !== 0) {
        setId(task._id);
        setUColor(task.color);
      }
    }
  }, [props.task]);

  const updateTask = (e) => {
    props.onHide();
    axios
      .put(`${baseURL}/updatecolor/${id}`, {
        task: { color: ucolor },
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
          Update Color
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ fontWeight: "bold" }}>Color Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the color"
              value={ucolor}
              onChange={(e) => setUColor(e.target.value)}
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
