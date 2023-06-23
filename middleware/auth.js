const User = require('../models/user');
const jwt = require('jsonwebtoken')


const authentication = async (req,res,next)=>{
    try{
        const token = req.header('Authorization');
        const userobj = jwt.verify(token , process.env.JWT_SECRET_KEY)
        const user = await User.findByPk(userobj.UserId);
        if(user){
            req.user = user;
            next();
        }else{
            throw new Error('something went wrong')
        }
    }catch(err){
        console.log(err)
        res.status(401).json({message: err, success: false})
    }
}

module.exports = {
    authentication
}