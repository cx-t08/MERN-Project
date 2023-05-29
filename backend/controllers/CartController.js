const CartModel = require("../models/CartModel");

//read task
module.exports.getCart = async (req, res) => {
  const tasks = await CartModel.find();
  res.send(tasks);
  // console.log(tasks);
};

//create task
module.exports.saveCart = (req, res) => {
  const { task } = req.body;
  CartModel.create(task)
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
module.exports.updateCart = (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  // Find the customer's cart
  CartModel.findOne({ _id: id })
    .then((cart) => {
      if (!cart) {
        // If the cart doesn't exist, you can create a new cart here or handle it as per your application logic
        throw new Error("Cart not found");
      }

      const newProduct = task.products;

      // Find the index of the existing product based on product_id
      const existingProductIndex = cart.products.findIndex(
        (product) => product.product_id === newProduct.product_id
      );

      if (existingProductIndex !== -1) {
        // If the product exists, update its details
        cart.products[existingProductIndex] = newProduct;
      } else {
        // If the product doesn't exist, add it to the products array
        cart.products.push(newProduct);
      }

      // Save the updated cart
      return cart.save();
    })
    .then((updatedCart) => {
      console.log("Updated");
      res.status(201).send(updatedCart);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Not Updated");
    });
};

// delete tasks
module.exports.deleteCart = (req, res) => {
  const { id, productId } = req.params;

  CartModel.findByIdAndUpdate(id, { $pull: { products: { _id: productId } } })
    .then((data) => {
      console.log("Deleted");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err.message);
      res.send("Not deleted");
    });
};

//delete all tasks
module.exports.deleteAllCarts = (req, res) => {
  const { id } = req.params;

  CartModel.findByIdAndUpdate(id, { $set: { products: [] } })
    .then(() => {
      console.log("All Products Deleted for Cart:", id);
      res.status(201).send("All products deleted successfully");
    })
    .catch((err) => {
      console.error("Error deleting products:", err.message);
      res.status(500).send("Error deleting products");
    });
};
