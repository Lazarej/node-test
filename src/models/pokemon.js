
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.JSON,
            allowNull: false
        },
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    });
}