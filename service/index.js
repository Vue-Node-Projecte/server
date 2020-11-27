const homeworks = require('../models/homeworks');

module.exports={
    userService:require('./userService'),
    courseService:require('./courseService'),
    organizationService:require('./organizationService'),
    playlistService:require('./playlistService'),
    contentsService:require('./contentsService'),
    homeworkService:require('./homeworkService')
}