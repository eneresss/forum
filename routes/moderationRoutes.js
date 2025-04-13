const express = require('express');
const router = express.Router();
const moderationController = require('../controllers/moderationController');

router.post('/thread', moderationController.delete_thread);

router.post('/answer', moderationController.delete_answer);

router.post('/assign', moderationController.add_moderator);

module.exports = router;
