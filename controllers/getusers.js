const fs = require('fs')

function getUsers(req, res){

    const userList = JSON.parse(fs.readFileSync('./userFile.json', function(err){
        console.log(err)
    }))
    let userObject = []
    // Username and userID, no password. 

    for(i = 0; i < userList.length; i++){
        let newObject = {
            "id": (userList[i].id),
            "username": (userList[i].username)
        }
        userObject.push(newObject)
    }
    console.log(userObject)
    res.send(userObject)
}

module.exports = {
    getUsers
}