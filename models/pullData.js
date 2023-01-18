const { json } = require('express');
const fs = require('fs');

function getData(userid){

    const jsonFile = fs.readFileSync('./messages.json', function(error){
        console.log(error)
    })

    const dataFile = JSON.parse(jsonFile)
    let messagesByRecip = []

    function getMessagesByRecip(dataFile){
        
        for(element in dataFile){
            if(dataFile[element].recip_id == userid || dataFile[element].recip_id == 0){
                messagesByRecip.push(dataFile[element])
                // Matches message objects destined for recipient userID. 
                // Also matches wildcard userID (0), ie. all users / global 'room'. 
            }
        }
        
    }
    getMessagesByRecip(dataFile);
    return messagesByRecip
}

module.exports = {
    getData
}