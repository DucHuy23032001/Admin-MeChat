const adminController = require('../controllers/adminController')
const express = require('express')
const router = express.Router();
function isAuthenticated (req, res, next) {
    if (req.session.token) next()
    else next('route')
}
router.post('/update-text/:adminId',isAuthenticated,adminController.updateText);

module.exports = {
    routes: router
}