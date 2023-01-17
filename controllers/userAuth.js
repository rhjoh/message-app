const fs = require('fs')

let loggedInStatus = 0;
let loggedInUserID;
let loggedInUserName;

function userAuth(req, res){


    const readFile = fs.readFileSync('./userFile.json', function(error){
        console.log(error)
    })

    const userFile = JSON.parse(readFile)
    res.status(201)
    const reqString = JSON.stringify(req.body);
    const reqObject = JSON.parse(reqString)


    for(i = 0; i < userFile.length; i++){        
        
        if((reqObject.username == userFile[i].username) && (reqObject.password == userFile[i].password)){
            console.log(`Found user and pass for: ${userFile[i].username}`)

            loggedInStatus = 1
            loggedInUserID = userFile[i].id
            loggedInUserName = userFile[i].username
            console.log("Logged in userID: " + loggedInUserID)
            break

        } else {
            loggedInStatus = null
            loggedInUserID = "000"
            loggedInUserName = null
        }
    }

    // TODO:
    // If I login with the wrong user, I can't login again with the right. 

    const resObject = {
        'loggedInStatus': loggedInStatus,
        'loggedInUserID': loggedInUserID,
        'loggedInUserName': loggedInUserName
    }
    res.write(JSON.stringify(resObject))
    res.end()

}

module.exports = {
    userAuth
}