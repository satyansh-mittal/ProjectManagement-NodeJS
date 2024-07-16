const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Validator } = require('node-input-validator');

const secretKey = process.env.SECRET_KEY
const Admin = require("../../models/admin_model");
const User = require("../../models/user_model");
const Project = require("../../models/project_model");
const ProjectsAssigned = require('../../models/project_assign_model');

const signUp = async (req,res) => {
    const data = req.body;

    // Validation
    const validator = new Validator(data, {
        email: "required|email",
        password: "required",
        name: "required",
        designation: "required"
    });
    const matched = await validator.check();

    if(!matched){
        return res.status(400).send(validator.errors);
    }

    try{
        const exists = await Admin.findOne({
            where: {
                email: data.email
            }
        });
        if(exists){
            return res.status(409).json({message: "Email already exists."});
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newAdmin = await Admin.create({
            ...data,
            password: hashedPassword
        });

        res.status(201).json({message: "SignUp successful"});
    } catch(err){
        console.log(err);
        res.status(500).json({message: "SignUp unsuccessful"});
    }
};

const login = async (req,res) => {
    const {email, password} = req.body;

    //Validation
    const validator = new Validator({email, password}, {
        email: "required|email",
        password: "required"
    });
    const matched = await validator.check();
    if(!matched){
        return res.status(400).send(validator.errors);
    }

    try{
        const exists = await Admin.findOne({
            where: {
                email: email
            }
        });
        if(!exists){
            return res.status(401).json({message: "Invalid email or password"});
        }
        
        const isPasswordValid = await bcrypt.compare(password, exists.password);
        if(!isPasswordValid){
            return res.status(401).json({message: "Invalid email or password"});
        }

        // generate token
        const token = jwt.sign({adminId: exists.id}, secretKey, { expiresIn: '12h'});
        res.status(200).json({message: "Login successful", token: token});

    } catch(err){
        console.log(err);
        res.status(500).json({message: "Login unsuccessful"});
    }
};

const addUser = async (req,res) => {
    const data = req.body;

    // Validation
    const validator = new Validator(data, {
        email: "required|email",
        password: "required",
        username: "required",
    });
    const matched = await validator.check();
    if(!matched){
        return res.status(400).send(validator.errors);
    }

    try{
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newUser = await User.create({
            ...data,
            password:  hashedPassword
        });
        res.status(201).json({message: "User added successfully", user: data.username});
    } catch(err){
        console.log(err);
        res.status(500).json({message: "User addition unsuccessful"});
    }
};

const getUsers = async (req,res) => {
    try{
        const users = await User.findAll();
        if(users.length == 0){
            return res.status(404).json({message: "Table Empty"});
        }
        res.status(200).json(users);
    } catch(err){
        console.log(err);
        res.status(500).json({message: err});
    }
};

module.exports = {
    signUp,
    login,
    addUser,
    getUsers,
}