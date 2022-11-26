'use strict';

function getTableUserReport(res,req){
    try {
        fetch('https://backend-mechat-v3.cyclic.app/api/v3/reports')
        .then(res => res.json())
        .then(data => res.render('table-report',{data:data.data}))
    } catch (error) {
        console.log(error);
    }
}
//Oke
const removeBlock = (req,res,next) =>{
    try {
        let _id = req.params.userId;
        let _data = {
            status:true
        }
        fetch('https://backend-mechat-v3.cyclic.app/api/v3/reports/' + _id,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(_data)
        })
        getTableUserReport(res,req)
    } catch (error) {
        console.log(error);
    }
}

const getUserById = (req,res,next) =>{
    try {
        let _id = req.params.userId;
        fetch('https://backend-mechat-v3.cyclic.app/api/v3/users/' + _id)
        .then(res => res.json())
        .then(data => res.render('user-item',{data:data.data}))
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    removeBlock,
    getUserById
}