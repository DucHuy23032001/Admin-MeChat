'use strict';
const jwt = require("jsonwebtoken");
//Oke
const updateText = async (req, res, next) => {
    try {
        let _token = req.session.token
        const _decode = jwt.verify(_token, 'secretMeChat');
        let _id = _decode._id;
        const { fullName, birthday, bio, gender } = req.body;
        let _data = {
            fullName: fullName,
            gender: gender,
            birthday: Date.parse(birthday),
            bio: bio
        }
        await fetch('https://backend-mechat-v3.cyclic.app/api/v3/users/' + _id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(_data)
        })
        let _user;
        await fetch('https://backend-mechat-v3.cyclic.app/api/v3/users/' + _id)
            .then(res => res.json())
            .then(data => _user = data.data)
        res.render('profile', { data: _user });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    updateText
}