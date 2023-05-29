const SubCategoryModel = require("../models/SubCategoryModel");

//read task
module.exports.getSubCategory = async (req, res) => {
  const task = await SubCategoryModel.find();
  res.send(task);
  // console.log(task);
};

//create task
module.exports.saveSubCategory = (req, res) => {
  const { task } = req.body;
  SubCategoryModel.create(task)
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
module.exports.updateSubCategory = (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  console.log(id);
  console.log(task);
  SubCategoryModel.findByIdAndUpdate(id, task)
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
module.exports.deleteSubCategory = (req, res) => {
  const { id } = req.params;
  console.log(id);
  SubCategoryModel.findByIdAndDelete(id)
    .then((data) => {
      console.log("Deleted");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err.message);
      res.send("Not deleted");
    });
};
