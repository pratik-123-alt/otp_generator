const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require("dotenv").config()
const userschema = mongoose.Schema({
    name: {
        type :String,
        required :true
    },
    password : {
        type : String,
        required :true
    },
    email:{
        type:String,
        required :true
    }
})

userschema.pre('save', async function (callback) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    callback()
})


const User = mongoose.model('User',userschema)


module.exports = User



