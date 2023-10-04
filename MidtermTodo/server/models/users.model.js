module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING(360),
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
    });

    user.associate = (models) => {
        user.hasMany(models.Todo, {
            foreignKey: 'ownerId',
            onDelete: "cascade",
        });
    };

    return user;
};