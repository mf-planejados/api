const BudgetModels = require('../models/Budget')
const sgMail = require('@sendgrid/mail')
const { budgetHtml } = require('../ultilis/htmlEmails/sendBudget')

class CompanyController {

   list = async (req, res) => {
      try {
         const response = await BudgetModels.find().exec()
         res.status(200).json(response)
      } catch (error) {
         res.status(400).json({ msg: 'Hello Orçamento' })
      }
   }

   add = async (req, res) => {
      try {
         const { budget } = req.body;
         const response = await BudgetModels.create(budget)

         let html = await budgetHtml(budget)

         sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

         const msg = {
            to: ['edermarce1@yahoo.com.br', 'marcusvini6277@gmail.com'],
            from: budget?.email,
            subject: 'Orçamento - Contato via site',
            html
         };

         sgMail.send(msg, () => console.log({
            message: `Orçamento enviado: ${budget?.email}`,
         }));

         res.status(201).json(response)
      } catch (err) {
         res.status(400).json({ success: false, error: err.response })
      }
   }

   readById = async (req, res) => {
      try {
         const { budgetId } = req.params
         const response = await BudgetModels.findById(budgetId).exec()

         res.status(200).json(response)
      } catch (error) {
         res.status(400).json({ success: false, error: error.response })
      }
   }

   update = async (req, res) => {
      try {
         const { budgetId } = req.params
         const { budget } = req.body
         const response = await BudgetModels.findByIdAndUpdate(budgetId, budget, { new: true }).exec()
         res.status(200).json(response)
      } catch (error) {
         res.status(400).json({ error })
      }
   }

   delete = async (req, res) => {
      try {
         const { budgetId } = req.params
         const response = await BudgetModels.findByIdAndDelete(budgetId).exec()
         res.status(201).json(response)
      } catch (error) {
         res.status(400).json({ error })
      }
   }


}

module.exports = new CompanyController()