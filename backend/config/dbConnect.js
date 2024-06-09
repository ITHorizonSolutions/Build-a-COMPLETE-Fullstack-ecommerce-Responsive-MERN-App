const mongoose = require('mongoose')
require('dotenv').config()

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("connect to db")
    } catch (error) {
        console.log("error mongoose", error)
    }
}

module.exports = connectDB