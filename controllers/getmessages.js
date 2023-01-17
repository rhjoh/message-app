const { json } = require('express');
const modelspullData = require('../models/pullData.js')
// <reference path="..server.js" />

function getMessages(req, res){

    const userid = (req.params).id
    console.log("UserID: " + userid)
    const jsonFile = modelspullData.getData(userid);
    res.write(JSON.stringify(jsonFile))
    res.end()
    
}

module.exports = {
    getMessages
}