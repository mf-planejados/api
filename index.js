require('dotenv').config()
const express = require('express')
// const routes = require('./src/routes')
const mongoose = require('mongoose')
const cors = require('cors')
// const routes = require('express').Router()
const UserController = require('./src/controllers/UserController')
const FileController = require('./src/controllers/FileController')
const BudgetController = require('./src/controllers/BudgetController')
const { checkAuth } = require('./src/helpers/auth/checkAuth')
const multer = require('multer')
const multerConfig = require('./src/config/multer')
const CategoryHomeController = require('./src/controllers/CategoryHomeController')
const app = express()

app.use(express.json())
app.use(cors())

const port = process.env.PORT || 3000

//User Routes
// app.get('/', async (req, res) => {
//    return res.status(200).send({ msg: 'Public Route' })
// })
app.post('/user/login', UserController.login)
app.get('/user/list', checkAuth, UserController.list)
app.post('/user', checkAuth, UserController.add)
app.get('/user/:id', checkAuth, UserController.readById)
app.post('/user/loginbytoken', checkAuth, UserController.loginByToken)
app.delete('/user/:id', checkAuth, UserController.delete)
app.patch('/user/:id', checkAuth, UserController.update)
app.patch('/user/password/:id', checkAuth, UserController.updatePassword)

// //File app
app.get('/files', checkAuth, FileController.getAllFiles)
app.get('/filesweb', checkAuth, FileController.getAllFilesWeb)
app.get('/files/:categoryId', checkAuth, FileController.getFilesByCategory)
app.post('/upload/:categoryId/:category', multer(multerConfig).single('file'), FileController.upload)
app.delete('/upload/:fileId', checkAuth, FileController.delete)

//Budget app
app.get('/budget', checkAuth, BudgetController.list)
app.get('/budget/:budgetId', checkAuth, BudgetController.readById)
app.post('/budget', BudgetController.add)
app.delete('/budget/:budgetId', checkAuth, BudgetController.delete)
app.patch('/budget/:budgetId', checkAuth, BudgetController.update)

//CategoryHome app
app.get('/category', checkAuth, CategoryHomeController.list)
app.post('/category', checkAuth, CategoryHomeController.add)
app.delete('/category/:id', checkAuth, CategoryHomeController.delete)
app.patch('/category/:id', checkAuth, CategoryHomeController.update)



mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL).then(res => {
   console.log('Connected to DB')
}).catch(err => {
   console.log('ERRO:', err.errors)
})

mongoose.Promise = global.Promise

app.listen(port, () => {
   console.log(`API on port ${port}`)
})