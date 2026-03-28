const express = require('express');
const productController = require('./../controllers/productController');

const router = express.Router();

// add 
router.post('/add/',productController.addProduct);

// fetch 
router.get('/all/:status',productController.getAllProduct);
router.get('/:productId',productController.getSingleProductById);

// filter 
router.get('/size/:size/:status',productController.getFilterProduct);
router.get('/color/:color/:status',productController.getFilterProduct);
router.get('/brand/:brand/:status',productController.getFilterProduct);
router.get('/price/:maxPrice/:minPrice/:status',productController.getFilterProduct);
router.get('/search/:search/:status',productController.getFilterProduct);

// update 
router.patch('/updateStatus/:productId/:status',productController.updateProductDeleteStatus);
router.patch('/update/:productId',productController.updateProductData);

// delete 
router.delete('/delete/:productId',productController.deleteProductData);
router.delete('/delete',productController.deleteAllTrashPRoduct);

module.exports = router;