const { json } = require('express');
const modelspullData = require('../models/pullData.js')

function getMessages(req, res){

    const userid = (req.params).userid
    const senderid = (req.params).senderid
    const jsonFile = modelspullData.getData(userid, senderid);
    res.write(JSON.stringify(jsonFile))
    res.end()
}

module.exports = {
    getMessages
}