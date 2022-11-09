const User = require('./User')

module.exports = (sequelize,DataTypes) => {
    const Schema = sequelize.define('friend',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
              },
              user_id: {
                type: DataTypes.STRING,
                allowNull: false,
                // references: {         
                //   model: "user",
                //   key: 'id'
                // }
              },
        },
        {
            freezeTableName:true,
            timestamps:true,
            
        } 
    )
    return Schema;
};