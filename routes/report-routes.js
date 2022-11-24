const express = require('express');

const {deleteReport, acceptReport} = require('../controllers/reportController');
const router = express.Router();

router.get('/delete/:reportId',deleteReport);
router.get('/accept/:reportId',acceptReport)

module.exports = {
    routes: router
}