const ProductDescriptionModel = require("../models/ProductDescriptionModel");

//read task
module.exports.getProductDescription = async (req, res) => {
  const tasks = await ProductDescriptionModel.find();
  res.send(tasks);
  // console.log(tasks);
};

//create task
module.exports.saveProductDescription = (req, res) => {
  const { task } = req.body;
  ProductDescriptionModel.create(task)
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
module.exports.updateProductDescription = (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  console.log(id);
  console.log(task);
  ProductDescriptionModel.findByIdAndUpdate(id, task)
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
module.exports.deleteProductDescription = (req, res) => {
  const { id } = req.params;
  console.log(id);
  ProductDescriptionModel.findByIdAndDelete(id)
    .then((data) => {
      console.log("Deleted");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err.message);
      res.send("Not deleted");
    });
};
