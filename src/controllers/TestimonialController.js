const Testimonial = require('../models/Testimonial')

class TestimonialController {

    list = async (req, res) => {
        try {
            const testimonials = await Testimonial.find().exec()
            console.log(testimonials)
            res.status(201).json(testimonials)
        } catch (error) {
            res.status(200).json({ msg: 'Hello MF Planejados!' })
        }
    }

    add = async (req, res) => {

        try {
            const { testimonialData } = req.body
            const response = await Testimonial.create(testimonialData)
            console.log(response)
            res.status(201).json(response)
        } catch (error) {
            res.status(500).json({ error: error.response })
        }
    }

    readById = async (req, res) => {
        try {
            const { testimonialId } = req.params
            const testimonial = await Testimonial.findById(testimonialId)

            console.log(testimonial)
            res.status(200).json(testimonial)
        } catch (error) {
            res.status(200).json({ error })
        }
    }

    delete = async (req, res) => {
        try {
            const { testimonialId } = req.params
            const testimonialDelete = await Testimonial.findByIdAndDelete(testimonialId).exec()
            res.status(201).json(testimonialDelete)
        } catch (error) {
            res.status(400).json({ error })
        }
    }

    update = async (req, res) => {
        try {
            const { testimonialId } = req.params
            const { testimonialData } = req.body

            const response = await Testimonial.findByIdAndUpdate(testimonialId, testimonialData, { new: true, runValidators: true }).exec()

            res.status(200).json(response)
        } catch (error) {
            res.status(400).json({ error })
        }
    }
}

module.exports = new TestimonialController()