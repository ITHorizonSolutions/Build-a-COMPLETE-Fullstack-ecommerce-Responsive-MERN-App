const UserModel = require("../model/user.model")

async function userDetails(request,response){
    
    const userId = request.userId

    const user = await UserModel.findById(userId).select('-password')

    return response.json({
        message : "user details",
        data : user,
        success : true,
        error : false
    })
}

module.exports = userDetails