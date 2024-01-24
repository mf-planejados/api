const Product = require('../models/Products')

class ProductController {

    list = async (req, res) => {
        try {
            const response = await Product.find().populate('files').exec();
            res.status(200).json(response)
        } catch (error) {
            res.status(400).json({ msg: 'Hello' })
        }
    }

    add = async (req, res) => {
        try {
            const { productData, filesProduct } = req.body;
            const response = await Product.create(productData)

            if (filesProduct?.length > 0) {
                const updatedData = { $push: { files: filesProduct } };
                const updatedProduct = await Product.findByIdAndUpdate(response._id, updatedData, { new: true });
                res.status(201).json(updatedProduct);
            } else {
                res.status(201).json(response);
            }
        } catch (err) {
            res.status(400).json({ success: false, error: err.response })
        }
    }

    readById = async (req, res) => {
        try {
            const { productId } = req.params
            const response = await Product.findById(productId).populate('files').exec()
            res.status(200).json(response)
        } catch (error) {
            res.status(400).json({ success: false, error: error.response })
        }
    }

    update = async (req, res) => {
        try {
            const { productId } = req.params
            const { productData } = req.body
            const response = await Product.findByIdAndUpdate(productId, productData, { new: true }).exec()
            res.status(200).json(response)
        } catch (error) {
            res.status(400).json({ error })
        }
    }

    delete = async (req, res) => {
        try {
            const { productId } = req.params
            const response = await Product.findByIdAndDelete(productId).exec()

            res.status(200).json(response)
        } catch (error) {
            res.status(400).json({ error })
        }
    }


}

module.exports = new ProductController()