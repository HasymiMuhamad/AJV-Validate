const express = require('express');
const auth = require('../middleware/auth');
const postController = require('../controllers/post');
const router = express.Router();
const app = express();


router.post('/dataPost' , auth.isAuthenticated, postController.dataPost); 

router.put('/update/:id',  auth.isAuthenticated, postController.dataUpdate);

router.get('/:id', auth.isAuthenticated, postController.dataDetails); 

router.delete('/delete/:id', auth.isAuthenticated, postController.dataDelete); 

module.exports = router;