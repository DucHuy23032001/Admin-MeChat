const adminController = require('../controllers/adminController')
const express = require('express')
const router = express.Router();

function isAuthenticated (req, res, next) {
    if (req.session.token) next()
    else next('route')
}
router.post('/update-text/:adminId',isAuthenticated,adminController.updateText);
router.post('/change-avatar/:adminId',isAuthenticated,adminController.changeAvatar);

module.exports = {
    routes: router
}