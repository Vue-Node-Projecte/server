const util = require('../modules/util')
const responseMessage = require('../modules/responseMessage')
const statusCode = require('../modules/statusCode')
const {playlistService} = require('../service')

module.exports={
    playlist:async(req,res)=>{
        try{
            const playlist = await playlistService.dashboardPlaylist()
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.PLAYLIST_GET_SUCCESS,playlist))
        }catch(err){
            errReturn(err,res)
        }
    }
}
const errReturn = async(err,res)=>{
    console.log(err)
    if(err.name =="NULL_PLAYLIST"){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,err.message))
    }
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,err.message))
}