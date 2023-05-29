const { Router } = require("express");
const router = Router();

const { getAdmin } = require("../controllers/AdminController");
router.get("/getAdmin", getAdmin);

const {
  getCustomer,
  saveCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/CustomerController");
router.get("/get", getCustomer);
router.get("/get/:id", getCustomer);
router.post("/save", saveCustomer);
router.put("/update/:id/", updateCustomer);
router.delete("/delete/:id", deleteCustomer);

const {
  getCategory,
  saveCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/CategoryController");
router.get("/getcategory", getCategory);
router.post("/savecategory", saveCategory);
router.put("/updatecategory/:id/", updateCategory);
router.delete("/deletecategory/:id", deleteCategory);

const {
  getSubCategory,
  saveSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("../controllers/SubCategoryController");
router.get("/getsubcategory", getSubCategory);
router.post("/savesubcategory", saveSubCategory);
router.put("/updatesubcategory/:id/", updateSubCategory);
router.delete("/deletesubcategory/:id", deleteSubCategory);

const {
  getColor,
  saveColor,
  updateColor,
  deleteColor,
} = require("../controllers/ColorController");
router.get("/getcolor", getColor);
router.post("/savecolor", saveColor);
router.put("/updatecolor/:id/", updateColor);
router.delete("/deletecolor/:id", deleteColor);

const {
  getSize,
  saveSize,
  updateSize,
  deleteSize,
} = require("../controllers/SizeController");
router.get("/getsize", getSize);
router.post("/savesize", saveSize);
router.put("/updatesize/:id/", updateSize);
router.delete("/deletesize/:id", deleteSize);

const {
  getProduct,
  saveProduct,
  updateProduct,
  deleteProduct,
  deleteMultipleProducts,
} = require("../controllers/ProductController");
router.get("/getProduct", getProduct);
router.post("/saveProduct", saveProduct);
router.put("/updateProduct/:id/", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);
router.delete("/deleteMultipleProducts/:id", deleteMultipleProducts);

const {
  getProductDescription,
  saveProductDescription,
  updateProductDescription,
  deleteProductDescription,
} = require("../controllers/ProductDescriptionController");
router.get("/getProductDescription", getProductDescription);
router.post("/saveProductDescription", saveProductDescription);
router.put("/updateProductDescription/:id/", updateProductDescription);
router.delete("/deleteProductDescription/:id", deleteProductDescription);

const {
  getCart,
  saveCart,
  updateCart,
  deleteCart,
  deleteAllCarts,
} = require("../controllers/CartController");
router.get("/getCart/:id", getCart);
router.post("/saveCart", saveCart);
router.put("/updateCart/:id/", updateCart);
router.delete("/deleteCart/:id/:productId", deleteCart);
router.delete("/deleteAllCart/:id", deleteAllCarts);

const {
  getOrder,
  saveOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/OrderController");
router.get("/getOrder/:id", getOrder);
router.post("/saveOrder/:id", saveOrder);
router.put("/updateOrder/:id/", updateOrder);
router.delete("/deleteOrder/:id", deleteOrder);

const {
  getOrderHistory,
  saveOrderHistory,
  updateOrderHistory,
} = require("../controllers/OrderHistoryController");
router.get("/getOrderHistory", getOrderHistory);
router.post("/saveOrderHistory", saveOrderHistory);
router.put("/updateOrderHistory/:id", updateOrderHistory);

module.exports = router;
