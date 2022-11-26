const express = require('express');

const {indexView,tableReportView, profileView, tableView, reportItem,changePassView} = require('../controllers/homeController');
const router = express.Router();

function isAuthenticated (req, res, next) {
    if (req.session.token) next()
    else next('route')
}

router.get('/',isAuthenticated,tableReportView);
router.get('/',indexView);
router.get('/profile',isAuthenticated, profileView);
router.get('/table-report',isAuthenticated,tableReportView)
router.get('/table',isAuthenticated, tableView);
router.get('/report-item/:reportId',isAuthenticated,reportItem)
router.get('/change-password',isAuthenticated,changePassView)   

module.exports = {
    routes: router
}