const express = require('express');
const router = express.Router();
const {loginView, logOut,postLogin,postChangePassword}  = require('../controllers/authController');


router.get('/login', loginView);

router.post('/post-login', postLogin);
router.post('/logout', logOut);
router.post('/change-password/:userId', postChangePassword);

module.exports = {
    routes: router
}