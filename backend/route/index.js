const express = require('express')

const registerController = require('../controller/register.controller')
const loginController = require('../controller/login.controller')
const logoutController = require('../controller/logout.controller')
const userDetails = require('../controller/userDetails.controller')
const verifyToken = require('../middleware/verifyToken')
const uploadProduct = require('../controller/upload.controller')
const productcontroller = require('../controller/product.controller')

const Router = express.Router()


Router.post("/register",registerController)
Router.post('/login',loginController)
Router.get("/logout",logoutController)
Router.get('/user-details',verifyToken,userDetails)
Router.post('/upload-product',verifyToken,uploadProduct)
Router.get('/product',productcontroller)

module.exports = Router