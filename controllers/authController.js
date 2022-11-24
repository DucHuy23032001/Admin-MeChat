'use strict';
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const window = require('window')
// const firebase = require('firebase')
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithPhoneNumber, initializeAuth } = require("firebase/auth");

const firebaseConfig = {
    apiKey: "AIzaSyAc5R48XRDx2jxyGscKmfCZUqcdpnnmWCw",
    authDomain: "chat-app-50a48.firebaseapp.com",
    projectId: "chat-app-50a48",
    storageBucket: "chat-app-50a48.appspot.com",
    messagingSenderId: "294060158276",
    appId: "1:294060158276:web:182b5dd69cc88fbe56bb11",
    measurementId: "G-R1FJ2081Y0"
};

const logOut = async (req, res, next) => {
    try {
        req.session.token = null
        req.session.save(function (err) {
            if (err) next(err)
            req.session.regenerate(function (err) {
                if (err) next(err)
                res.redirect('/')
            })
        })
    } catch (error) {
        console.log(error);
    }
}

// const authentication = async (req, res, next) => {
//     try {
//         const phoneNumber = req.body.phoneNumber;
//         const appVerifier = window.recaptchaVerifier;
//         console.log(req.body);
//         console.log(req.body.recaptcha);
//         // let app = initializeAuth(firebaseConfig);
//         const app = initializeApp(firebaseConfig);
//         console.log("1");
//         const auth = getAuth();
//         console.log("2");
//         // var credential = firebase.auth.PhoneAuthProvider.credential(confirmationResult.verificationId, code);
//         signInWithPhoneNumber(auth, phoneNumber, appVerifier)
//             .then((confirmationResult) => {
//                 // SMS sent. Prompt user to type the code from the message, then sign the
//                 // user in with confirmationResult.confirm(code).
//                 console.log("3");
//                 window.confirmationResult = confirmationResult;
//                 console.log("4");
//                 // ...
//             }).catch((error) => {
//                 console.log(error);
//                 // Error; SMS not sent
//                 // ...
//             });
//     } catch (error) {
//         console.log(error);
//     }
// }

const postLogin = async (req, res, next) => {
    try {
        const { phoneNumber, passWord } = req.body;
        let _checkMK = false, _checkPhone = false, _checkRole = false, _datas;
        await fetch('https://backend-mechat-v3.cyclic.app/api/v3/users')
            .then(res => res.json())
            .then(data => _datas = data.data)
        for (let i of _datas) {
            if (i.role) {
                _checkRole = true;
                let _account;
                await fetch('https://backend-mechat-v3.cyclic.app/api/v3/accounts/' + i.phoneNumber)
                    .then(res => res.json())
                    .then(data => _account = data.data)
                if (_account.phoneNumber == phoneNumber) {
                    _checkPhone = true
                    if (await bcrypt.compare(passWord, _account.passWord)) {
                        _checkMK = true;
                        let _data = {
                            phoneNumber: phoneNumber,
                            passWord: passWord
                        }
                        let _login = await fetch('https://backend-mechat-v3.cyclic.app/api/v3/auths/login', {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(_data)
                        })
                        const _jsonData = await _login.json();
                        // res.render('authentication', { data: _jsonData._token, layout: 'loginlayout' })
                        req.session.regenerate(function (err) {
                            if (err) next(err)
                            req.session.token = _jsonData._token;
                            req.session.save(function (err) {
                                if (err) return next(err)
                                res.redirect('/')
                            })
                        })
                    }
                    else {
                        _checkMK = false;
                    }
                } else {
                    _checkPhone = false;
                }
            }
        }

        if (_checkRole == false) {
            _checkPhone = true;
            _checkMK = true;
            res.render('login', { checkPhone: _checkPhone, checkMK: _checkMK, checkRole: _checkRole, layout: 'loginlayout' })
        }
        else if (_checkPhone == false) {
            _checkMK = true;
            res.render('login', { checkPhone: _checkPhone, checkMK: _checkMK, checkRole: _checkRole, layout: 'loginlayout' })
        }
        else if (_checkMK == false) {
            res.render('login', { checkPhone: _checkPhone, checkMK: _checkMK, checkRole: _checkRole, layout: 'loginlayout' })
        }
    } catch (error) {
        console.log(error);
    }
}

const postChangePassword = async (req, res) => {
    try {
        let _token = req.session.token
        const _decode = jwt.verify(_token, 'secretMeChat');
        const { passWord, newPassword, confirmPassword } = req.body;
        let _user;
        let _account;
        await fetch('https://backend-mechat-v3.cyclic.app/api/v3/users/' + _decode._id)
            .then(res => res.json())
            .then(data => _user = data.data)
        await fetch('https://backend-mechat-v3.cyclic.app/api/v3/accounts/' + _user.phoneNumber)
            .then(res => res.json())
            .then(data => _account = data.data)

        if (!await bcrypt.compare(passWord, _account.passWord)) {
            res.render('change-password', { data: _user, checkNewPassword: true, checkOldPassword: false, confirm: false })
        }
        else if (newPassword != confirmPassword) {
            res.render('change-password', { data: _user, checkNewPassword: false, checkOldPassword: true, confirm: false })
        }
        let _data1 = {
            oldPass: passWord,
            newPassword: newPassword
        }
        await fetch('https://backend-mechat-v3.cyclic.app/api/v3/accounts/change-password/' + req.params.userId, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(_data1)
        }).then(function (res) {
            res.json();
        })
        res.render('change-password', { data: _user, checkNewPassword: true, checkOldPassword: true, confirm: true })
    } catch (error) {
        console.log(error);
    }
}

const loginView = async (req, res, next) => {
    fetch('https://backend-mechat-v3.cyclic.app/api/v3/accounts')
        .then(res => res.json())
        .then(data => res.render('login', { data: data.data, layout: 'loginlayout', checkMK: true, checkPhone: true, checkRole: true }))
}

module.exports = {
    loginView,
    logOut,
    postLogin,
    postChangePassword,
    logOut,
}