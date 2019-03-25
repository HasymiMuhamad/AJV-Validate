const express = require('express');
const auth = require('../middleware/auth');
const postController = require('../controllers/post');
const router = express.Router();
const app = express();


router.post('/' , postController.dataPost); 

router.put('/:id', postController.dataUpdate);

router.get('/:id', postController.dataDetails); 

router.delete('/:id', postController.dataDelete); 

module.exports = router;