// multer
const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null, 'uploads/profile_pictures');
    },
    filename:(req,file,cb) =>{
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req,file,cb) =>{
        const fileTypes = /jpeg|jpg|png|gif/;
        const mimeType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));
        
        if(mimeType && extname){
            return cb(null, true);
        }
        cb('Give proper file type('+fileTypes+')');
    }
});

module.exports = upload;