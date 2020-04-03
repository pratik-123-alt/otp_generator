const express = require('express')
const mongoose = require('mongoose')
const app =express()
mongoose.connect("mongodb://localhost:27017/otp",{
    useNewUrlParser: true, 
     useUnifiedTopology: true 
},(error) =>{
if(!error) 
    {
     console.log("successto db connect")
    }
else
    {
    console.log("not successto db connect")
    }
 
})
