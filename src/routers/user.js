const generateOtp = require('../middleware/generateOtp');
const express =require('express')
const app =express()
const router = new express.Router()
const bcrypt = require('bcryptjs')
const User =require('../models/userModel')
const jwt = require('jsonwebtoken')
var otpGenerator = require('otp-generator')
 


require("dotenv").config()
//insert data to database
router.post('/register', async (req, res) => {
    const user = new User(req.body)
    const email = req.body.email;
    generateOtp(email);
    try {
       
       
        await user.save()
        res.send(user)
        res.status(200).send()
        
    } catch {
        res.status(400).send()
    }
})



//read data from database
router.get('/register',async(req,res)=>{
try{
    const post= await User.find({})
    res.send(post)
    }catch{
        res.status(500).send()
    }
})
//delete data from database
router.delete('/register/:id',async(req,res)=>{
    try{
        const post= await User.findOne({_id:req.params.id})
        await User.remove({_id:post})
        res.send(post)
        res.status(200).send()
        }catch{
            res.status(500).send()
        }
    })
    ///update but not properly its first search and then delete and then inter 
    router.put('/register/:id',async(req,res)=>{
        
            const post= await User.findOne({_id:req.params.id})
            //res.send(post)
            post.name=req.body.name
            post.password=req.body.password
            await User.remove({_id:post})
            res.send(post)
            const user = new User(req.body)

            try {
                await user.save()
                res.status(201).send()
            } catch {
                res.status(400).send()
            }
        })

      
    router.post('/register/log',(req, res,next)=>
     {
            User.find({name : req.body.name})
            
            .exec()
            .then(user =>
                {
                    
                    if(user.length < 1)
                    {
                        res.status(401).send("authfailed1");
                    }
                    bcrypt.compare(req.body.password,user[0].password,(err,result)=>
                    {
                        if(err)
                        {
                            return res.status(401).send("failed auth2222")
                        }
                        if(result)
                        {
                            const token = jwt.sign(
                                {
                                    name : user[0].name,
                                    userId :user[0]._id
                                
                                },
                                process.env.JWT_KEY,
                                {
                                    expiresIn :"1h"
                                }
                            )
                            return res.status(200).json({
                                message:"successful",
                                token :token
                            })
                            
                        }
                    })
                })
            .catch(err =>
            {
                console.log(err)
                res.status(500).send("error!!!")
            })
            
    })    

module.exports =router