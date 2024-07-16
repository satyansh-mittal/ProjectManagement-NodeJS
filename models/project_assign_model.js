const sequelize = require("../utils/database");
const { DataTypes } = require("sequelize");
const Project = require('./project_model');
const User = require('./user_model');

const ProjectsAssigned = sequelize.define('projects_assigned', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    projectID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},
{
    // tableName: "projects_assigned",
    timestamps: false,
    updatedAt: false,
    indexes: [
        {
            unique: true,
            fields: ['userID', 'projectID']
        }
    ],
});

Project.hasMany(ProjectsAssigned,{foreignKey:"projectID"});
ProjectsAssigned.belongsTo(Project,{foreignKey:"projectID"})


// User.belongsToMany(Project, { through: ProjectsAssigned, foreignKey: 'userID'});
// Project.belongsToMany(User, { through: ProjectsAssigned, foreignKey: 'projectID' });

// ProjectsAssigned.belongsTo(User, { foreignKey: 'userID' });
// ProjectsAssigned.belongsTo(Project, { foreignKey: 'projectID' });

module.exports = ProjectsAssigned;
