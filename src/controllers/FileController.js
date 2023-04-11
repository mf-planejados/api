const CategoryHome = require('../models/CategoryHome')
const File = require('../models/Files')

exports.upload = async (req, res) => {
   const { originalName: name, size, key, location: url = '', } = req.file

   const { category = null, categoryId = null } = req.params

   const file = await File.create({
      name,
      size,
      url,
      key,
      category
   })

   const updatedData = { $push: { files: file._id } };

   if (file?._id) {
      if (categoryId) {
         const updatedComodo = await CategoryHome.findByIdAndUpdate(categoryId, updatedData, { new: true })
         return res.status(201).json({ file, updatedComodo: updatedComodo?._id })
      }
      return res.status(201).json({ file })
   }
   res.status(500).json({})
}

exports.delete = async (req, res) => {

   const { fileId: _id } = req.params;
   const { categoryId = null } = req.query;

   try {
      if (categoryId) {
         const updatedcCategoryFiles = await CategoryHome.findByIdAndUpdate(categoryId, { $pull: { files: _id } }, { new: true })
      }

      const response = await File.findByIdAndDelete(_id)
      res.status(200).json(response)
   } catch (error) {
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
      console.log(response)
      return res.status(200).json(response)
   } catch (error) {
      res.status(500).json(error)
   }
}

exports.getAllFilesWeb = async (req, res) => {
   try {
      const response = await File.find()
      console.log(response)
      return res.status(200).json(response)
   } catch (error) {
      res.status(500).json(error)
   }
}