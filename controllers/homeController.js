'use strict';
const jwt = require("jsonwebtoken");

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAc5R48XRDx2jxyGscKmfCZUqcdpnnmWCw",
    authDomain: "chat-app-50a48.firebaseapp.com",
    projectId: "chat-app-50a48",
    storageBucket: "chat-app-50a48.appspot.com",
    messagingSenderId: "294060158276",
    appId: "1:294060158276:web:182b5dd69cc88fbe56bb11",
    measurementId: "G-R1FJ2081Y0"
};

const indexView = (req, res, next) => {
    res.render('authentication', { checkRole: true, checkMK: true, checkPhone: true, layout: 'loginlayout' });
}

const homeView = async (req, res, next) => {
    await fetch('https://backend-mechat-v3.cyclic.app/api/v3/users/' + _decode._id)
        .then(res => res.json())
        .then(data => _user = data.data)
    res.render('home', { data: _user });
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
    fetch('https://backend-mechat-v3.cyclic.app/api/v3/users')
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
    changePassView,
    homeView
}