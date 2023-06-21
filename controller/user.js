const User = require('../models/user')
const bcrypt = require('bcrypt')
const {Op} = require('sequelize')

exports.postUserDetails = async (req,res,next)=>{
    try{
        const name = req.body.name;
        const email = req.body.email;
        const number = req.body.number;
        const password = req.body.password;
        const salts = 10;
        const userexits = await User.findAll({where: {
            [Op.or]:[
                {email: email},
                {phonenumber : number}
            ]
        }})
        console.log(userexits)
        if(userexits.length !== 0){
            return res.status(201).json({message: 'User already exists, please login'})
        }
        bcrypt.hash(password,salts, async (err,hash)=>{
            await User.create({name: name,email: email,phonenumber: number,password: hash});
            res.status(201).json({message: 'successfully signed in'})
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: err})
    }
}