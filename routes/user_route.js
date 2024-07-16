const express = require('express');
const router = express.Router();
const user_controller = require("../controllers/user/user_controller");
const user_project_controller = require("../controllers/user/project_controller");
const verifyToken = require("../middlewares/auth_middleware");
const upload = require("../middlewares/upload_middleware");


router.get('/user/login', user_controller.Userlogin);
router.get('/user/profile',verifyToken, user_controller.profile);
router.patch('/user/edit', upload.single('profilePicture'),verifyToken, user_controller.editProfile);

router.get('/user/Projects',verifyToken, user_project_controller.showProjects);
router.post("/user/addProgress", verifyToken, user_project_controller.addProgress);

module.exports = router;