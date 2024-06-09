async function logoutController(request,response){
    const option = {
        httpOnly : true,
        secure : true,
        sameSite : 'None'
    }
    return response.cookie("token","",option).json({
        message : "Logout successfully",
        error : false,
        success : true,
        logout : true
    })
}

module.exports = logoutController