const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');

router.get('/', homeController.homePage);
router.post('/comment', homeController.addComment);
router.post('/delete-comments', authController.isAdmin, homeController.deleteComments);

module.exports = router;
