const express = require('express');
const router = express.Router();
const threadController = require('../controllers/threadController');

router.get('/', threadController.get_all_threads);
router.post('/', threadController.create_thread);

module.exports = router;
