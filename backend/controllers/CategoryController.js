const CategoryModel = require("../models/CategoryModel");

//read task
module.exports.getCategory = async (req, res) => {
  const task = await CategoryModel.find();
  res.send(task);
  // console.log(task);
};

//create task
module.exports.saveCategory = (req, res) => {
  const { task } = req.body;
  CategoryModel.create(task)
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
module.exports.updateCategory = (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  console.log(id);
  console.log(task);
  CategoryModel.findByIdAndUpdate(id, task)
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
module.exports.deleteCategory = (req, res) => {
  const { id } = req.params;
  console.log(id);
  CategoryModel.findByIdAndDelete(id)
    .then((data) => {
      console.log("Deleted");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err.message);
      res.send("Not deleted");
    });
};
