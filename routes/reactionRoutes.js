const express = require('express');
const router = express.Router();
const reactionController = require('../controllers/reactionController');

router.post('/thread', reactionController.reactToThread);
router.post('/answer', reactionController.reactToAnswer);

module.exports = router;

