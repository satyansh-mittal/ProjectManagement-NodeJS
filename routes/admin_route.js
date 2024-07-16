const express = require('express');
const router = express.Router();
const admin_user_controller = require("../controllers/admin/user_controller");
const admin_project_controller = require("../controllers/admin/project_controller");
const verifyToken = require("../middlewares/auth_middleware");

router.post('/admin/signUp', admin_user_controller.signUp);
router.get('/admin/login', admin_user_controller.login);
router.get('/admin/users', admin_user_controller.getUsers);
router.post('/admin/addUser',verifyToken, admin_user_controller.addUser);

router.get('/admin/projects', admin_project_controller.getProjects);
router.post('/admin/addProject',verifyToken, admin_project_controller.addProject);
router.post('/admin/assignProjects',verifyToken, admin_project_controller.assignProjects);
router.get('/admin/progress',verifyToken, admin_project_controller.getProgress);

module.exports = router;