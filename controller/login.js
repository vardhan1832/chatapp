const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

function generateAccessToken(id, name){
    return jwt.sign({UserId: id, name: name}, process.env.JWT_SECRET_KEY)
}

const login = async (req,res,next)=>{
    try{
        let usermail = await User.findAll({where: {email: req.body.email}})
        // console.log(usermail)
        if(usermail === undefined || usermail.length === 0){
            res.status(404).json({message: 'Email doesnot exist'})
        }else if(usermail.length > 0){
            bcrypt.compare(req.body.password , usermail[0].password , (err, result)=>{
                if(err){
                    throw new Error(err)
                }else{
                    if(result){
                        res.status(201).json({message: 'Login succesfull' , token: generateAccessToken(usermail[0].id , usermail[0].name) })
                    }else{
                        res.status(401).json({message: 'password incorrect'})
                    }
                }
            })
        }
    }catch(err){
        console.log(err)
        res.status(500).json({message: err})
    }
}

module.exports = {
    login
}