const CategoryHome = require('../models/CategoryHome')
const File = require('../models/Files')

exports.upload = async (req, res) => {
   const { originalName: name, size, key, location: url = '', } = req.file

   const { categoryId = null, section = null, namePerfil = null, level = null } = req.params

   const response = await CategoryHome.findById(categoryId)

   let category = response?.name

   const file = await File.create({
      name,
      size,
      url,
      key,
      category,
      section,
      namePerfil,
      level
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

exports.getFilesBySection = async (req, res) => {

   const { section = '' } = req.query
   console.log('section', section)

   try {

      // const response = await CategoryHome.find().populate('files').select('files name')
      const response = await CategoryHome.aggregate([
         {
            $lookup: {
               from: 'files',
               localField: 'files',
               foreignField: '_id',
               as: 'file'
            }
         },
         {
            $unwind: '$file'
         },
         {
            $match: {
               'file.section': section // aqui você deve substituir 'section' pelo valor desejado
            }
         },
         {
            $group: {
               _id: '$file.section',
               files: { $push: '$file' }
            }
         }
      ])
      // const arquivos = response.map(categoria => {
      //    return categoria.files.filter(file => file.section == section);
      // });
      console.log(response)
      return res.status(201).json(response)
   } catch (error) {
      res.status(500).json(error)
   }
}