const { json } = require('express');
const fs = require('fs');

function getData(userid, senderid){
    const jsonFile = fs.readFileSync('./messages.json', function(error){
        console.log(error)
    })

    const dataFile = JSON.parse(jsonFile)
    let messagesByRecipAndSender = []

    function getMessagesByRecip(dataFile){
        for(element in dataFile){
            // Matches all messages between sender and recipient, not just 1 way. 
            if(((dataFile[element].recip_id == userid) && dataFile[element].sender_id == senderid) || (dataFile[element].recip_id == senderid) && dataFile[element].sender_id == userid){
                messagesByRecipAndSender.push(dataFile[element])
                console.log(dataFile[element])
            }
        }
    }
    getMessagesByRecip(dataFile);
    return messagesByRecipAndSender
}

module.exports = {
    getData
}