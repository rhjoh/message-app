const messageButton = document.getElementById('button_messageSend')
const messageInput = document.getElementById('messageInput')
const chatContainer = document.getElementById('chat-panel')
const sideBar = document.getElementById('sidebar')
const loginButton = document.getElementById('buttonLogin')

function sendMessage(){

  const messageBody = messageInput.value;
  const date = new Date();
  const messageObject = {
  
    'timestamp':  date.toISOString(),
    'userID': 0, // Placeholder for now 
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
      console.log("Got valid user")
      const loggedInUserName = (data.loggedInUserName).toString()
      loggedInUserNameText.innerHTML = `Logged in as: ${loggedInUserName}`
      getMessages(data.loggedInUserID)
      getUsers()

    } else {
      console.log("Invalid user")
      loggedInUserNameText.innerHTML = "Invalid username"
      const chatPanel = document.getElementById('chat-panel')
      chatPanel.innerHTML = "Error loading users messages" // This isn't removed on valid login because getMessages() only clears '.chat-message'
    }
  
  }
}

function getMessages(userID){

  document.querySelectorAll('.chat-message').forEach((element) => element.remove())

  fetch('/messages&userid=' + userID)
  .then((response) => response.json())
  .then((data) => populateChatPanel(data))
  .catch((error) => (console.log("Error", error)))


  function populateChatPanel(data) {

    console.log(userID)
    console.log(data)
    for(let n = 0; n  < (data.length); n++){

    const messageDiv = document.createElement('div')
    const messageTimestamp = document.createElement('p')
    const messageUserID = document.createElement('p')
    const messageMessage = document.createElement('p')
    const lineBreak = document.createElement('br')

    const sanitisedTimestamp = new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'long'}).format(new Date(data[n].timestamp));

    messageTimestamp.innerHTML = sanitisedTimestamp.slice(0, (sanitisedTimestamp.length - 7))
    messageUserID.innerHTML = data[n].userID
    messageMessage.innerHTML = data[n].message
    messageDiv.classList.add('chat-message')
    messageTimestamp.classList.add('chat-timestamp')
    messageUserID.classList.add('chat-userid')
    messageMessage.classList.add('chat-message')
    messageDiv.appendChild(messageTimestamp)
    messageDiv.appendChild(messageMessage)
    messageDiv.appendChild(lineBreak)

    chatContainer.appendChild(messageDiv)
    }
  }
}

function getUsers(){
  fetch('/users')
  .then((response) => response.json())
  .then((json) => populateUsernames(json))

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

      /* 
        TODO:
        Need to get the userID from the username in the <p> body, pass that to getMessages(userID).
        Need to save the returned /users object globally (ln 111) to match username:userID. 

      
      */

    }
  })