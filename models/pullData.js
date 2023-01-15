const { json } = require('express');
const fs = require('fs');
const path = require('path');


/* const jsonFile = fs.readFileSync('./messages.json', function(error){
    console.log(error)
}) */

function getData(){

    const jsonFile = fs.readFileSync('./messages.json', function(error){
        console.log(error)
    })

/*     console.log("Get data model pulling from data file: ")
    console.log(JSON.parse(jsonFile)) */
    return JSON.parse(jsonFile)
}

module.exports = {
    getData
}