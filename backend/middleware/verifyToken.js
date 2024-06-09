const jwt = require('jsonwebtoken')


async function verifyToken(request,response,next){
    try {
        const token = request.cookies.token 

        console.log("token",token)

        const decoded = await jwt.verify(token,process.env.SECRET_KEY_TOKEN)

        if(!decoded){
            throw new Error("Login again")
        }

        request.userId = decoded.id 
        request.emailId = decoded.email

        next()
    } catch (error) {
        return response.json({
            message : error.message || "Invalid token",
            error : true,
            success : false
        })
    }
}

module.exports = verifyToken