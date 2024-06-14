
let navbarhomepagediv = document.getElementsByClassName('navbarhomepagediv')[0];

function clickchangedata () {
    console.log("Onchange called")
   }


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

async function loadscriptfilesonebyone () {
    await shownavbarcomponent();
    await getlabelslist();
   }
   
loadscriptfilesonebyone();

let labelsdisplaydiv = document.getElementsByClassName('labelsdisplay')[0];

async function getlabelslist () {
    let labelsresponse =  await fetch("http://localhost:8080/notes/getlabelslist",{method:"GET","headers":
        {'Content-Type':"application/json",
          'Token-Googlekeep':"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtpcmFuc2FpczAzIiwibmFtZSI6IktpcmFuIFNhaSIsImVtYWlsIjoia2lyYW5zYWlzMDNAZ21haWwuY29tIiwidXNlcklkIjoiNjY2NzI2MTVhZWFmNzgwNDgyZDAzNjE2IiwiaWF0IjoxNzE4MDM2MDI2fQ.SnZ5u3T9PzwowrpyW2AxaqzJ2Nmd2FkTC2dCQRx9NLs"
        }});
    let labelsarrdata = await labelsresponse.json();
    console.log(labelsarrdata.notesarr[0].labelslist,"response data")
    let labelslistarr = labelsarrdata.notesarr[0].labelslist;
    labelslistarr.map((currelem,index)=>{
       let labeldiv = document.createElement('div');
       labeldiv.classList.add('labelrow');
       labeldiv.innerHTML = `<button class='roundbtn' onclick="clickchangedata()"><img width="20px" src="../../svg/trash.svg" alt="trash"></button>
            <input class='note-input'  type="text" placeholder="Enter Label Name" value=${currelem} onchange="clickchangedata()">
            <button class='roundbtn' onclick="clickchangedata()" style="font-weight:400"><img src="../../svg/editicon.svg" alt="edit"></button>`
            labelsdisplaydiv.append(labeldiv);
            clickchangedata()
    })
}  