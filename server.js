const express = require('express');
const path = require('path');
const fs = require('fs');

//const jsonfile = fs.readFileSync(path.join(__dirname, 'messages.json'))

// Controllers 
const getMessages = require('./controllers/getmessages.js')
const sendMessage = require('./controllers/sendmessage.js');
const userAuth = require('./controllers/userAuth.js');
const getusers = require('./controllers/getusers.js');
const signup = require('./controllers/signup.js');
const { allowedNodeEnvironmentFlags } = require('process');
const { sign } = require('crypto');

const app = express();


app.use(express.static(path.join(__dirname, '/public')))
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Got /")

})

app.get('/messages&userid=:userid&senderid=:senderid', (req, res) => {
    getMessages.getMessages(req, res)

})

app.get('/users', (req, res) => {
    getusers.getUsers(req, res)
})

app.post('/sendMessage', (req, res) => {
    sendMessage.sendMessage(req, res)

})

app.post('/userAuth', (req, res) => {
    userAuth.userAuth(req, res)
})

app.post('/signup', (req, res) => {
    signup.signupNewUser(req, res)

})


app.listen(8000, () => {
    console.log("Listening on 8000.")
})