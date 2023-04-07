const pattern = {
    username : /^[0-9]{6}$/,
    name : /^[a-z\d\s]{2,15}$/i,
    password : /^[\w]{8,}$/i,
    email : /^([a-z]+)\.([a-z]+)\.(([0-9]{2})([a-z]{3}))@bmu.edu.in$/i
}


function validate(field,regex){
    let test = regex.test(field.value);
   if(test){
        field.className = "valid"
    }else{
        field.className = "invalid"
    }
}

const inputs = document.querySelectorAll('input');

inputs.forEach((input)=>{
    input.addEventListener('keyup',(e)=>{
        validate(e.target,pattern[e.target.attributes.name.value])
    })
})


function isFormvalid(){
    let enroll = document.getElementById('username');
    let username = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password')
   if(regex['username'].test(enroll.value) && regex['name'].test(username.value) &&
        regex['password'].test(password.value) && regex['email'].test(email.value)){

            return false;
        }else{
            document.getElementById("form").submit();
        }
}

setInterval(()=>{
    inputs.forEach((input)=>{
        if(input.value.length === 0){
            input.classList = ""
        }
    })
},1000);






