const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const { Validator } = require('node-input-validator');

dotenv.config();
const secretKey = process.env.SECRET_KEY

const User = require("../../models/user_model");
const Project = require("../../models/project_model");
const Progress = require("../../models/progress_model");
const ProjectsAssigned = require("../../models/project_assign_model");

const showProjects = async (req, res) => {
    const userId = req.user.userId;
    try {
        const projects = await ProjectsAssigned.findAll(
            {
                include:{model:Project},
                where:{userID:userId}});
        // const projects = await User.findAll({
        //     attributes: ['username'],
        //     include: [{
        //         model: ProjectsAssigned,
        //         attributes: [['id', 'projectAssignedID']],
        //         include: [{
        //             model: Project,
        //             attributes: ['projectName', 'startDate', 'endDate', 'description']
        //         }]
        //     }],
        //     where: {
        //         userID: userId,
        //     }
        // });

        if (projects.length > 0) {
            res.status(200).json({ projects });
        } else {
            res.status(404).send({ message: "No projects found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Error while fetching projects", error: err });
    }
}

const addProgress = async (req, res) => {
    const data = req.body;

    // Validation
    const validator = new Validator(data, {
        projectAssignedID: "required",
        progress: "required",
    });

    const matched = await validator.check();
    if (!matched) {
        return res.status(400).send(validator.errors);
    }

    try {
        const assigned = await ProjectsAssigned.findOne({
            where: {
                id: data.projectAssignedID,
            }
        });
        if (!assigned) {
            return res.status(400).send({ message: "Project is not assigned" });
        }

        const [progress, created] = await Progress.upsert({
            projectAssignedID: data.projectAssignedID,
            userID: assigned.userID,
            projectID: assigned.projectID,
            progress: data.progress
        });

        if (created) {
            res.status(201).json({ message: "Progress created successfully", progress });
        } else {
            res.status(200).json({ message: "Progress updated successfully", progress });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Progress addition unsuccessful", error: err });
    }
}

module.exports = {
    showProjects,
    addProgress,
}