const BudgetModels = require('../models/Budget')
const sgMail = require('@sendgrid/mail')

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

         let html = `
         <div style="background-color: #f1f1f1; padding: 30px; position: relative;">
            <div style="max-width: 400px; background-color: #fff; padding: 30px; border-radius: 12px; position: absolute; margin: auto; left: 0; right: 0; top: 0; bottom: 0;">
            <p style="font-size: 18px; text-align: center;">Nome: ${budget?.name},</p>  
            <p style="font-size: 18px; text-align: center;">E-mail: ${budget?.email},</p>  
            <p style="font-size: 18px; text-align: center;">Contato: ${budget?.telephone},</p>
            <p style="font-size: 18px;">Menssagem:</p>
            <p style="font-size: 18px;">${budget?.message}</p>
            <p style="font-size: 18px; text-align: center;">Acesse o painel M&F Admin para analisar o orçamento:</p>
            <p style="font-size: 18px;">https://admin-mfplanejados.vercel.app/</p>
            </div>
         </div>`

         sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

         const msg = {
            to: 'marcusvini6277@gmail.com, edermarce1@yahoo.com.br',
            from: budget?.email,
            subject: budget?.subject,
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