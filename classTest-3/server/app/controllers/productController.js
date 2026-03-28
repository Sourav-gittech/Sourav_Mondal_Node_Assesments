const cloudinary = require("cloudinary");

const STATUS_CODE = require("../utils/statusCode");
const productModel = require("./../model/productModel");
const checkProductValidation = require("../utils/checkProductValidation");

class ProductController {

    async addProduct(req, res) {
        try {
            let product_img_url, product_img;
            const { name, description, category, price } = req.body;
            const userType = req.user?.role;

            if (!name || !description || !category || !price) {
                await cloudinary.uploader.destroy(req.file.filename);

                return res.status(STATUS_CODE.NOT_FOUND).json({
                    succes: false,
                    message: "All fields required"
                })
            }

            if (!userType) {
                await cloudinary.uploader.destroy(req.file.filename);

                return res.status(STATUS_CODE.UNAUTHORISED).json({
                    succes: false,
                    message: "Unauthorised access"
                })
            }
            else {
                const { data, error } = checkProductValidation.validate({ name, description, category, price });
                if (error) {
                    await cloudinary.uploader.destroy(req.file.filename);

                    return res.status(STATUS_CODE.BAD_REQUEST).json({
                        succes: false,
                        message: error?.details[0]?.message
                    })
                }
                let productObj;

                if (req.file) {
                    product_img_url = req.file.path;
                    product_img = req.file.filename;

                    productObj = new productModel({ name, description, category, price, product_img, product_img_url });
                }
                else {
                    productObj = new productModel({ name, description, category, price });
                }

                const product = await productObj.save();

                return res.status(STATUS_CODE.CREATED).json({
                    succes: true,
                    message: "Product added successfully",
                    data: product
                })
            }
        }
        catch (err) {
            return res.status(STATUS_CODE.SERVER_ERROR).json({
                succes: false,
                message: err.message
            })
        }
    }

    async getAllProduct(req, res) {
        try {
            const products = await productModel.find();

            return res.status(STATUS_CODE.OK).json({
                success: true,
                message: "All available products",
                count: products.length,
                data: products
            })
        }
        catch (err) {
            return res.status(STATUS_CODE.SERVER_ERROR).json({
                succes: false,
                message: err.message
            })
        }
    }

    async getSingleProduct(req, res) {
        try {
            const productId = req.params.productId;
            const product = await productModel.findById(productId);

            return res.status(STATUS_CODE.OK).json({
                success: true,
                message: "Available product details",
                data: product
            })
        }
        catch (err) {
            return res.status(STATUS_CODE.SERVER_ERROR).json({
                succes: false,
                message: err.message
            })
        }
    }

    async updateProduct(req, res) {
        try {
            let product_img_url, product_img, updatedProductObj;
            const { name, description, category, price } = req.body;

            const productId = req.params.productId;
            // console.log('User', req.user.role)

            if (!req?.user) {
                if (req.file) {
                    await cloudinary.uploader.destroy(req.file.filename);
                }
                return res.status(STATUS_CODE.UNAUTHORISED).json({
                    succes: false,
                    message: "Unauthorised access"
                })
            }
            else if (req?.user && (req?.user?.role == 'manager' || req?.user?.role == 'admin')) {
                const existingProductDetails = await productModel.findById(productId);
                if (!existingProductDetails) {
                    if (req.file) {
                        await cloudinary.uploader.destroy(req.file.filename);
                    }
                    return res.status(STATUS_CODE.NOT_FOUND).json({
                        succes: false,
                        message: "No product available"
                    })
                }
                else {
                    updatedProductObj = req.body;

                    if (req.file) {
                        await cloudinary.uploader.destroy(existingProductDetails.product_img);

                        product_img_url = req.file.path;
                        product_img = req.file.filename;

                        updatedProductObj = { ...updatedProductObj, product_img, product_img_url };
                    }
                    const updateProduct = await productModel.findByIdAndUpdate(productId, updatedProductObj, { new: true });
                    return res.status(STATUS_CODE.OK).json({
                        succes: true,
                        message: "product updated successfully"
                    })
                }
            }
            else {
                if (req.file) {
                    await cloudinary.uploader.destroy(req.file.filename);
                }
                return res.status(STATUS_CODE.UNAUTHORISED).json({
                    succes: false,
                    message: "Unauthorised access"
                })
            }
        }
        catch (err) {
            if (req.file) {
                await cloudinary.uploader.destroy(req.file.filename);
            }
            return res.status(STATUS_CODE.SERVER_ERROR).json({
                succes: false,
                message: err.message
            })
        }
    }

    async deleteProduct(req, res) {
        try {
            const productId = req.params.productId;
            if (!productId) {
                return res.status(STATUS_CODE.NOT_FOUND).json({
                    succes: false,
                    message: 'Product ID not found'
                })
            }
            const product = await productModel.findById(productId);

            if (!product) {
                return res.status(STATUS_CODE.NOT_FOUND).json({
                    succes: false,
                    message: 'Product not available'
                })
            }
            else if (!req?.user) {
                return res.status(STATUS_CODE.UNAUTHORISED).json({
                    succes: false,
                    message: "Unauthorised access"
                })
            }
            else {
                if (req?.user && req?.user?.role != 'admin') {

                    return res.status(STATUS_CODE.UNAUTHORISED).json({
                        succes: false,
                        message: "Unauthorised access"
                    })
                }
                else {
                    await cloudinary.uploader.destroy(product.product_img);
                    await productModel.findByIdAndDelete(productId);

                    return res.status(STATUS_CODE.OK).json({
                        succes: true,
                        message: "Product deleted successfully"
                    })
                }
            }
        }
        catch (err) {
            return res.status(STATUS_CODE.SERVER_ERROR).json({
                succes: false,
                message: err.message
            })
        }
    }
}

module.exports = new ProductController();