const jwt = require("jsonwebtoken")
const UserModel = require("../model/user.model")
const bcryptjs = require('bcryptjs')

async function loginController(request,response){
    try {
        const { email, password } = request.body

        const isExitsUser = await UserModel.findOne({ email })

        if(!isExitsUser){
            return response.status(400).json({
                message : "Email is not available",
                success : false,
                error : true
            })
        }

        const checkPassword = await bcryptjs.compare(password,isExitsUser.password)

        if(!checkPassword){
            return response.status(400).json({
                message : "Check your password",
                error : true,
                success : false
            })
        }

        const tokenData = {
            id : isExitsUser._id,
            email : isExitsUser.email
        }

        const token = await jwt.sign(tokenData,process.env.SECRET_KEY_TOKEN,{ expiresIn : '1d'})

        const option = {
            httpOnly : true,
            secure : true,
            sameSite : 'None'
        }

        return response.cookie('token',token,option).json({
            message : "login successfully",
            token : token,
            success : true,
            error : false
        })


    } catch (error) {
        return response.status(500).json({
            message : error.message,
            error : true,
            success : false
        })
    }
}

module.exports = loginController