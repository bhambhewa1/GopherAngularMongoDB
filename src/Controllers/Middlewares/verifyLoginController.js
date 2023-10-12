require('dotenv').config();
const jwt = require('jsonwebtoken')

const authLogin = (req,res,next) => {
    let token = req.headers['authorization'];
    if(token){
        token = token.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, (err,valid) => {
            if(err){
                res.send({status: 401, messages: ["Your token is expired, please login again"]})
            }else{
                next();
            }
        }) 
    }else{
        res.send({status: 401, messages: ["Please add token in header"]})
    }
}

module.exports = {authLogin}