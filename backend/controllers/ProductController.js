const ProductModel = require("../models/ProductModel");

//read task
module.exports.getProduct = async (req, res) => {
  const tasks = await ProductModel.find();
  res.send(tasks);
  // console.log(tasks);
};

//create task
module.exports.saveProduct = (req, res) => {
  const { task } = req.body;
  ProductModel.create(task)
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
module.exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  console.log(id);
  console.log(task);
  ProductModel.findByIdAndUpdate(id, task)
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
module.exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  console.log(id);
  ProductModel.findByIdAndDelete(id)
    .then((data) => {
      console.log("Deleted");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err.message);
      res.send("Not deleted");
    });
};

// delete many tasks
module.exports.deleteMultipleProducts = (req, res) => {
  const { id } = req.params;
  const productIds = id.split(",");

  ProductModel.deleteMany({ _id: { $in: productIds } })
    .then((data) => {
      console.log("Deleted");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err.message);
      res.send("Not deleted");
    });
};

// module.exports.deleteMultipleProducts = (req, res) => {
//   const productsToDelete = req.body;
//   const deleteProductIds = [];
//   const updateProducts = [];

//   productsToDelete.forEach((product) => {
//     if (product.quantity === 1) {
//       deleteProductIds.push(product.product_id);
//     } else if (product.quantity > 1) {
//       updateProducts.push({
//         _id: product.product_id,
//         quantity: product.quantity - 1,
//       });
//     }
//   });
//   ProductModel.deleteMany({ _id: { $in: deleteProductIds } })
//     .then((deleteResult) => {
//       console.log("Deleted:", deleteResult.deletedCount, "products");
//     })
//     .catch((deleteError) => {
//       console.log("Deletion error:", deleteError.message);
//     });

//   updateProducts.forEach((product) => {
//     ProductModel.findByIdAndUpdate(product._id, {
//       $set: { quantity: product.quantity },
//     })
//       .then((updateResult) => {
//         console.log("Updated:", updateResult);
//       })
//       .catch((updateError) => {
//         console.log("Update error:", updateError.message);
//       });
//   });
// };
