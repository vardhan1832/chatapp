const token = localStorage.getItem('token')

setInterval(async ()=>{
    const response = await axios.get('http://localhost:3000/user/chats',{ headers: { "Authorization" : token}})
    if(response.status === 201){
        document.querySelector('.chat-messages').innerHTML = ''
        for(let i=0;i<response.data.chat.length;i++){
            showchatonscreen(response.data.chat[i])
       }
    }
},1000)

document.getElementById('sendmsg').onclick=async (e)=>{
    e.preventDefault();
    let msgobj = {
        msg : document.getElementById('text').value
    } 
    const response = await axios.post('http://localhost:3000/user/chat',msgobj,{ headers: { "Authorization" : token}})
    if(response.status === 201){
        showchatonscreen(response.data)
    }
   
}

window.addEventListener('DOMContentLoaded',async (e)=>{
    e.preventDefault();
    const response = await axios.get('http://localhost:3000/user/chats',{ headers: { "Authorization" : token}})
    if(response.status === 201){
       for(let i=0;i<response.data.chat.length;i++){
            showchatonscreen(response.data.chat[i])
       }
    }
    document.querySelector('.chat-logs').innerHTML += `<div class="logs">${response.data.user}</div>`
})

function showchatonscreen(data){
    document.querySelector('.chat-messages').innerHTML += `<div class="message">
    <span class="sender">${data.name}:</span>
    <span class="text">${data.chat}</span>
</div>`
}