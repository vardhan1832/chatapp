async function signup(e){
    try{
        e.preventDefault();
        const userObj = {
            name: e.target.name.value,
            email: e.target.mail.value,
            number: e.target.phonenum.value,
            password: e.target.password.value
        }
        console.log(userObj)
        const response = await axios.post('http://localhost:3000/user/sign-up',userObj)
        if(response.status===201){
           window.location.href='./login.html';
           alert(response.data.message)
        }else{
            throw new Error('failed to signin');
        }
    }catch(err){
        console.log("Error in Signup", err);
    }
}

async function login(e){
    try{
        e.preventDefault();
        const loginDetails = {
            email: e.target.mail.value,
            password: e.target.password.value
        }
        const response = await axios.post('http://localhost:3000/user/login',loginDetails)
        if(response.status === 201){
            alert(response.data.message)
            localStorage.setItem('token',response.data.token)
            window.location.href='./chat.html';
        }else{
            throw new Error(response.data.message)
        }
    }
    catch(err){
        document.body.innerHTML += `<section class="container"><div style="color:red;">${err.message}</div></section>`
    }
}