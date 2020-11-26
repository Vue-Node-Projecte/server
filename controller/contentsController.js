const util = require('../modules/util')
const responseMessage = require('../modules/responseMessage')
const statusCode = require('../modules/statusCode')
const {contentsService,playlistService} = require('../service')

module.exports={
    searchByKeyword:async(req,res)=>{
        const {keyword} = req.query
        if(!keyword){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.CONTENTS_KEYWORD_FAIL))
        }
        try{
            const contents = await contentsService.searchByKeyword(keyword)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.CONTENTS_SEARCH_SUCCESS,contents)) 
        }catch(err){
            errReturn(err,res)
        }
    },
    moreView:async(req,res)=>{
        const {playlistId} = req.params
        try{
            const contents = await playlistService.moreViewPlaylist(playlistId)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.CONTENTS_SEARCH_SUCCESS,contents))
        }catch(err){
            errReturn(err,res)
        }
    },
    searchByCategory:async(req,res)=>{
        const {categoryId} = req.params
        try{
            const contents = await contentsService.searchByCategory(categoryId)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.CONTENTS_SEARCH_SUCCESS,contents))
        }catch(err){
            errReturn(err,res)
        }
    },
}
const errReturn=(err,res)=>{
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,err.message))
}