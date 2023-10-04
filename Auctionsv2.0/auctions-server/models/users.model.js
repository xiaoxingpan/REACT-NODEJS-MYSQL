module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userName: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(320),
            unique: true,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING(200),
            allowNull: false
            // defaultValue: "user" // Set the default value to "user"
        }
    }, {
        timestamps: false,
    });

    // user.associate = (models) => {
    //     user.hasMany(models.auction, {
    //         // delete a user than delete all auction relate to it
    //         onDelete: "cascade",
    //     });
    // };

    return user;
};