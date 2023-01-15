const { json } = require('express');
const modelspullData = require('../models/pullData.js')
// <reference path="..server.js" />

function getMessages(req, res){

    const jsonFile = modelspullData.getData();
    res.write(JSON.stringify(jsonFile))
    res.end()
    
}

module.exports = {
    getMessages
}