const fs = require('fs')

/* const jsonFile = fs.readFileSync('./messages.json', function(error){
    console.log(error)
}) */


function writeData(data){

    const jsonFile = fs.readFileSync('./messages.json', function(error){
        console.log(error)
    })
    let newArray = JSON.parse(jsonFile)
    newArray.push(data)

    fs.writeFileSync('./messages.json', JSON.stringify(newArray))
}

module.exports = {
    writeData
}