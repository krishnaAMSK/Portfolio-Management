const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const chatController = require('../controllers/chatController');

router.get('/', authMiddleware, chatController.getChatPage);
router.post('/', authMiddleware, chatController.sendMessage);

module.exports = router;
