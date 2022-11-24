const adminController = require('../controllers/adminController')
const express = require('express')
const router = express.Router();

router.post('/update-text/:adminId',adminController.updateText);

module.exports = {
    routes: router
}