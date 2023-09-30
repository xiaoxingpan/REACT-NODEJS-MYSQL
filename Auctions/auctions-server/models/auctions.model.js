module.exports = (sequelize, DataTypes) => {
    const auction = sequelize.define("Auction", {
        id: {
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
        lastPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        lastBidderEmail: {
            type: DataTypes.STRING(320),
            allowNull: true
        }
    }, {
        timestamps: false, // This excludes createdAt and updatedAt columns
    });

    return auction;
};
