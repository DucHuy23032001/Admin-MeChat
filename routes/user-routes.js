const express = require('express');

const {removeBlock,getUserById} = require('../controllers/userController');
const router = express.Router();

router.get('/remove-block/:userId',removeBlock);
router.get('/user-item/:userId',getUserById);

module.exports = {
    routes: router
}