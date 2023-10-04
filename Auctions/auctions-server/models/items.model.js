const auction = require('./auctions.model.js');

module.exports = (sequelize, DataTypes) => {
    const item = sequelize.define("Item", {
        itemId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        sellerEmail: {
            type: DataTypes.STRING(320),
            allowNull: false
        },
        itemName: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false
        },
        itemDescription: {
            type: DataTypes.STRING(10000),
            allowNull: false
        },
        initialPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });

    item.associate = (models) => {
        item.hasMany(models.Auction, {
            foreignKey: 'itemId',
            // delete a item than delete all auction relate to it
            onDelete: "cascade",
        });
    };

    return item;
};