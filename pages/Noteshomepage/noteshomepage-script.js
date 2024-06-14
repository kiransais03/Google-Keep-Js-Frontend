
let navbarhomepagediv = document.getElementsByClassName('navbarhomepagediv')[0];
let pinnednotesdiv = document.getElementsByClassName('pinnednotesdiv')[0];
let othernotesdiv = document.getElementsByClassName('othernotesdiv')[0];


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
        let navbar = await fetch("../../components/navbar/navbar.html");
        let response = await navbar.text();
        navbarhomepagediv.innerHTML = response;
        await loadScript("../../components/navbar/navbar-script.js");
    }
    catch(err) {
        console.log("Failed to fetch the navbar component",err)
    }
    
}


//Function to load one html from another html file-script 
// and making the script files load synchronously one after another
async function showpinnednotesdivdisplaycomponent() {
    try {
    let notesdisplay = await fetch("../../components/notedisplay/notedisplay.html");
    let response = await notesdisplay.text();
    pinnednotesdiv.innerHTML = response;
    await loadScript("../../components/Notedisplay/notedisplay-script.js");
   }
    catch (err) {
        console.log("Failed to fetch notedisplay component",err)
    }
   
}


//Function to load one html from another html file-script 
// and making the script files load synchronously one after another
async function showothernotesdivdisplaycomponent() {
    try {
    let notesdisplay = await fetch("../../components/notedisplay/notedisplay.html");
    let response = await notesdisplay.text();
    othernotesdiv.innerHTML = response;
    // await loadScript("../../components/Notedisplay/notedisplay-script.js");
   }
    catch (err) {
        console.log("Failed to fetch notedisplay component",err)
    }
   
}


//after all script files are completely executed,"getnotesanddisplay()" function is available.Now we can call it with "usernotesarr" argument
async function fetchandshowpinnednotes () {
    let notesresponse =  await fetch("http://localhost:8080/notes/getnotes",{method:"GET","headers":
        {'Content-Type':"application/json",
          'Token-Googlekeep':"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtpcmFuc2FpczAzIiwibmFtZSI6IktpcmFuIFNhaSIsImVtYWlsIjoia2lyYW5zYWlzMDNAZ21haWwuY29tIiwidXNlcklkIjoiNjY2NzI2MTVhZWFmNzgwNDgyZDAzNjE2IiwiaWF0IjoxNzE4MDM2MDI2fQ.SnZ5u3T9PzwowrpyW2AxaqzJ2Nmd2FkTC2dCQRx9NLs"
        }});
    let notesdata = await notesresponse.json();
    let filteredusernotesarr = notesdata.notesarr[0].usernotes.filter((currObj,index)=>{
        if(currObj.pinselected && !currObj.trashed && !currObj.archived)
            {
                return currObj;
            } 
    })
    let notesdiv = document.getElementsByClassName('notesdiv')[0];
    let labelslistarr1 = notesdata.notesarr[0].labelslist
    await getnotesanddisplay(notesdiv,filteredusernotesarr,labelslistarr1);
    console.log("hilton")
}



//after all script files are completely executed,"getnotesanddisplay()" function is available.Now we can call it with "usernotesarr" argument
async function fetchandshowothernotesdiv () {
    let notesresponse =  await fetch("http://localhost:8080/notes/getnotes",{method:"GET","headers":
        {'Content-Type':"application/json",
          'Token-Googlekeep':"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtpcmFuc2FpczAzIiwibmFtZSI6IktpcmFuIFNhaSIsImVtYWlsIjoia2lyYW5zYWlzMDNAZ21haWwuY29tIiwidXNlcklkIjoiNjY2NzI2MTVhZWFmNzgwNDgyZDAzNjE2IiwiaWF0IjoxNzE4MDM2MDI2fQ.SnZ5u3T9PzwowrpyW2AxaqzJ2Nmd2FkTC2dCQRx9NLs"
        }});
    let notesdata = await notesresponse.json();
    let filteredusernotesarr = notesdata.notesarr[0].usernotes.filter((currObj,index)=>{
        if(!(currObj.pinselected) && !currObj.trashed && !currObj.archived)
            {
                return currObj;
            } 
    })
    let notesdiv = document.getElementsByClassName('notesdiv')[1];
    let labelslistarr1 = notesdata.notesarr[0].labelslist
    await getnotesanddisplay(notesdiv,filteredusernotesarr,labelslistarr1);
    console.log("hilton")
}


async function loadscriptfilesonebyone () {
   await shownavbarcomponent();
   await showpinnednotesdivdisplaycomponent();
   await showothernotesdivdisplaycomponent();
   await fetchandshowpinnednotes();
   await fetchandshowothernotesdiv();
   }
   
loadscriptfilesonebyone()


