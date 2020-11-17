const jwt = require('jsonwebtoken')
const secretObj = require('../config/jwt')
module.exports={
    tokenCheck:async(req)=>{
        let token = req.cookies.userToken;
        let decoded = jwt.verify(token,secretObj.secret);
        if(decoded){
            return decoded
        }else{
            return false
        }
    },
    createToken:async(email,authority)=>{
        return await jwt.sign({
            email:email,
            authority:authority
        },
        secretObj.secret,{
            expiresIn:'60m'
        })
    }
}

// let test = await jwtModules.tokenCheck(req); 