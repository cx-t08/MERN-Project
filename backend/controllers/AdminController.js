const AdminModel = require("../models/AdminModel");

//read task
module.exports.getAdmin = async (req, res) => {
  const tasks = await AdminModel.find();
  res.send(tasks);
  // console.log(tasks);
};
