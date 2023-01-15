const fs = require('fs')

/* const jsonFile = fs.readFileSync('./messages.json', function(error){
    console.log(error)
}) */


function writeData(data){

    const jsonFile = fs.readFileSync('./messages.json', function(error){
        console.log(error)
    })
    /* console.log("writeData() model happening: ") */
    let newArray = JSON.parse(jsonFile)
    /* console.log(typeof(newArray))
    console.log(newArray)
    console.log("writeData() end, new messages:") */
    newArray.push(data)

    fs.writeFileSync('./messages.json', JSON.stringify(newArray))
}

module.exports = {
    writeData
}