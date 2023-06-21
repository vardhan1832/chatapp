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
        }else{
            throw new Error('failed to signin');
        }
    }catch(err){
        console.log("Error in Signup", err);
    }
}