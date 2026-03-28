const express = require('express');

const productController = require("./../controllers/productController");
const checkAuth = require('../middleware/checkAuth');
const Upload = require('../utils/uploadProductImage');

const router = express.Router();

router.get('/', productController.getAllProduct);
router.get('/:productId', productController.getSingleProduct);

router.use(checkAuth);
router.post('/', Upload.single("product-img"), productController.addProduct);
router.put('/:productId', Upload.single("product-img"), productController.updateProduct);
router.delete('/delete/:productId', productController.deleteProduct);

module.exports = router;