const CategoryHomeModels = require('../models/CategoryHome')

class CategoryHome {

   list = async (req, res) => {
      try {
         const response = await CategoryHomeModels.find().exec()
         res.status(200).json(response)
      } catch (error) {
         res.status(400).json({ msg: 'Hello Orçamento' })
      }
   }

   add = async (req, res) => {
      try {
         const { comodo } = req.body;
         const response = await CategoryHomeModels.create(comodo)
         res.status(201).json(response)
      } catch (err) {
         res.status(400).json({ success: false, error: err.response })
      }
   }

   readById = async (req, res) => {
      try {
         const { comodo } = req.params
         const response = await CategoryHomeModels.findById(comodo).exec()

         res.status(200).json(response)
      } catch (error) {
         res.status(400).json({ success: false, error: error.response })
      }
   }

   update = async (req, res) => {
      try {
         const { comodoId } = req.params
         const { comodo } = req.body
         const response = await CategoryHomeModels.findByIdAndUpdate(comodoId, comodo, { new: true }).exec()
         res.status(200).json(response)
      } catch (error) {
         res.status(400).json({ error })
      }
   }

   delete = async (req, res) => {
      try {
         const { comodoId } = req.params
         const response = await CategoryHomeModels.findByIdAndDelete(comodoId).exec()

         res.status(200).json(response)
      } catch (error) {
         res.status(400).json({ error })
      }
   }


}

module.exports = new CategoryHome()