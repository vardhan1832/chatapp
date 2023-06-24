const token = localStorage.getItem('token')
const userobj = parseJwt(token)

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

setInterval(async ()=>{
    let lastid;
    var chatarr = localStorage.getItem('chats')
    var realchatarr  =  JSON.parse(chatarr)
    if(realchatarr === null || realchatarr.length === 0){
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
},5000)

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
    var chatarr = localStorage.getItem('chats')
    var realchatarr  =  JSON.parse(chatarr)

    const response = await axios.get(`http://localhost:3000/groups`,{ headers: { "Authorization" : token}})
    if(response.status === 201){
        document.querySelector('.chat-logs').innerHTML = ''
        for(let i=0;i<response.data.groups.length;i++){
            document.querySelector('.chat-logs').innerHTML += `<div class="logs">
            <button id="id_${response.data.groups[i].id}"
             style="width: 100%;background-color: white;border:1px solid #ccc;">
            <h5>${response.data.groups[i].groupname}</h5>
            </button></div>`
        }
    }

    const user = localStorage.getItem('user')
    document.querySelector('.chat-messages').innerHTML = ''
    for(let i=0;i<realchatarr.length;i++){
        showchatonscreen(realchatarr[i])
    }    
})

function showchatonscreen(data){
    document.querySelector('.chat-messages').innerHTML += `<div class="message">
    <span class="sender">${data.name}:</span>
    <span class="text">${data.chat}</span>
</div>`
}

document.getElementById('group').onclick= async (e) =>{
    e.preventDefault();
    const group_name = prompt("Enter Group Name")
    const response = await axios.post('http://localhost:3000/group',{groupName: group_name},{ headers: { "Authorization" : token}})
    document.querySelector('.chat-logs').innerHTML += `<div class="logs">
    <button id="id_${response.data.grpid}"
     style="width: 100%;background-color: white;border:1px solid #ccc;margin-bottom:0px;margin-top:0px">
    <h5>${group_name}</h5>
    </button></div>`
}

