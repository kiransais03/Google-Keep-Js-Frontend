let navbarhomepagediv = document.getElementsByClassName('navbarhomepagediv')[0];


//To wait for the script file to execute completely using(onload Promise).This ensures that file runs
//one by one in order
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
}


//Function to load one html from another html file-script 
// and making the script files load synchronously one after another
async function shownavbarcomponent () {
    try {
        let navbar = await fetch("../../components/noaccountnavbar/noaccountnavbar.html");
        let response = await navbar.text();
        navbarhomepagediv.innerHTML = response;
        await loadScript("../../components/noaccountnavbar/noaccountnavbar-script.js");
    }
    catch(err) {
        console.log("Failed to fetch the navbar component",err)
    }
    
}



async function loadscriptfilesonebyone () {
   await shownavbarcomponent();
   }
   
loadscriptfilesonebyone();

let signupbtn = document.getElementById('submit-btn');
let commentsdiv= document.getElementsByClassName('comments')[0];
let currentuserobj;

//Signup button clicked
signupbtn.addEventListener('click',signupfunction);


async function signupfunction(event) {
    try {
     event.preventDefault();
     let name=document.getElementsByName('name')[0].value;
     let username=document.getElementsByName('username')[0].value;
     let email=document.getElementsByName('email')[0].value;
     let password=document.getElementsByName('password')[0].value;
     let confirmpass=document.getElementsByName('confirmpass')[0].value;
     if(password===confirmpass) {
        signupbtn.innerHTML='<div class="loader" style="margin:0 auto"></div>'
     let signupresponse =  await fetch("https://google-keep-backend-node-h-c-n.onrender.com/user/register",{method:"POST","headers":
        {'Content-Type':"application/json",},
        body:JSON.stringify({
            "name": name,
            "username": username,
            "password": password,
            "email": email
        })});
    let signupdata = await signupresponse.json();
    if(signupdata.status==201) {
    console.log("User Registered",signupdata);
    showmessage(signupdata.message)
     setTimeout(redirectfunc,1000);
    }
    else {
        signupbtn.innerHTML='Signup'
        console.error(signupdata.message)
        showmessage(signupdata.message)
    }
    }
    else {
        signupbtn.innerHTML='Signup'
        showmessage("Please recheck Password and Confirm password")
       console.error("Please recheck password and confirm password")
    }
    }
    catch(err) {
        signupbtn.innerHTML='Signup'
        console.log("Error during Signup",err)
        showmessage("Error during Signup")
    }
} 


function showmessage(msg) {  //Show Messages Function
 let div2=document.createElement('div');
 div2.innerText=msg;
 div2.classList.add('green');
 div2.style.marginBottom='10px';
 if(!document.getElementsByClassName('green')[0])
  {
    commentsdiv.append(div2);
    setTimeout(() => {
    if(document.getElementsByClassName('green')[0]) 
    document.getElementsByClassName('green')[0].remove();},5000);
  }

 }

 function redirectfunc(event) {   //Redirect function
    let a=document.createElement('a');
    a.href="/pages/loginpage/loginpage.html"
    a.click();
}

if(localStorage.getItem('accesstoken')) {    //If already signed in redirect function
    redirectfunc();
}