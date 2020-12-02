const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};
let sequelize;
if (config.use_env_variable) {
 sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
 sequelize = new Sequelize(config.database, config.username, config.password, config);
}
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Users = require('./users')(sequelize,Sequelize);
db.Organizations = require('./organizations')(sequelize,Sequelize)
db.Affiliations = require('./affiliations')(sequelize,Sequelize)
db.Courses = require('./courses')(sequelize,Sequelize)
db.Contents=require('./course/contents')(sequelize,Sequelize)
db.Words=require('./course/words')(sequelize,Sequelize)
db.Sentences=require('./course/sentences')(sequelize,Sequelize)
db.Syncs=require('./course/syncs')(sequelize,Sequelize)
db.Questions=require('./course/questions')(sequelize,Sequelize)
db.Categories=require('./categories')(sequelize,Sequelize)
db.Playlists=require('./playlists')(sequelize,Sequelize)
db.Homeworks=require('./homeworks')(sequelize,Sequelize)
db.StudentAssignments=require('./studentAssignment')(sequelize,Sequelize)
db.Reports=require('./report')(sequelize,Sequelize)
db.WordsContainers=require('./wordContainer')(sequelize,Sequelize)

/*N:M Users:Organizations*/
db.Users.belongsToMany(db.Organizations,{through:'Affiliations',as:'affiliationed'})
db.Organizations.belongsToMany(db.Users,{through:'Affiliations',as:'affiliationer'})

/**1:N Course: ... */
db.Courses.hasMany(db.Contents,{onDelete:'cascade'})
db.Contents.belongsTo(db.Courses)
db.Courses.hasMany(db.Words,{onDelete:'cascade'})
db.Words.belongsTo(db.Courses)
db.Courses.hasMany(db.Sentences,{onDelete:'cascade'})
db.Sentences.belongsTo(db.Courses)
db.Courses.hasMany(db.Syncs,{onDelete:'cascade'})
db.Syncs.belongsTo(db.Courses)
db.Courses.hasMany(db.Questions,{onDelete:'cascade'})
db.Questions.belongsTo(db.Courses)
db.Sentences.hasOne(db.Syncs,{onDelete:'cascade'})
db.Syncs.belongsTo(db.Sentences)

/** N:M Contents:Categories*/
db.Contents.belongsToMany(db.Categories,{through:'CategoryList',foreignKey:'ContentId'})
db.Categories.belongsToMany(db.Contents,{through:'CategoryList',foreignKey:'CategoryId'})

/**N:M Playlists:Courses */
db.Playlists.belongsToMany(db.Contents,{through:'BoardList',foreignKey:'PlaylistId'})
db.Contents.belongsToMany(db.Playlists,{through:'BoardList',foreignKey:'ContentsId'})

/**1:M 수업:과제*/
db.Courses.hasMany(db.Homeworks,{onDelete:'cascade'})
db.Homeworks.belongsTo(db.Courses)

/**M:N 과제:사용자 */
db.Homeworks.belongsToMany(db.Users,{through:'StudentAssignments',foreignKey:'HomeworkId'})
db.Users.belongsToMany(db.Homeworks,{through:'StudentAssignments',foreignKey:'UserId'})

/**1:M 학생과제:리포트 */
db.StudentAssignments.hasMany(db.Reports,{onDelete:'cascade'})
db.Reports.belongsTo(db.StudentAssignments)

module.exports = db;