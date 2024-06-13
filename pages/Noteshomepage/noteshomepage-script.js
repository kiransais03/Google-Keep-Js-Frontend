let navbarhomepage = document.getElementsByClassName('navbarhomepage')[0];
let noteshomepagediv = document.getElementsByClassName('noteshomepage')[0];


//Function to load one html from another html file-script 
// and making the script files load synchronously one after another
async function shownavbarcomponent () {
    try {
        let navbar = await fetch("../../components/navbar/navbar.html");
        let response = await navbar.text();
        navbarhomepage.innerHTML = response;
        let firstscript = document.getElementById("first");
        firstscript.setAttribute('src',"../../components/navbar/navbar-script.js")
    }
    catch(err) {
        console.log("Failed to fetch the navbar component",err)
    }
    
}



//Function to load one html from another html file-script 
// and making the script files load synchronously one after another
async function shownotesdisplaycomponent() {
    try {
        let notesdisplay = await fetch("../../components/notedisplay/notedisplay.html");
    let response = await notesdisplay.text();
    noteshomepagediv.innerHTML = response;
    let secondscript = document.getElementById('second');
    secondscript.setAttribute('src',"../../components/Notedisplay/notedisplay-script.js"); 
    }
    catch (err) {
        console.log("Failed to fetch notedisplay component",err)
    }
   
}


async function loadscriptfilesonebyone () {
   await shownavbarcomponent();
   await shownotesdisplaycomponent();
}

loadscriptfilesonebyone()