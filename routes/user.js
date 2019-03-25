const userController = require('../controllers/user');
const express = require('express');
const apps = express(); 
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth')



router.get('/test',  userController.Test);

router.post('/login',  userController.login);

router.post('/register', userController.userCreate);

module.exports = router;



