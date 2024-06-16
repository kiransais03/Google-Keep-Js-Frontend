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

let loginbtn = document.getElementById('submit-btn');
let commentsdiv= document.getElementsByClassName('comments')[0];
let currentuserobj;

//Login button clicked
loginbtn.addEventListener('click',loginfunction);


async function loginfunction(event) {
    try {
     event.preventDefault();
     let email=document.getElementsByName('email')[0].value;
     let password=document.getElementsByName('password')[0].value;
     let loginresponse =  await fetch("https://google-keep-backend-node-h-c-n.onrender.com/user/loginuser",{method:"POST","headers":
        {'Content-Type':"application/json",},
        body:JSON.stringify({
            "loginId" : email,
             "password" : password
        })});
    let logindata = await loginresponse.json();
    if(logindata.status==200) {
        localStorage.setItem("accesstoken",logindata.data.token)
        localStorage.setItem("email",email);
        console.log("User Logged In",logindata);
        showmessage(logindata.message)
         setTimeout(redirectfunc,1000);
    }
    else {
        console.error(logindata.message);
        showmessage(logindata.message)
    }
    }
    catch(err) {
        console.log("Error during login",err);
        showmessage("Error during login")
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
    a.href="/pages/noteshomepage/noteshomepage.html"
    a.click();
}

if(localStorage.getItem('accesstoken')) {    //If already signed in redirect function
    redirectfunc();
}