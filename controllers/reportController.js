'use strict';

function getTableReport(res, req) {
    fetch('https://backend-mechat-v3.cyclic.app/api/v3/reports')
        .then(res => res.json())
        .then(data => res.render('table-report', { data: data.data }))
}
//Oke
const deleteReport = (req, res, next) => {
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
}


//OKe
const acceptReport = (req, res, next) => {
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
    fetch('https://backend-mechat-v3.cyclic.app/api/v3/reports')
        .then(res => res.json())
        .then(data => res.render('table-report', { data: data.data }))
}

module.exports = {
    deleteReport,
    acceptReport
}