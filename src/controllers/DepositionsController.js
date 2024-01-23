const Depositions = require('../models/Depositions')

class DepositionController {

    list = async (req, res) => {
        try {
            const depositions = await Depositions.find().exec()
            res.status(201).json(depositions)
        } catch (error) {
            res.status(200).json({ msg: 'Hello MF Planejados!' })
        }
    }

    add = async (req, res) => {

        try {
            const { depositionData } = req.body
            const response = await Depositions.create(depositionData)
            console.log(response)
            res.status(201).json(response)
        } catch (error) {
            res.status(500).json({ error: error.response })
        }
    }

    readById = async (req, res) => {
        try {
            const { id } = req.params

            const deposition = await Depositions.findById(id)
            res.status(200).json(deposition)
        } catch (error) {
            res.status(200).json({ error })
        }
    }

    delete = async (req, res) => {
        try {
            const { id } = req.params
            const depositionDelete = await Depositions.findByIdAndDelete(id).exec()
            res.status(201).json(depositionDelete)
        } catch (error) {
            res.status(400).json({ error })
        }
    }

    update = async (req, res) => {
        try {
            const { id } = req.params
            const { depositionData } = req.body

            const response = await Depositions.findByIdAndUpdate(id, depositionData, { new: true, runValidators: true }).exec()

            res.status(200).json(response)
        } catch (error) {
            res.status(400).json({ error })
        }
    }
}

module.exports = new DepositionController()