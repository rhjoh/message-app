const messageButton = document.getElementById('button_messageSend')
const messageInput = document.getElementById('messageInput')
const chatContainer = document.getElementById('chat-panel')
const sideBar = document.getElementById('sidebar')
const loginButton = document.getElementById('buttonLogin')

let userListObject = []
let currentLoggedInUserId = 0;

function sendMessage(){

  const messageBody = messageInput.value;
  const date = new Date();
  const messageObject = {
  
    'sender_id': currentLoggedInUserId,
    'recip_id': 0,
    'timestamp':  date.toISOString(),
    'message': messageBody

  }
    fetch('/sendMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(messageObject)
  })

  .then((response) => console.log(response))
  .catch((error) => (console.log("Error", error)))
}
function loginAuth(loginUser, loginPass){

  const loginObject = {
    'username': loginUser,
    'password': loginPass
  }

  fetch('/userAuth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginObject)
  })
  .then((response) => response.json())
  .then((jsonResponse) => handleAuthResponse(jsonResponse))
  .catch((error) => console.log(error))

  function handleAuthResponse(data){
    const loggedInUserNameText = document.getElementById('loggedInUserName')

    if(data.loggedInUserName != null){
      currentLoggedInUserId = data.loggedInUserID
      const loggedInUserName = (data.loggedInUserName).toString()
      loggedInUserNameText.innerHTML = `Logged in as: ${loggedInUserName}`
      getUsers()

    } else {
      console.log("Invalid user")
      loggedInUserNameText.innerHTML = "Invalid username"
      const chatPanel = document.getElementById('chat-panel')
      chatPanel.innerHTML = "Error loading users messages" // This isn't removed on valid login because getMessages() only clears '.chat-message'
    }
  
  }
}

function getMessages(userID, senderID){

  document.querySelectorAll('.chat-message').forEach((element) => element.remove())

  fetch('/messages&userid=' + userID + '&senderid=' + senderID)
  .then((response) => response.json())
  .then((data) => populateChatPanel(data))
  .catch((error) => (console.log("Error", error)))

  function populateChatPanel(data) {

    for(let n = 0; n  < (data.length); n++){

    const messageDiv = document.createElement('div')
    const messageTimestamp = document.createElement('p')
    const messageSenderName = document.createElement('p')
    const messageMessage = document.createElement('p')
    const lineBreak = document.createElement('br')
    const sanitisedTimestamp = new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'long'}).format(new Date(data[n].timestamp));
    
    const matchingUsername = function(){
      // Nested for loop matches sender_id in the fetch response ('data') to the global user list to return a username.
      for (let i = 0; i < userListObject.length; i++){
        if(userListObject[i].id === data[n].sender_id){
          return userListObject[i].username
        }
      }
      }
    messageTimestamp.innerHTML = (sanitisedTimestamp.slice(0, (sanitisedTimestamp.length - 7))).replace(',', '')
    messageMessage.innerHTML = data[n].message
    messageSenderName.innerHTML = matchingUsername()

    messageDiv.classList.add('chat-message')
    messageTimestamp.classList.add('chat-timestamp')
    messageMessage.classList.add('chat-message')
    messageSenderName.classList.add('chat-username')

    messageDiv.appendChild(messageTimestamp)
    messageDiv.appendChild(messageSenderName)
    messageDiv.appendChild(messageMessage)
    messageDiv.appendChild(lineBreak)
    chatContainer.appendChild(messageDiv)
    }
  }
}

function getUsers(){
  fetch('/users')
  .then((response) => response.json())
  .then((json) => {
    // Push users to global userListObject.
    for(i = 0; i < (json.length); i++){
      userListObject.push(json[i])
    }
    console.log(userListObject)
    populateUsernames(json)
    } 
  )

  function populateUsernames(data){
    const sendMessageText = document.createElement('p')
    sendMessageText.innerHTML = "Send a message to: "
    sideBar.appendChild(sendMessageText)

    for(i = 0; i < data.length; i++){
      const usernameDiv = document.createElement('div')
      const usernameName = document.createElement('p')
      usernameName.innerHTML = data[i].username
      usernameDiv.classList.add('sidebar-username')
      usernameDiv.appendChild(usernameName)
      sideBar.appendChild(usernameDiv)
    }
  }
}

  window.onload = (e) => {
    console.log("Page loaded.")
  }

  loginButton.addEventListener('click', (e) => {
    const loginUser = document.getElementById('usernameInput').value
    const loginPass = document.getElementById('passwordInput').value

    loginAuth(loginUser, loginPass);
  })

  messageButton.addEventListener('click', (e) => {
    sendMessage()
    getMessages()
    }
  )

  sideBar.addEventListener('click', (e) => {
    // Event listener for the username div, not <p>.
    if(e.target.parentElement.className == 'sidebar-username'){

      const clickedUsername = (e.target.innerHTML)
      const clickedUserID = function(username){
        for(i = 0; i < userListObject.length; i++){
          if(username == userListObject[i].username){
            return userListObject[i].id
          }
        }
      }
      getMessages(currentLoggedInUserId, clickedUserID(clickedUsername))
    }
  })