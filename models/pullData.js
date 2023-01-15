const { json } = require('express');
const fs = require('fs');

function getData(){

    const jsonFile = fs.readFileSync('./messages.json', function(error){
        console.log(error)
    })

    return JSON.parse(jsonFile)
}

module.exports = {
    getData
}