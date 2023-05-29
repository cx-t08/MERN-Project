const ColorModel = require("../models/ColorModel");

//read task
module.exports.getColor = async (req, res) => {
  const task = await ColorModel.find();
  res.send(task);
  // console.log(task);
};

//create task
module.exports.saveColor = (req, res) => {
  const { task } = req.body;
  ColorModel.create(task)
    .then((data) => {
      console.log("Saved");
      // console.log(data);
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send("Not Saved");
    });
};

//update task
module.exports.updateColor = (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  console.log(id);
  console.log(task);
  ColorModel.findByIdAndUpdate(id, task)
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
module.exports.deleteColor = (req, res) => {
  const { id } = req.params;
  console.log(id);
  ColorModel.findByIdAndDelete(id)
    .then((data) => {
      console.log("Deleted");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err.message);
      res.send("Not deleted");
    });
};
