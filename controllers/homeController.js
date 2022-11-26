'use strict';
const jwt = require("jsonwebtoken");

const indexView = (req, res, next) => {
    res.render('login', { checkRole: true, checkMK: true, checkPhone: true, layout: 'loginlayout' });
}

const profileView = async (req, res, next) => {
    let _token = req.session.token
    const _decode = jwt.verify(_token, 'secretMeChat');
    let _user;
    await fetch('https://backend-mechat-v3.cyclic.app/api/v3/users/' + _decode._id)
        .then(res => res.json())
        .then(data => _user = data.data)
    res.render('profile', { data: _user });
}

const changePassView = async (req, res, next) => {
    let _user;
    let _token = req.session.token
    const _decode = jwt.verify(_token, 'secretMeChat');
    await fetch('https://backend-mechat-v3.cyclic.app/api/v3/users/' + _decode._id)
        .then(res => res.json())
        .then(data => _user = data.data)
    res.render('change-password', { data: _user, checkNewPassword: true, checkOldPassword: true, confirm: false });
}

const tableReportView = async (req, res, next) => {
    await fetch('https://backend-mechat-v3.cyclic.app/api/v3/reports')
        .then(res => res.json())
        .then(data => res.render('table-report', { data: data.data }))
}

const tableView = (req, res, next) => {
    fetch('https://backend-mechat-v3.cyclic.app/api/v3/users/')
        .then(res => res.json())
        .then(data => res.render('table-users', { data: data.data }))
}

const reportItem = (req, res, next) => {
    fetch('https://backend-mechat-v3.cyclic.app/api/v3/reports/' + req.params.reportId)
        .then(res => res.json())
        .then(data => res.render('report-item', { data: data }))
}

module.exports = {
    indexView,
    profileView,
    tableReportView,
    tableView,
    reportItem,
    changePassView
}