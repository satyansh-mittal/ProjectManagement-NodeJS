const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Validator } = require('node-input-validator');

const secretKey = process.env.SECRET_KEY
const Admin = require("../../models/admin_model");
const User = require("../../models/user_model");
const Project = require("../../models/project_model");
const ProjectsAssigned = require('../../models/project_assign_model');
const Progress = require("../../models/progress_model");
const addProject = async (req, res) => {
    const data = req.body;

    // Validation
    const validator = new Validator(data, {
        description: "required",
        projectName: "required|minLength:3|maxLength:20",
        endDate: "required"
    });
    const matched = await validator.check();
    if(!matched){
        return res.status(400).send(validator.errors);
    }

    try{
        const project_exists = await Project.findOne({
            where: {
                projectID: data.projectID
            }
        });
        if(project_exists){
            return res.status(409).json({message: "Project already exists."});
        }

        const newProject = await Project.create(data);
        res.status(201).json({message: "Project added successfully", projectId: data.projectID});
    } catch(err){
        console.log(err);
        res.status(500).json({message: "Project addition unsuccessful"});
    }
};

const assignProjects = async (req,res) =>{
    const {userID, projectID} = req.body;

    const userIDs = Array.isArray(userID) ? userID : [userID];
    const projectIDs = Array.isArray(projectID) ? projectID : [projectID];
    
    // Validation
    const validator = new Validator({userIDs,projectIDs}, {
        userIDs: "required",
        projectIDs: "required"
    });
    const matched = await validator.check();
    if(!matched){
        return res.status(400).send(validator.errors);
    }

    const assignment = [];
    userIDs.forEach(user => {
        projectIDs.forEach(project =>{
            assignment.push({userID: user, projectID: project});
        });
    });

    try{

        const assign = await ProjectsAssigned.bulkCreate(assignment);
        res.status(201).json({message: "Projects Assigned", projects: assign})
    } catch(err){
        console.log(err);
        res.status(500).json({message: "Projects not Assigned", error: err});
    }
};

const getProjects = async (req,res) => {
    try{
        const projects = await Project.findAll();
        if(projects.length == 0){
            return res.status(404).json({message: "Table Empty"});
        }
        res.status(200).json(projects);
    } catch(err){
        console.log(err);
        res.status(500).json({message: err});
    }
};

const getProgress =  async (req, res) => {
    try{
        const progress = await Progress.findAll();
        if(progress.length == 0){
            return res.status(404).json({message: "Progress Data Empty"});
        }
        res.status(200).json(progress);
    } catch(err){
        console.log(err);
        res.status(500).json({message: err});
    }
}

module.exports = {
    addProject,
    assignProjects,
    getProjects,
    getProgress
}