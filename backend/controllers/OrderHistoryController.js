const OrderHistoryModel = require("../models/OrderHistoryModel");

//read task
module.exports.getOrderHistory = async (req, res) => {
  const tasks = await OrderHistoryModel.find();
  res.send(tasks);
  // console.log(tasks);
};

//create task
module.exports.saveOrderHistory = (req, res) => {
  const { task } = req.body;
  OrderHistoryModel.create(task)
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
module.exports.updateOrderHistory = (req, res) => {
  const { id } = req.params;
  const { order } = req.body;

  OrderHistoryModel.findById(id)
    .then((customer) => {
      if (customer) {
        if (!customer.orderhistory) {
          customer.orderhistory = [];
        }
        customer.orderhistory.push(order);
        return customer.save();
      } else {
        throw new Error("Customer not found");
      }
    })
    .then((data) => {
      console.log("Order history saved");
      console.log(data);
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Failed to save order history");
    });
};
