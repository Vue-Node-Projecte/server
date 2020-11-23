const util = require('../modules/util')
const responseMessage = require('../modules/responseMessage')
const statusCode = require('../modules/statusCode')
const {playlistService, Contents}=require('../service')

module.exports={
    register:async(req,res)=>{
        const {title, visible, contents} = req.body
        if(!title || !visible || !contents){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
        }
        try{
            const playlist = await playlistService.create(title,visible)
            contents.map(async(v)=>{
                await playlistService.setBoardList(playlist,v)
            })
            console.log('create playlist:',playlist)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.PLAYLIST_CREATE_SUCCESS,playlist))
        }catch(err){
            errReturn(err,res)
        }
    },
    additional:async(req,res)=>{
        const {playlistId} = req.params
        const {contents} = req.body
        console.log('playlistid : ',playlistId)
        console.log('contentsArray : ',contents)
        if(!contents){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.BAD_REQUEST))
        } 
        try{
            const thisPlaylist = await playlistService.readOneByPk(playlistId)
            playlistService.filterContent(thisPlaylist,contents)
            contents.map(async(v)=>{
                await playlistService.setBoardList(thisPlaylist,v)
            })
            const boardlist = await playlistService.getBoardList(thisPlaylist)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.PLAYLIST_ADDITIONAL_SUCCESS,boardlist))
        }catch(err){
            errReturn(err,res)
        }
    },
    modify:async(req,res)=>{

    },
    delete:async(req,res)=>{
        const {playlistId,contentsId} = req.params
        try{
            await playlistService.deleteContents(playlistId,contentsId)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.PLAYLIST_DELETE_SUCCESS))
        }catch(err){
            errReturn(err,res)
        }
    }
}
const errReturn=(err,res)=>{
    console.log(err)
    if(err.name =="NULL_PLAYLIST"){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,err.message))
    }
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,err.message))
}