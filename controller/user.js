const User = require('../models/user')
const bcrypt = require('bcrypt')

exports.postUserDetails = async (req,res,next)=>{
    try{
        const name = req.body.name;
        const email = req.body.email;
        const number = req.body.number;
        const password = req.body.password;
        const salts = 10;
        bcrypt.hash(password,salts, async (err,hash)=>{
            await User.create({name: name,email: email,phonenumber: number,password: hash});
            res.status(201).json({message: 'success'})
        })
    }
    catch(err){
        res.status(500).json({error: err})
    }
}