const express = require('express');

const {indexView,tableReportView, profileView, tableView, reportItem,changePassView,homeView} = require('../controllers/homeController');
const router = express.Router();

function isAuthenticated (req, res, next) {
    if (req.session.token) next()
    else next('route')
}

router.get('/',isAuthenticated,tableReportView);
router.get('/',indexView);
router.get('/profile', profileView);
router.get('/table-report',tableReportView)
router.get('/table', tableView);
router.get('/report-item/:reportId',reportItem)
router.get('/change-password',changePassView)   

module.exports = {
    routes: router
}