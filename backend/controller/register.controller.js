const UserModel = require('../model/user.model')
const bcryptjs = require('bcryptjs')

const registerController = async(request,response)=>{
    try {
        const { name, email, password } = request.body

        const exitsUser = await UserModel.findOne({ email : email })

        if(exitsUser){
            return response.status(400).json({
                message : "user already exits",
                success : false,
                error : true
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password,salt)

        const payload = {
            name,
            email,
            password : hashPassword
        }

        const user = new UserModel(payload)
        await user.save()

        return response.status(201).json({
            message : 'User Created Successfully',
            success : true,
            error : false
        })
    } catch (error) {
        response.status(500).json({
            message : "Something are wrong!!",
            error : true,
            success : false
        })
    }
}

module.exports = registerController