const writeData = require('../models/writeData.js')

function sendMessage(req, res){
    const newMessage = (req.body)
    //console.log(req.body)
    writeData.writeData(newMessage);
    res.status(201)
    res.end()
}

module.exports = {
    sendMessage
}