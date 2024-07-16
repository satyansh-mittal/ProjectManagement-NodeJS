const sequelize = require("../utils/database");
const DataTypes = require("sequelize").DataTypes;
const Project = require('./project_model');
const User = require('./user_model');
const ProjectsAssigned = require('./project_assign_model');

const Progress = sequelize.define('projects_progress', {
    projectAssignedID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        references: {
            model: ProjectsAssigned,
            key: "id",
        }
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    projectID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    progress: {
        type: DataTypes.TEXT,
        allowNull: true
    }
},
{  
    createdAt: true,
    updatedAt: false,
    tableName: "projects_progress",
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['userID', 'projectID', 'projectAssignedID']
        }
    ],
});

module.exports = Progress;