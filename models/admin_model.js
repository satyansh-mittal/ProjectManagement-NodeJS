const sequelize = require("../utils/database");
const DataTypes = require("sequelize").DataTypes;

const Admin = sequelize.define('project_super_admin', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
{
    timestamps: false  
});

module.exports = Admin;