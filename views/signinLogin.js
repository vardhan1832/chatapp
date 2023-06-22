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
           // window.location.href='./login.html';
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
        }else{
            throw new Error(response.data.message)
        }
    }
    catch(err){
        console.log("Error in Signup", err);
    }
}