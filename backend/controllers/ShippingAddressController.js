const ShippingAddressModel = require("../models/ShippingAddressModel");

//read task
module.exports.getShippingAddressTask = async (req, res) => {
  const tasks = await ShippingAddressModel.find();
  res.send(tasks);
  // console.log(tasks);
};

//create task
module.exports.saveShippingAddressTask = (req, res) => {
  const { task } = req.body;
  ShippingAddressModel.create(task)
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
module.exports.updateShippingAddressTask = (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  console.log(id);
  console.log(task);
  ShippingAddressModel.findByIdAndUpdate(id, task)
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
module.exports.deleteShippingAddressTask = (req, res) => {
  const { id } = req.params;
  console.log(id);
  ShippingAddressModel.findByIdAndDelete(id)
    .then((data) => {
      console.log("Deleted");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err.message);
      res.send("Not deleted");
    });
};
