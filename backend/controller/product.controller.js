const ProductModel = require("../model/uploadproduct.model")

async function productcontroller(request,response){
    try {
        const product = await ProductModel.find().sort({ createdAt : -1 })

        return response.json({
            data : product,
            message : "product list",
            success : true
        })
    } catch (error) {
        response.json({
            message : error.message,
            error : true,
            success : false
        })
    }
}

module.exports = productcontroller