const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answerController');

router.get('/:thread_id', answerController.get_answers); 
router.post('/', answerController.create_answer); 

module.exports = router;
