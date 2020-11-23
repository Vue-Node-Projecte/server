const {Playlists,Contents} = require('../models')
const courseService = require('./courseService')
const sequelize = require('sequelize')
const Op = sequelize.Op

module.exports={
    create:async(title,visible)=>{
        const sequence = await configSequence()
        const playlist = await Playlists.create({title:title,visible:visible,sequence:sequence})
        return playlist
    },
    setBoardList:async(playlist,contentsId)=>{
        const contents = await courseService.findOneContentsByPk(contentsId)
        // await contents.setPlaylists(playlist)
            await playlist.addContent(contents)
        // await playlist.addContents(contents) //playlist인스턴스로 할경우에는 addContents메소드가 is not a function이라는 에러 발생.
    },
    getBoardList:async(playlist)=>{
        // console.log('test:',JSON.stringify(playlist,null,2))
        // console.log('playlist!:',playlist.id)
        const boardlist = await Playlists.findOne({where:{id:playlist.id},include:[{model:Contents,attributes:['id','contentsTitle','url','songInfo']}]})
        return boardlist
    },
    readAllByKeyword:async(keyword)=>{
        const playlist = await Playlists.findAll({where:{title:{[Op.like]:`%${keyword}%`}}})
        return playlist
    },
    readAllByCategory:async()=>{

    },
    readAllByPlaylist:async()=>{

    },
    readOnePlaylist:async()=>{
        
    },
    readOneByPk:async(id)=>{
        const playlist = await Playlists.findByPk(id)
        if(playlist === null){
            var newError = new Error('존재하지않는 플레이리스트입니다.')
            newError.name = "NULL_PLAYLIST"
            throw newError
        }
        return playlist
    },
    deleteContents:async(playlistId,contentsId)=>{
        const playlist = await Playlists.findByPk(playlistId)
        const contents = await courseService.findOneContentsByPk(contentsId)
        await playlist.removeContents(contents)
    },
    filterContent:async(playlist,contents)=>{
        const includeContentsList = await Playlists.findOne({where:{id:playlist.id},include:[{model:Contents}]})
        includeContentsList.Contents.map(async(v)=>{
            var compareContents = contents.includes(v.id)
            if(!compareContents){
                const findContents = await Contents.findByPk(v.id)
                await playlist.removeContent(findContents)
            }
        })
    }
}
const configSequence=async()=>{
    const sequencelist = await Playlists.findAll({order:[['sequence','DESC']]})
    var sequenceNumber = sequencelist[0].id+1
    return sequenceNumber
}