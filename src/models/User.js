module.exports = (sequelize,DataTypes) => {
    const User = sequelize.define('user',
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.STRING
              },
            name:DataTypes.STRING,
            email:DataTypes.STRING,
            address:DataTypes.STRING,
            phone:DataTypes.STRING,
            password:DataTypes.STRING
        },
        {
            freezeTableName:true,
            timestamps:true,
            
        }
        
    )
    return User;
};

