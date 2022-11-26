'use strict';

function getTableReport(res, req) {
    try {
        fetch('https://backend-mechat-v3.cyclic.app/api/v3/reports')
        .then(res => res.json())
        .then(data => res.render('table-report', { data: data.data }))
    } catch (error) {
        console.log(error);
    }
}
//Oke
const deleteReport = (req, res, next) => {
    try {
        let _id = req.params.reportId;
        let _data = {
            status: true
        }
        fetch('https://backend-mechat-v3.cyclic.app/api/v3/reports/' + _id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(_data)
        })
        getTableReport(res, req);
    } catch (error) {
        console.log(error);
    }
}


//OKe
const acceptReport = (req, res, next) => {
    try {
        let _id = req.params.reportId;
        let _data = {
            status: true
        }
        fetch('https://backend-mechat-v3.cyclic.app/api/v3/reports/' + _id, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(_data)
        }).then(function (res) {
            res.json();
        })
        getTableReport(res, req);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    deleteReport,
    acceptReport
}