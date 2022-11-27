'use strict';

//Oke
const updateText = async (req, res, next) => {
    try {
        let _id = req.params.adminId;
        const { fullName, birthday, bio, gender } = req.body;
        let _gender;
        if(gender == 'Nam'){
            _gender = 0;
        }else if(gender == "Nữ"){
            _gender = 1;
        }
        let _date = new Date(birthday)
        let _data = {
            fullName: fullName,
            gender: _gender,
            birthday:_date,
            bio: bio
        }
        console.log(_data);
        fetch('https://backend-mechat-v3.cyclic.app/api/v3/users/' + _id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(_data)
        }).then(data=>console.log(data))
        res.redirect('/profile')
    } catch (error) {
        console.log(error);
    }
}
//test
const changeAvatar = async (req, res, next) => {
    try {
        console.log(req.body)
        const { file } = req.body;
        console.log(file);
        let _data = {
            avatarLink: file,
        }
        await fetch('https://backend-mechat-v3.cyclic.app/api/v3/users/' + _id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(_data)
        })
        res.redirect('/profile');
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    updateText,
    changeAvatar
}