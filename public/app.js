const messageButton = document.getElementById('button_messageSend');
const messageInput = document.getElementById('messageInput');

const updateButton = document.getElementById('button_Update')
const chatContainer = document.getElementById('chat-panel')


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

function testGet(){
  fetch('/messages')
  .then((response) => response.json())
  .then((json) => console.log(json))
}

function getMessages(){

  document.querySelectorAll('.chat-message').forEach((element) => element.remove())

  fetch('/messages')
  .then((response) => response.json())
  .then((data) => populateChatPanel(data))
  .catch((error) => (console.log("Error", error)))


  function populateChatPanel(data) {

    console.log(data)
    for(let n = 0; n  < (data.length); n++){

    const messageDiv = document.createElement('div')
    const messageTimestamp = document.createElement('p')
    const messageUserID = document.createElement('p')
    const messageMessage = document.createElement('p')
    const lineBreak = document.createElement('br')

    //const sanitisedTimestamp = new Date(data[n].timestamp)
    //console.log(sanitisedTimestamp.toDateString())

    const sanitisedTimestamp = new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'long'}).format(new Date(data[n].timestamp));
    console.log(sanitisedTimestamp.slice(0, (sanitisedTimestamp.length - 7)))

    // 15/01/2023, 00:16:51 GMT+11
    // 2023-01-14T12:48:29.017Z
    // San: 
    // Sun Jan 15 2023 00:16:51 GMT+1100 (Australian Eastern Daylight Time)


    //messageTimestamp.innerHTML = data[n].timestamp
    messageTimestamp.innerHTML = sanitisedTimestamp.slice(0, (sanitisedTimestamp.length - 7))
    messageUserID.innerHTML = data[n].userID
    messageMessage.innerHTML = data[n].message
    messageDiv.classList.add('chat-message')
    messageTimestamp.classList.add('chat-timestamp')
    messageUserID.classList.add('chat-userid')
    messageMessage.classList.add('chat-message')
    messageDiv.appendChild(messageTimestamp)
    //messageDiv.appendChild(messageUserID)
    messageDiv.appendChild(messageMessage)
    messageDiv.appendChild(lineBreak)

    chatContainer.appendChild(messageDiv)
    }

  }

  }


  window.onload = (e) => {
    console.log("Page loaded.")
    getMessages();
  }

  messageButton.addEventListener('click', (e) => {
    //document.querySelectorAll('.chat-message').forEach((element) => element.remove())
    sendMessage()
    getMessages()
    }
  )
