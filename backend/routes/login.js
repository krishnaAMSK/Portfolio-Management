const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.get('/login', authController.loginPage);
router.post('/login', authController.login);
router.get('/register', authController.registerPage);
router.post('/register', authController.register);
router.get('/forgot-password', authController.forgotPasswordPage);
router.post('/forgot-password', authController.forgotPassword);
router.get('/reset-password/:token', authController.resetPasswordPage);
router.post('/reset-password/:token', authController.resetPassword);
router.get('/logout', authController.logout);

module.exports = router;
