
let navbarhomepagediv = document.getElementsByClassName('navbarhomepagediv')[0];
let trashnotesdiv = document.getElementsByClassName('trashnotesdiv')[0];


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
async function showTrashsNotesdivDisplaycomponent() {
    try {
    let notesdisplay = await fetch("../../components/notedisplay/notedisplay.html");
    let response = await notesdisplay.text();
    trashnotesdiv.innerHTML = response;
    await loadScript("../../components/notedisplay/notedisplay-script.js");
   }
    catch (err) {
        console.log("Failed to fetch notedisplay component",err)
    }
   
}

let erroroccurred = false

//after all script files are completely executed,"getnotesanddisplay()" function is available.Now we can call it with "usernotesarr" argument
async function fetchandshowtrashnotes () {
    try {
        let accesstoken = localStorage.getItem('accesstoken');
        Array.from(document.getElementsByClassName('notesdiv')).map((elem)=>{

            elem.innerHTML = '<div class="loader" style="margin:0 auto"></div>'
        })
    let deleteexpiredtrashnotes = await fetch("https://google-keep-backend-node-h-c-n.onrender.com/notes/deletenotesafterexpiry",{method:"DELETE","headers":
        {'Content-Type':"application/json",
          'Token-Googlekeep':`Bearer ${accesstoken}`
        }});
    console.log("Expired trash notes deleted",deleteexpiredtrashnotes);
    
    let notesresponse =  await fetch("https://google-keep-backend-node-h-c-n.onrender.com/notes/getnotes",{method:"GET","headers":
        {'Content-Type':"application/json",
          'Token-Googlekeep':`Bearer ${accesstoken}`
        }});
    let notesdata = await notesresponse.json();
    Array.from(document.getElementsByClassName('notesdiv')).map((elem)=>{

        elem.innerHTML = ''
    })
    let filteredusernotesarr = notesdata.notesarr[0].usernotes.filter((currObj,index)=>{
        if(currObj.trashed)
            {
                return currObj;
            } 
    })
    let notesdiv = document.getElementsByClassName('notesdiv')[0];
    let labelslistarr1 = notesdata.notesarr[0].labelslist
    await getnotesanddisplay(notesdiv,filteredusernotesarr,labelslistarr1);
    console.log("hilton")
}
catch(err) {
    Array.from(document.getElementsByClassName('notesdiv')).map((elem)=>{

        elem.innerHTML = 'Error Occurred.Please Refresh Page'
        elem.style.color='red'
    })
    erroroccurred=true
    console.log("Failed to get notes arr",err)
}
}


async function loadscriptfilesonebyone () {
   await shownavbarcomponent();
   await showTrashsNotesdivDisplaycomponent();
   await fetchandshowtrashnotes();
   if(!erroroccurred) {
    addinfotags();
    }
   }
   
loadscriptfilesonebyone()

function addinfotags () {
    let noteuidivarr = document.querySelectorAll('.trashnotesdiv .noteui');
    if(noteuidivarr.length==0)
      {
          console.log("Hello no trashed files");
          let trashnotesdiv = document.getElementsByClassName('trashnotesdiv')[0];
          trashnotesdiv.innerHTML = '<span style="color:teal;font-style: italic">No Trashed Notes Available</span>';
          trashnotesdiv.style="display: flex;justify-content: center"
      }
  }