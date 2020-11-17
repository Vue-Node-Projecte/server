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

db.Users.belongsToMany(db.Organizations,{through:'Affiliations',as:'affiliationed'})
db.Organizations.belongsToMany(db.Users,{through:'Affiliations',as:'affiliationer'})

module.exports = db;