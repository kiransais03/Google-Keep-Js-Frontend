
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
   
loadscriptfilesonebyone()


function redirectfunc(event) {   //Redirect function
    let a=document.createElement('a');
    a.href="/pages/noteshomepage/noteshomepage.html"
    a.click();
}

if(localStorage.getItem('accesstoken')) {    //If already signed in redirect function
    redirectfunc();
}