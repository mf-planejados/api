const Product = require('../models/Products')
const FileProduct = require('../models/FileProduct')

exports.upload = async (req, res) => {
    const { originalName: name, size, key, location: url = '', } = req.file
    const { productId = null } = req.params

    let product_id = productId !== "new" ? productId : null

    const file = await FileProduct.create({
        name,
        size,
        url,
        key,
        productId: product_id
    })

    const updatedData = { $push: { files: file._id } };

    if (file?._id) {
        if (productId !== 'new' && productId !== '') {
            const updateProduct = await Product.findByIdAndUpdate(productId, updatedData, { new: true })
            return res.status(201).json({ file, updatedProduct: updateProduct?._id })
        }
        return res.status(201).json({ file })
    }
    res.status(500).json({})
}

exports.delete = async (req, res) => {

   const { fileId } = req.params;
   const { productId = null } = req.query;

   try {
      if (productId) {
         await Product.findByIdAndUpdate(productId, { $pull: { files: fileId } }, { new: true })
      }

      const response = await FileProduct.findByIdAndDelete(fileId)
      console.log(response)
      res.status(200).json(response)
   } catch (error) {
    console.log(error)
      res.status(500).json(error)
   }
}

exports.getFilesByCategory = async (req, res) => {

   try {
      const { categoryId } = req.params;
      const category = await CategoryHome.findById(categoryId).select('files')

      if (category._id) {
         const { files: categoryFiles } = category;
         const response = await File.find({ _id: { $in: categoryFiles } })
         res.status(200).json(response)
      }
   } catch (error) {
      res.status(500).json(error)
   }
}


exports.getAllFiles = async (req, res) => {

   try {
      const response = await CategoryHome.find().populate('files').select('files name')
      return res.status(200).json(response)
   } catch (error) {
      res.status(500).json(error)
   }
}
