const writeData = require('../models/writeData.js')

function sendMessage(req, res){

    //console.log('/sendMessage endpoint hit')
    
    const newMessage = (req.body)
    writeData.writeData(newMessage);
    res.status(201)
    res.end()
}

module.exports = {
    sendMessage
}