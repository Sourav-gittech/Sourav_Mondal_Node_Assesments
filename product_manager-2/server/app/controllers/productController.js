const productModel = require('./../models/productModel');

class ProductController {
    async addProduct(req, res) {
        try {
            const { name, price, size, color, brand, description, image } = req.body;

            const productObj = new productModel({ name, price, size, color, brand, description, image, isDeleted: false });
            const productData = await productObj.save();

            return res.status(201).json({
                status: true,
                message: "product added successfully",
                data: productData
            })
        }
        catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message
            })
        }
    }

    async getAllProduct(req, res) {
        try {
            const isDeleted = req.params.status === "true";
            const allProduct = await productModel.find({ isDeleted });

            return res.status(200).json({
                status: true,
                message: 'All available data',
                count: allProduct.length,
                data: allProduct
            })
        }
        catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message
            })
        }
    }

    async getSingleProductById(req, res) {
        try {
            const productId = req.params.productId;
            const product = await productModel.findById(productId);

            return res.status(200).json({
                status: true,
                message: "Single product data",
                data: product
            })
        }
        catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message
            })
        }
    }

    async getFilterProduct(req, res) {
        try {
            const { size, color, brand, minPrice, maxPrice, search, status } = req.params;
            const isDeleted = status === "true";

            let filterProduct;

            if (size) {
                const allProducts = await productModel.find({ isDeleted });
                filterProduct = allProducts.filter(product => product.size.includes(size));
            }
            if (color) {
                const allProducts = await productModel.find({ isDeleted });
                filterProduct = allProducts.filter(product => product.color.includes(color));
            }
            if (brand) {
                const filterBrandProduct = await productModel.find({ brand });
                filterProduct = filterBrandProduct.filter(product => product.isDeleted == isDeleted);
            }
            if (minPrice && maxPrice) {
                const filterPriceProduct = await productModel.find({ price: { $gte: minPrice, $lte: maxPrice } });
                filterProduct = filterPriceProduct.filter(product => product.isDeleted == isDeleted);
            }
            if (search) {
                const searchItems = search.toLowerCase();
                const allProducts = await productModel.find({ isDeleted });
                filterProduct = allProducts.filter(product => product.name.toLowerCase().includes(searchItems) || product.brand.toLowerCase().includes(searchItems) || product.price == search);
            }
            return res.status(200).json({
                status: true,
                message: 'Filter product',
                total: filterProduct.length,
                data: filterProduct
            })
        }
        catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message
            })
        }
    }

    async updateProductData(req, res) {
        try {
            const productId = req.params.productId;
            const updatedProduct = await productModel.findByIdAndUpdate(productId, req.body, { new: true });

            return res.status(200).json({
                status: true,
                message: "Product updated successfully"
            })
        }
        catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message
            })
        }
    }

    async updateProductDeleteStatus(req, res) {
        try {
            const productId = req.params.productId;
            const isDeleted = req.params.status === "true";

            const updatedProduct = await productModel.findByIdAndUpdate(productId, { isDeleted }, { new: true });

            return res.status(200).json({
                status: true,
                message: `Product ${isDeleted ? 'moved to' : 'recovered form'} trash successfully`
            })
        }
        catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message
            })
        }
    }

    async deleteProductData(req, res) {
        try {
            const productId = req.params.productId;
            await productModel.findByIdAndDelete(productId);

            return res.status(200).json({
                status: true,
                message: 'Data deleted successfully'
            })
        }
        catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message
            })
        }
    }

    async deleteAllTrashPRoduct(req, res) {
        try {
            await productModel.deleteMany({ isDeleted: true });
            return res.status(200).json({
                status: true,
                message: 'Trash data deleted successfully'
            })
        }
        catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message
            })
        }
    }
}

module.exports = new ProductController();