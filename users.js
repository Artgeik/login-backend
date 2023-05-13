const users={"maroon5@gmail.com":"This1s@Password"};

const addUser=(mail,password)=>{
    const dmail=mail.toString();
    const dpassword=password.toString()
    users[dmail]=dpassword;
    console.log(users);
    return {dashboard:true};
};

const checkUser=(mail,password)=>{
    if(users.hasOwnProperty(mail.toString())){
        if(users[mail.toString()]==password.toString()){
            console.log(users);
            return {dashboard:true};
        }else{
            return {error:true,exception:{response:{data:"please Enter a valid email and password"}}};
        }
    }else{
        return {error:true,exception:{response:{data:"please Enter a valid email and password"}}};
    }
    
};

module.exports={checkUser,addUser};
