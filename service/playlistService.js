const {Playlists,Contents} = require('../models')
const courseService = require('./courseService')
const sequelize = require('sequelize')
const Op = sequelize.Op

module.exports={
    create:async(title,visible)=>{
        const sequence = await configSequence()
        console.log('sequence:',sequence)
        const playlist = await Playlists.create({title:title,visible:visible,sequence:sequence})
        return playlist
    },
    setBoardList:async(playlist,contentsId)=>{
        const contents = await courseService.findOneContentsByPk(contentsId)
        await playlist.addContent(contents)
        // await playlist.addContents(contents) //playlist인스턴스로 할경우에는 addContents메소드가 is not a function이라는 에러 발생.
    },
    getBoardList:async(playlist)=>{
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
    deleteContents:async(playlistId)=>{
        const playlist = await Playlists.destroy({where:{id:playlistId}})
        // const contents = await courseService.findOneContentsByPk(contentsId)
        // await playlist.removeContents(contents)
    },
    filterContent:async(playlist,contents)=>{
        // const includeContentsList = await Playlists.findOne({where:{id:playlist.id},include:[{model:Contents}]})
        const includeContentsList = await playlist.getContents()
        includeContentsList.map(async(v)=>{
            var compareContents = contents.includes(v.id)
            if(!compareContents){
                const findContents = await Contents.findByPk(v.id)
                await playlist.removeContent(findContents)
            }
        })
    },
    modify:async(playlistId,title,sequence)=>{
        var originPlaylistId
        var userSequence
        var updatePlaylist
        const thisPlaylist = await Playlists.findAll({attributes:['id','title','sequence']})
        if(title && !sequence){
            await Playlists.update({title:title},{where:{id:playlistId}})
        }else{
            thisPlaylist.map(async(v)=>{
                if(sequence == v.sequence){originPlaylistId=v.id}
                if(playlistId == v.id){userSequence=v.sequence}
                console.log('sequence!! :',v.sequence)
            })
            await Playlists.update({sequence:userSequence},{where:{id:originPlaylistId}})
            await Playlists.update({sequence:sequence},{where:{id:playlistId}})
            if(title){
                await Playlists.update({title:title},{where:{id:playlistId}})
            }
        }
        updatePlaylist = await Playlists.findAll({order:[['sequence','ASC']],attributes:['id','title','sequence']})
        return updatePlaylist
    },
    dashboardPlaylist:async()=>{
        return await Playlists.findAll({order:[['sequence','ASC']],attributes:{exclude:['createdAt','updatedAt']},include:[{model:Contents,attributes:['id','contentsTitle','url','songInfo','CourseId']}]})
    }
}
const configSequence=async()=>{
    const sequencelist = await Playlists.findAll({order:[['sequence','DESC']]})
    var sequenceNumber
    if(sequencelist.length<=0){
        sequenceNumber = 1
    }else{
        sequenceNumber = sequencelist[0].id+1
    }
    return sequenceNumber
}