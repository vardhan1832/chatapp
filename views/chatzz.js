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

document.getElementById('logout').onclick = (e)=>{
    e.preventDefault()
    window.location.href='./login.html';
}

// setInterval(async ()=>{
//     let lastid;
//     var chatarr = localStorage.getItem('chats')
//     var realchatarr  =  JSON.parse(chatarr)
//     if(realchatarr === null || realchatarr.length === 0){
//         realchatarr = [];
//         lastid =undefined
//     }else{
//         lastid = realchatarr[realchatarr.length - 1].id
//     }
  
//     const response = await axios.get(`http://localhost:3000/user/chats/${lastid}`,{ headers: { "Authorization" : token}})
//     if(response.status === 201){
//         realchatarr.push(...response.data.chat)
//         console.log(realchatarr)
//         localStorage.setItem('chats',JSON.stringify(realchatarr))
//         localStorage.setItem('user',response.data.user)
//          lastid = response.data.lastid
//     }
//    // const user = localStorage.getItem('user')
//     document.querySelector('.chat-messages').innerHTML = ''
//     for(let i=0;i<realchatarr.length;i++){
//         showchatonscreen(realchatarr[i])
//     }
// },5000)

document.getElementById('sendmsg').onclick=async (e)=>{
    e.preventDefault();
    let msgobj = {
        msg : document.getElementById('text').value,
        groupId : localStorage.getItem('groupId')
    } 
    const response = await axios.post('http://localhost:3000/user/chat',msgobj,{ headers: { "Authorization" : token}})
    if(response.status === 201){
        showchatonscreen(response.data)
    }
}

window.addEventListener('DOMContentLoaded',async (e)=>{
    e.preventDefault();
    // var chatarr = localStorage.getItem('chats')
    // var realchatarr  =  JSON.parse(chatarr)

    const response = await axios.get(`http://localhost:3000/groups`,{ headers: { "Authorization" : token}})
    if(response.status === 201){
        document.querySelector('.chat-logs').innerHTML = ''
        for(let i=0;i<response.data.groups.length;i++){
            document.querySelector('.chat-logs').innerHTML += `<div class="logs">
            <button id=${response.data.groups[i].id} onclick="getgrpchat(event)"
             style="width: 100%;background-color: white;border:1px solid #ccc;">
            <h5>${response.data.groups[i].groupname}</h5>
            </button></div>`
        }
    }

    // const user = localStorage.getItem('user')
    // document.querySelector('.chat-messages').innerHTML = ''
    // for(let i=0;i<realchatarr.length;i++){
    //     showchatonscreen(realchatarr[i])
    // }    
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
    <button id=${response.data.grpid}  onclick="getgrpchat(event)"
     style="width: 100%;background-color: white;border:1px solid #ccc;margin-bottom:0px;margin-top:0px">
    <h5>${group_name}</h5>
    </button></div>`
}

async function getgrpchat(e){
    e.preventDefault()  
    const groupId = parseInt(e.target.id) 
    localStorage.setItem("groupId",groupId) 
    document.querySelector('.chat-input').style.display = "flex"
    const response = await axios.get('http://localhost:3000/group/chat',{ headers: { "Authorization" : token , 'groupId': groupId}})
    if(response.status === 201){
        localStorage.setItem('isadmin',JSON.stringify(response.data.isadmin))
        if(response.data.isadmin){
            document.getElementById('addUsers').innerHTML = `<button style="height: fit-content;" id=${groupId} onclick="addusers(event)" class="btn mr-md-2 mb-md-0 mb-2 btn-outline-dark">Add contacts</button>`
        }   
        document.getElementById('users_in_grp').style.display = 'block'
        document.getElementById('users').innerHTML = `<option style="display: none;">Users in group</option>`
        if(response.data.groupUsers !== null){
            for(let i=0;i<response.data.groupUsers.length;i++){
                if(response.data.groupUsers[i].isadmin){
                    document.getElementById('users').innerHTML +=  `<option value="${response.data.groupUsers[i].userId}">${response.data.groupUsers[i].userName}   admin</option>`
                }else{
                    document.getElementById('users').innerHTML +=  `<option value="${response.data.groupUsers[i].userId}">${response.data.groupUsers[i].userName}</option>`
                }            
            }
        }
       
        document.querySelector('.chat-messages').innerHTML = ''
        if(response.data.chat !== null){
            for(let i=0;i<response.data.chat.length;i++){
                showchatonscreen(response.data.chat[i])
            }
        }  
    }
}

async function addusers(e){
    e.preventDefault()
    let groupId = e.target.id
    let usermail = prompt('Enter mail to add contact')
    const response = await axios.get(`http://localhost:3000/user/group/${usermail}`,{ headers: { "Authorization" : token , 'groupId': groupId}})
    if(response.status === 201){
        alert(response.data.message)
        document.getElementById('users').innerHTML +=  `<option value="${response.data.addeduser.id}">${response.data.addeduser.name}</option>`
    }else if(response.status === 200){
        alert(response.data.message)
    }
}

async function adminpowers(e){
    e.preventDefault();
    const isadmin = localStorage.getItem('isadmin')
    if(isadmin === 'true'){
        const uid = document.getElementById('users').value;
        localStorage.setItem('useridofselect',uid)
        document.getElementById('adminusers').style.display = 'block';
    }
}

document.getElementById('close').onclick = async (e)=>{
    e.preventDefault()
    document.getElementById('adminusers').style.display = 'none';
}
document.getElementById('makeadmin').onclick = async (e)=>{
    e.preventDefault()
    const userid = localStorage.getItem('useridofselect')
    const groupId = localStorage.getItem('groupId')
    const response = await axios.get(`http://localhost:3000/user/group/admin/${userid}`,{ headers: { "Authorization" : token , 'groupId': groupId}})
    document.getElementById('adminusers').style.display = 'none';
}
document.getElementById('remove').onclick = async (e)=>{
    e.preventDefault()
    const userid = localStorage.getItem('useridofselect')
    const groupId = localStorage.getItem('groupId')
    if(confirm('Are you sure?')){
        const response = await axios.delete(`http://localhost:3000/user/group/remove/${userid}`,{ headers: { "Authorization" : token , 'groupId': groupId}})
        if(response.status === 201){
        var removeduser = document.getElementById('users')
        removeduser.remove(removeduser.selectedIndex)
        document.getElementById('adminusers').style.display = 'none';
        }
    }
}