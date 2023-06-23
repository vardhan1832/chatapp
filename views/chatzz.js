const token = localStorage.getItem('token')

setInterval(async ()=>{
 
    let lastid;
    var chatarr = localStorage.getItem('chats')
    var realchatarr  =  JSON.parse(chatarr)
    if(realchatarr === null){
        realchatarr = [];
        lastid =undefined
    }else{
        lastid = realchatarr[realchatarr.length - 1].id
    }
    console.log('1st', lastid)
 
    const response = await axios.get(`http://localhost:3000/user/chats/${lastid}`,{ headers: { "Authorization" : token}})
    if(response.status === 201){
        realchatarr.push(...response.data.chat)
        console.log(realchatarr)
        localStorage.setItem('chats',JSON.stringify(realchatarr))
        localStorage.setItem('user',response.data.user)
         lastid = response.data.lastid
    }
    const user = localStorage.getItem('user')
    document.querySelector('.chat-messages').innerHTML = ''
    for(let i=0;i<realchatarr.length;i++){
        showchatonscreen(realchatarr[i])
    }
    console.log('2nt', lastid)
    document.querySelector('.chat-logs').innerHTML = `<div class="logs">${user}</div>`
},3000)

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
    //let lastid;
    var chatarr = localStorage.getItem('chats')
    var realchatarr  =  JSON.parse(chatarr)
    // if(realchatarr === null){
    //     realchatarr = [];
    //     lastid =undefined
    // }else{
    //     lastid = realchatarr[realchatarr.length - 1].id
    // }
    // console.log('1st', lastid)
 
    // const response = await axios.get(`http://localhost:3000/user/chats/${lastid}`,{ headers: { "Authorization" : token}})
    // if(response.status === 201){
    //     realchatarr.push(...response.data.chat)
    //     console.log(realchatarr)
    //     localStorage.setItem('chats',JSON.stringify(realchatarr))
    //     localStorage.setItem('user',response.data.user)
    //      lastid = response.data.lastid
    // }
    const user = localStorage.getItem('user')
    document.querySelector('.chat-messages').innerHTML = ''
    for(let i=0;i<realchatarr.length;i++){
        showchatonscreen(realchatarr[i])
    }
    // console.log('2nt', lastid)
    document.querySelector('.chat-logs').innerHTML += `<div class="logs">${user}</div>`
    
})

function showchatonscreen(data){
    document.querySelector('.chat-messages').innerHTML += `<div class="message">
    <span class="sender">${data.name}:</span>
    <span class="text">${data.chat}</span>
</div>`
}