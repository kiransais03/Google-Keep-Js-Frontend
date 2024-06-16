
let navbarhomepagediv = document.getElementsByClassName('navbarhomepagediv')[0];
let pinnednotesdiv = document.getElementsByClassName('pinnednotesdiv')[0];
let othernotesdiv = document.getElementsByClassName('othernotesdiv')[0];
let createnotesdiv = document.getElementsByClassName('createnotesdiv')[0];


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

//Function to load one html from another html file-script 
// and making the script files load synchronously one after another
async function showaddnewnotesform() {
    try {
    let notesdisplay = await fetch("../../components/notedisplay/notedisplay.html");
    let response = await notesdisplay.text();
    createnotesdiv.innerHTML = response;
    // await loadScript("../../components/Notedisplay/notedisplay-script.js");
   }
    catch (err) {
        console.log("Failed to fetch notedisplay component",err)
    }
   
}



//API call to get notes data
async function getnotearrfromdb () {
    try {
    let accesstoken = localStorage.getItem('accesstoken');
    let notesresponse =  await fetch("https://google-keep-backend-node-h-c-n.onrender.com/notes/getnotes",{method:"GET","headers":
        {'Content-Type':"application/json",
          'Token-Googlekeep':`Bearer ${accesstoken}`
        }});
    let notesdata = await notesresponse.json();
    return notesdata;
    }
    catch(err) {
        console.log("Failed to get notes arr from db",err)
    }
}

//after all script files are completely executed,"getnotesanddisplay()" function is available.Now we can call it with "usernotesarr" argument
async function fetchandshowaddnewnotesform (notesdata) {
    let notesdiv = document.getElementsByClassName('notesdiv')[0];
    console.log("Notesdiv new",notesdiv)
    let labelslistarr1 = notesdata.notesarr[0].labelslist;
    let newemptyusernotearr = [{
      "id": new Date().getTime(),
      "title": "",
      "text": "",
      "pinselected": false,
      "archived": false,
      "trashed": false,
      "notebgcolour": "#ffffff",
      "labels": labelslistarr1
    }]
    await getnotesanddisplay(notesdiv,newemptyusernotearr,labelslistarr1);
    console.log("hilton")
}


//after all script files are completely executed,"getnotesanddisplay()" function is available.Now we can call it with "usernotesarr" argument
async function fetchandshowpinnednotes (notesdata) {
    let filteredusernotesarr = notesdata.notesarr[0].usernotes.filter((currObj,index)=>{
        if(currObj.pinselected && !currObj.trashed && !currObj.archived)
            {
                return currObj;
            } 
    })
    let notesdiv = document.getElementsByClassName('notesdiv')[1];
    let labelslistarr1 = notesdata.notesarr[0].labelslist
    await getnotesanddisplay(notesdiv,filteredusernotesarr,labelslistarr1);
    console.log("hilton")
}



//after all script files are completely executed,"getnotesanddisplay()" function is available.Now we can call it with "usernotesarr" argument
async function fetchandshowothernotesdiv (notesdata) {
    let filteredusernotesarr = notesdata.notesarr[0].usernotes.filter((currObj,index)=>{
        if(!(currObj.pinselected) && !currObj.trashed && !currObj.archived)
            {
                return currObj;
            } 
    })
    let notesdiv = document.getElementsByClassName('notesdiv')[2];
    let labelslistarr1 = notesdata.notesarr[0].labelslist
    await getnotesanddisplay(notesdiv,filteredusernotesarr,labelslistarr1);
    console.log("hilton")
}


async function loadscriptfilesonebyone () {
   await shownavbarcomponent();
   await showaddnewnotesform();
   await showpinnednotesdivdisplaycomponent();
   await showothernotesdivdisplaycomponent();
   let notesdata = await getnotearrfromdb();
   await fetchandshowaddnewnotesform(notesdata)
   await fetchandshowpinnednotes(notesdata);
   await fetchandshowothernotesdiv(notesdata);
    removeUnwantedelements();
    addinfotags();
 }
   
loadscriptfilesonebyone()


//Actions to be done from this page after loading the complete page

//Removing unwanted elements from New Add notes and changing some tags,functions
function removeUnwantedelements () {
   let labelbtnsline = document.querySelector('.createnotesdiv .labelbtnsline');
   labelbtnsline.innerHTML = '<div class="labelbtnsdiv"></div>';
   let archivebtn = document.querySelector('.createnotesdiv .archivebtn').remove();
   let trashbtn = document.querySelector('.createnotesdiv .trashbtn').remove();
   let savebtn = document.querySelector('.createnotesdiv .savebtn');
   savebtn.addEventListener('click',(e)=>{onclickaddnewnotes(e.target)});
   savebtn.innerText = 'Add New Note'
}


function addinfotags () {
  let pinnoteuiarr = document.querySelectorAll('.pinnednotesdiv .noteui');
  let othernoteuiarr = document.querySelectorAll('.othernotesdiv .noteui')
  if(pinnoteuiarr.length==0)
    {
        console.log("Hello no pins");
        let pinnednotesdiv = document.getElementsByClassName('pinnednotesdiv')[0];
        pinnednotesdiv.innerHTML = '<span style="color:teal;font-style: italic">No Pinned Notes Available</span>';
        pinnednotesdiv.style="display: flex;justify-content: center"
    }
    if(othernoteuiarr.length==0)
        {
            console.log("Hello no others")
            let othernotesdiv = document.getElementsByClassName('othernotesdiv')[0];
            othernotesdiv.innerHTML = '<span style="color:teal;font-style: italic">No Other Notes Available</span>';
            othernotesdiv.style="display: flex;justify-content: center"
        }
}