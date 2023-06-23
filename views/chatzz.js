const token = localStorage.getItem('token')
// const userobj = parseJwt(token)

document.getElementById('sendmsg').onclick=async (e)=>{
    e.preventDefault();
    let msgobj = {
        msg : document.getElementById('text').value
    } 
    const response = await axios.post('http://localhost:3000/user/chat',msgobj,{ headers: { "Authorization" : token}})
    if(response.status === 201){
        document.querySelector('.chat-messages').innerHTML += `<div class="message">
        <span class="sender">${response.data.user}:</span>
        <span class="text">${response.data.chat}</span>
    </div>`
    }
   
}

window.addEventListener('DOMContentLoaded',(e)=>{
    e.preventDefault();
    // document.querySelector('.chat-logs').innerHTML += `<div class="logs">${userobj.name}</div>`
})

// function parseJwt (token) {
//     var base64Url = token.split('.')[1];
//     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));

//     return JSON.parse(jsonPayload);
// }