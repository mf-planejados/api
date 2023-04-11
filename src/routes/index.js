const routes = require('express').Router()
const UserController = require('../controllers/UserController')
const FileController = require('../controllers/FileController')
const BudgetController = require('../controllers/BudgetController')
const { checkAuth } = require('../helpers/auth/checkAuth')
const multer = require('multer')
const multerConfig = require('../config/multer')
const CategoryHomeController = require('../controllers/CategoryHomeController')

//User Routes
routes.get('/user/list', checkAuth, UserController.list)
routes.post('/user', checkAuth, UserController.add)
routes.get('/user/:id', checkAuth, UserController.readById)
routes.post('/user/login', UserController.login)
routes.post('/user/loginbytoken', checkAuth, UserController.loginByToken)
routes.delete('/user/:id', checkAuth, UserController.delete)
routes.patch('/user/:id', checkAuth, UserController.update)
routes.patch('/user/password/:id', checkAuth, UserController.updatePassword)

// //File Routes
routes.get('/files', FileController.getAllFiles)
routes.get('/files/:categoryId', FileController.getFilesByCategory)
routes.post('/upload/:categoryId/:category', multer(multerConfig).single('file'), FileController.upload)
routes.delete('/upload/:fileId', FileController.delete)

//Budget Routes
routes.get('/orçamento', checkAuth, BudgetController.list)
routes.post('/orçamento', BudgetController.add)
routes.delete('/orçamento/:id', checkAuth, BudgetController.delete)
routes.patch('/orçamento/:id', checkAuth, BudgetController.update)

//CategoryHome Routes
routes.get('/category', checkAuth, CategoryHomeController.list)
routes.post('/category', checkAuth, CategoryHomeController.add)
routes.delete('/category/:id', checkAuth, CategoryHomeController.delete)
routes.patch('/category/:id', checkAuth, CategoryHomeController.update)

module.exports = routes 
