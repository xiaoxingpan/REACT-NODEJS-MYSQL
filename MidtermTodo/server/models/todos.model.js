module.exports = (sequelize, DataTypes) => {
    const todo = sequelize.define("Todo", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ownerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        task: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        dueDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        isDone: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },);

    return todo;
};
