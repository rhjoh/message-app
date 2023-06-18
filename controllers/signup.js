const fs = require('fs')

function signupNewUser(req, res){
    const signupUser = req.query.username
    const signupPass = req.query.password

    const userList = JSON.parse(fs.readFileSync('./userFile.json', function(err){
        console.log(err)
    }))

    function checkExists(signupUser, signupPass){
        let exists = false;
        for(i = 0; i < userList.length; i++){
            if(signupUser == userList[i].username){
                console.log("User was found at index " + i)
                exists = true;
                break
            } else if(signupUser != userList[i].username) {
                console.log("User not found at index " + i)
            }
        }
        if(exists){
            res.end(JSON.stringify("user_already_exists"))
        } else if (!exists){
            writeUser(signupUser, signupPass)
            res.end(JSON.stringify("user_created"))
        }
    }

    function writeUser(signupUser, signupPass){
        let userIDValues = []
        for(i = 0; i < userList.length; i++){
            userIDValues.push(Number(userList[i].id))
        }
        // Adds 1 to the highest value in the userID array. 
        newUserID = Math.max(...userIDValues) + 1
        newUserObject = {
            "id": newUserID,
            "username": signupUser,
            "password": signupPass
        }
        console.log(newUserObject)
        userList.push(newUserObject)
        fs.writeFileSync('./userFile.json', JSON.stringify(userList))
    }
    checkExists(signupUser, signupPass)
    res.status(201) // Created 
    res.end()
}

module.exports = {
    signupNewUser
}