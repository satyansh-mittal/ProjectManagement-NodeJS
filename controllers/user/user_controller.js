const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const { Validator } = require('node-input-validator');

dotenv.config();
const secretKey = process.env.SECRET_KEY

const User = require("../../models/user_model");
const Project = require("../../models/project_model");
const upload = require("../../middlewares/upload_middleware");

const Userlogin = async (req,res) => {
    const {email, password} = req.body;

    // Validation
    const validator = new Validator({email, password}, {
        email: "required|email",
        password: "required",
    });
    const matched = await validator.check();

    if(!matched){
        return res.status(400).send(validator.errors);
    }

    try{
        const exists = await User.findOne({
            where: {
                email: email
            }
        });

        if(!exists){
            return res.status(400).send({message: "User does not exist"});
        }


        const isPasswordValid = await bcrypt.compare(password, exists.password);

        if(!isPasswordValid){
            return res.status(401).send({message: "Invalid email or password"});
        }

        // generate token
        const token = jwt.sign({userId: exists.userID, username: exists.username}, secretKey, { expiresIn: '12h'});

        res.status(200).json({message: "Login successful", token: token});

    }catch(err){
        console.log(err);
        res.status(500).send({message: "Login unsuccessful"});
    }
};


const profile = async (req,res) =>{
    const userId = req.user.userId;
    try{
        const user = await User.findOne({
            where: {
                userID: userId,
            }
        });    
        res.status(200).json({user: user});        
    } catch(err){
        console.log(err);
        res.status(500).send({message: "Error while fetching user"});
    }
}

const editProfile = async (req,res) => {
    const userId = req.user.userId;
    const {email,username,password} = req.body;
    const profilePicture = req.file ? req.file.filename: null;
        
    // Validation
    const validator = new Validator({email,username,password}, {
        email: "email",
        username: "string",
        password: "string|minLength:6|maxLength:20"
    });
    const matched = await validator.check();
    if (!matched) {
        return res.status(400).send(validator.errors);
    }
    
    try{
        const exists = await User.findOne({
            where: {
                userID: userId
            }
        });
        if(!exists){
            return res.status(400).send({message: "User does not exist"});
        }

        if(email){
            exists.email = email;
            exists.save();
        }
        if(username){
            exists.username = username;
            exists.save();
        }
        if(password){
            const encrypt = await bcrypt.hash(password,10);
            exists.password = encrypt;
            exists.save();
        }
        if(profilePicture){
            exists.profilePicture = profilePicture;
            exists.save();
        }
        res.status(200).send({message: "Profile Edited", user:exists})
    } catch(err){
        console.log(err);
        res.status(500).send({message: "Error"});
    }
}

module.exports = {
    Userlogin,
    profile,
    editProfile,
}