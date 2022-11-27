'use strict';
const jwt = require("jsonwebtoken");

const indexView = (req, res, next) => {
    try {
        res.render('login', { checkMK: true, checkPhone: true, layout: 'loginlayout' });
    } catch (error) {
        console.log(error);
    }
}

const profileView = async (req, res, next) => {
    try {
        let _token = req.session.token
        const _decode = jwt.verify(_token, 'secretMeChat');
        let _user;
        await fetch('https://backend-mechat-v3.cyclic.app/api/v3/users/' + _decode._id)
            .then(res => res.json())
            .then(data => _user = data.data)
        res.render('profile', { data: _user });
    } catch (error) {
        console.log(error);
    }
}

const changePassView = async (req, res, next) => {
    try {
        let _user,_account;
        let _token = req.session.token
        const _decode = jwt.verify(_token, 'secretMeChat');
        await fetch('https://backend-mechat-v3.cyclic.app/api/v3/users/' + _decode._id)
            .then(res => res.json())
            .then(data => _user = data.data)  
        res.render('change-password', {data: _user, checkNewPassword: true, checkOldPassword: true, confirm: false });
    } catch (error) {
        console.log(error);
    }
}

const tableReportView = async (req, res, next) => {
    try {
        await fetch('https://backend-mechat-v3.cyclic.app/api/v3/reports')
            .then(res => res.json())
            .then(data => res.render('table-report', { data: data.data }))
    } catch (error) {
        console.log(error);
    }
}

const tableView = (req, res, next) => {
    try {
        fetch('https://backend-mechat-v3.cyclic.app/api/v3/users/')
            .then(res => res.json())
            .then(data => res.render('table-user', { data: data.data }))
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    indexView,
    profileView,
    tableView,
    tableReportView,
    changePassView
}