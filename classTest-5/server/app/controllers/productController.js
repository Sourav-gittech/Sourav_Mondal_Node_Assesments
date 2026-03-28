const cloudinary = require('cloudinary').v2;

const productModel = require("./../models/productModel");
const STATUS_CODE = require('../utils/statusCode');
const validateProduct = require('../utils/checkProductValidation');

class ProductController {

    async addProduct(req, res) {
        try {
            let product_img, product_img_url, productObj;

            const { name, description, category, price } = req.body;
            const loggedUser = req?.admin || req?.manager || req?.employee || req?.user;

            if (!name || !description || !category || !price) {
                await cloudinary.uploader.destroy(req.file.filename);

                return res.status(STATUS_CODE.BAD_GATEWAY).json({
                    success: false,
                    message: "All fields are required"
                });
            }

            if (!loggedUser) {
                await cloudinary.uploader.destroy(req.file.filename);

                return res.status(STATUS_CODE.NOT_FOUND).json({
                    success: false,
                    message: "Unauthorised access"
                });
            }

            const { data, error } = await validateProduct.validate({ name, description, category, price });
            if (error) {
                await cloudinary.uploader.destroy(req.file.filename);

                return res.status(STATUS_CODE.NOT_FOUND).json({
                    success: false,
                    message: error.details[0].message
                });
            }

            if (req.file) {
                product_img = req.file.filename;
                product_img_url = req.file.path;

                productObj = new productModel({ name, description, category, price, product_img, product_img_url });
            }
            else {
                productObj = new productModel({ name, description, category, price });
            }

            const product = await productObj.save();

            return res.status(STATUS_CODE.CREATED).json({
                success: true,
                message: "Product added successfully",
                data: product
            })
        }
        catch (err) {
            await cloudinary.uploader.destroy(req.file.filename);

            return res.status(STATUS_CODE.SERVER_ERROR).json({
                success: false,
                message: err.message
            });
        }
    }

    async getAllProducts(req, res) {
        try {
            const products = await productModel.find();

            return res.status(STATUS_CODE.OK).json({
                success: true,
                message: 'All available products',
                count: products.length,
                data: products
            })
        }
        catch (err) {
            return res.status(STATUS_CODE.SERVER_ERROR).json({
                success: false,
                message: err.message
            });
        }
    }

    async singleProductData(req, res) {
        try {
            const productId = req.params.productId;

            if (!productId) {
                return res.status(STATUS_CODE.NOT_FOUND).json({
                    success: false,
                    message: "Product ID is required"
                })
            }

            const product = await productModel.findById(productId);

            return res.status(STATUS_CODE.OK).json({
                success: true,
                message: "Single product details",
                data: product
            })
        }
        catch (err) {
            return res.status(STATUS_CODE.SERVER_ERROR).json({
                success: false,
                message: err.message
            });
        }
    }

    async updateProductDetails(req, res) {
        try {
            let product_img, product_img_url, updateObj = req.body;
            const productId = req.params.productId;

            const loggedUser = req?.admin || req?.manager || req?.user;

            if (!loggedUser) {
                if (req.file) await cloudinary.uploader.destroy(req.file.filename);

                return res.status(STATUS_CODE.NOT_FOUND).json({
                    success: false,
                    message: "Unauthorised access"
                });
            }

            if (req.file) {
                product_img = req.file.filename;
                product_img_url = req.file.path;

                updateObj = { ...updateObj, product_img, product_img_url };
            }

            const updateProduct = await productModel.findByIdAndUpdate(productId, updateObj, { name: true });

            return res.status(STATUS_CODE.OK).json({
                success: true,
                message: "Product updated successfully"
            })

        }
        catch (err) {
            if (req.file) await cloudinary.uploader.destroy(req.file.filename);

            return res.status(STATUS_CODE.SERVER_ERROR).json({
                success: false,
                message: err.message
            });
        }
    }

    async deleteProduct(req, res) {
        try {
            const productId = req.params.productId;

            const loggedUser = req?.admin;

            if (!loggedUser) {
                return res.status(STATUS_CODE.NOT_FOUND).json({
                    success: false,
                    message: "Unauthorised access"
                });
            }

            const product = await productModel.findById(productId);

            if (!product) {
                return res.status(STATUS_CODE.NOT_FOUND).json({
                    success: false,
                    message: "No product available"
                });
            }

            await cloudinary.uploader.destroy(product.product_img);

            await productModel.findByIdAndDelete(productId);

            return res.status(STATUS_CODE.OK).json({
                status: true,
                message: "Product deleted successfully"
            });
        }
        catch (err) {
            return res.status(STATUS_CODE.SERVER_ERROR).json({
                success: false,
                message: err.message
            });
        }
    }
}

module.exports = new ProductController();