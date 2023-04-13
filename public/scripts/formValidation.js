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
        field.setAttribute("isValid", "true");
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


function isFormvalid() {
    const inputs = document.querySelectorAll("input");
    let valid = true;
    
    inputs.forEach((input) => {
      if (input.getAttribute("isValid") === "false") {
        valid = false;
      }
    });
  
    if (valid) {
      document.getElementById("form").submit();
    } else {
      return false;
    }
  }
  

setInterval(()=>{
    inputs.forEach((input)=>{
        if(input.value.length === 0){
            input.classList = ""
        }
    })
},1000);






