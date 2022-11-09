const dbConfig = require('../config/dbConfig');
const {Sequelize,DataTypes} = require('sequelize');

const sequelize= new Sequelize(dbConfig.DATABASE,dbConfig.USER,dbConfig.PASSWORD,
    {
        host:dbConfig.HOST,
        dialect:dbConfig.DIALECT, 
        pool:{
            min:0,
            max:5,
            idle:10000,
            acquire:30000
        },
        logging: process.env.NODE_ENV === 'production' ? false : console.log
    }
)

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const db={};
db.sequelize=sequelize;
db.models={};

db.models.User = require('./User')(sequelize,DataTypes);
db.models.Friend = require('./Friend')(sequelize,DataTypes);

db.sequelize.sync({ force: false })
.then(() => {
    console.log('Table already exists')
})



// 1 to Many Relation

db.models.User.hasMany(db.models.Friend, {
    foreignKey: 'friend_id',
    as: 'friend'
})

db.models.User.hasMany(db.models.Friend, {
  foreignKey: 'user_id',
  as: 'usr'
})

db.models.Friend.belongsTo(db.models.User, {
    foreignKey: 'friend_id',
    as: 'user'
})

db.models.Friend.belongsTo(db.models.User, {
  foreignKey: 'user_id',
  as: 'frnd'
})




module.exports = db
