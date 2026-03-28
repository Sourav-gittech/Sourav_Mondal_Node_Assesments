const express = require("express");

const productController = require("./../controllers/productController");
const Upload = require("../utils/cloudinaryUpload");

const checkAdmin = require("../middleware/checkAdmin");
const checkManager = require("../middleware/checkManager");
const checkEmployee = require("../middleware/checkEmployee");
const checkUserRole = require("../middleware/checkUserRole");

const router = express.Router();

router.post('/addProduct', Upload.single('product-img'), checkUserRole(["admin", "manager", "employee"]), productController.addProduct);
router.get('/all', productController.getAllProducts);
router.get('/fetch/:productId', productController.singleProductData);
router.put('/updateProduct/:productId', Upload.single('product-img'), checkUserRole(["admin", "manager"]), productController.updateProductDetails);
router.delete('/deleteProduct/:productId', checkAdmin, productController.deleteProduct);

module.exports = router;