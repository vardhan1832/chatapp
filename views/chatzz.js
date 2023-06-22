const token = localStorage.getItem('token')
const userobj = parseJwt(token)

document.getElementById('sendmsg').onclick=(e)=>{
    e.preventDefault();
    let msg = document.getElementById('text').value;
    document.querySelector('.chat-messages').innerHTML += `<div class="message">
    <span class="sender">${userobj.name}:</span>
    <span class="text">${msg}</span>
</div>`
}

window.addEventListener('DOMContentLoaded',(e)=>{
    e.preventDefault();
    document.querySelector('.chat-logs').innerHTML += `<div class="logs">${userobj.name}</div>`
})

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}