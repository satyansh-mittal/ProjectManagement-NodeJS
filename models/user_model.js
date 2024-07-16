const sequelize = require("../utils/database");
const { DataTypes } = require("sequelize");

const User = sequelize.define('project_users', {
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
{
    tableName: 'project_users',
    timestamps: false
});

module.exports = User;
