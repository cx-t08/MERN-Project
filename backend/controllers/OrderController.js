const OrderModel = require("../models/OrderModel");

//read task
module.exports.getOrder = async (req, res) => {
  const tasks = await OrderModel.find();
  res.send(tasks);
  // console.log(tasks);
};

//create task
module.exports.saveOrder = (req, res) => {
  const { task } = req.body;
  OrderModel.create(task)
    .then((data) => {
      console.log("Saved");
      console.log(data);
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send("Not Saved");
    });
};

//update task
module.exports.updateOrder = (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  console.log(id);
  console.log(task);
  OrderModel.findByIdAndUpdate(id, task)
    .then((data) => {
      console.log("Updated");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err.message);
      res.send("Not Updated");
    });
};

//delete tasks
module.exports.deleteOrder = (req, res) => {
  const { id } = req.params;
  console.log(id);
  OrderModel.findByIdAndDelete(id)
    .then((data) => {
      console.log("Deleted");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err.message);
      res.send("Not deleted");
    });
};
