const { json } = require('express');
const modelspullData = require('../models/pullData.js')
// <reference path="..server.js" />

function getMessages(req, res){

    const userid = (req.params).userid
    const senderid = (req.params).senderid
    /* console.log(req.params)
    console.log("UserID: " + userid)
    console.log("SenderID: " + senderid) */
    const jsonFile = modelspullData.getData(userid, senderid);
    res.write(JSON.stringify(jsonFile))
    res.end()
    
}

module.exports = {
    getMessages
}