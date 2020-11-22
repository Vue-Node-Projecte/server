const jwt = require('jsonwebtoken')
const {secretKey,options,refreshOptions} = require('../config/jwt')
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;
module.exports = {
    sign: async (user) => {
        const payload={
            id:user.id,
            name:user.name,
            authority:user.authority
        }
        const result={
            accessToken : jwt.sign(payload,secretKey,options),
            refreshToken : jwt.sign(payload,secretKey,refreshOptions)
        }
        return result
    },
    verify:async(token)=>{
        let decoded;
        try{
            decoded = await jwt.verify(token,secretKey)
        }catch(err){
            if(err.name ==='jwt expired'){
                console.log('expired token')
                return TOKEN_EXPIRED
            }else if(err.name === 'invalid token'){
                console.log('invalid token')
                return TOKEN_INVALID
            }else{
                console.log('invalid token')
                return TOKEN_INVALID
            }
        }
        return decoded
    }
}