const User = require('./User')

module.exports = (sequelize,DataTypes) => {
    const Schema = sequelize.define('friend',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
              }
        },
        {
            freezeTableName:true,
            timestamps:true,
            
        } 
    )
    return Schema;
};