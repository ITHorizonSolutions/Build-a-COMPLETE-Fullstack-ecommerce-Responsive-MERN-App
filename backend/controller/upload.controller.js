const ProductModel = require("../model/uploadproduct.model")

const uploadProduct = async(request,response)=>{
    try {
       const  {  name ,description ,price, category , image  } = request.body
        
       const emailId = request.emailId 

       if(emailId !== process.env.ADMIN_EMAIL){
            return response.json({
                message : "permission denied",
                success : true
            })
       }

       const product = new ProductModel({
            name,
            description,
            price,
            category,
            image
       })
       await product.save()

       return response.json({
            message : "Product Uploaded successfully",
            success : true,
            error : false
       })
        
    } catch (error) {
        return response.json({
            message : error.message,
            error : true,
            success : false
        })
    }
}

module.exports = uploadProduct

