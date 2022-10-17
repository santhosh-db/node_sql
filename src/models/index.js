const dbConfig = require('../config/dbConfig');
const Sequelize = require('sequelize');

const sequelize= new Sequelize(dbConfig.DATABASE,dbConfig.USER,dbConfig.PASSWORD,
    {
        host:dbConfig.HOST,
        dialect:dbConfig.DIALECT, 
        pool:{
            min:0,
            max:5,
            idle:10000,
            acquire:30000
        }
    }
)

sequelize.sync()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const db={};
db.sequelize=sequelize;
db.models={};

db.models.User = require('./User')(sequelize,Sequelize.DataTypes);

module.exports=db;
