const socket = io('http://localhost:3000')

const messageForm = document.getElementById('form');
const messageList = document.getElementById('messages');
const messageInput = document.getElementById('input');

const appendMessage = message => {
    var item = document.createElement('li');
    item.textContent = message;
    messageList.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
}

const name = prompt('What is your name ?')
appendMessage('You Joined')
socket.emit('new-user', name)

socket.on('chat-message', data => {
    appendMessage(`${data.name} : ${data.message}`)
})

socket.on('user-connected', name => {
    appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`)
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (messageInput.value) {
        appendMessage(`You : ${messageInput.value}`)
        socket.emit('send-chat-message', messageInput.value);
        messageInput.value = '';
    }
});



