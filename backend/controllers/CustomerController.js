const CustomerModel = require("../models/CustomerModel");

//read task
module.exports.getCustomer = async (req, res) => {
  const tasks = await CustomerModel.find();
  res.send(tasks);
  console.log(tasks);
};

//create task
module.exports.saveCustomer = (req, res) => {
  const { task } = req.body;
  CustomerModel.create(task)
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
module.exports.updateCustomer = (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  console.log(id);
  console.log(task);
  CustomerModel.findByIdAndUpdate(id, task)
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
module.exports.deleteCustomer = (req, res) => {
  const { id } = req.params;
  console.log(id);
  CustomerModel.findByIdAndDelete(id)
    .then((data) => {
      console.log("Deleted");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err.message);
      res.send("Not deleted");
    });
};
