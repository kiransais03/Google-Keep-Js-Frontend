console.log("Hello")
let othernotesdiv = document.getElementsByClassName('othernotes')[0];
getnotesanddisplay();

function onchangedata () {
    console.log("Onchange called")
}

        //   <Menulist selectedlabels={selectedlabels} setSelectedlabels={setSelectedlabels}/>

async function getnotesanddisplay () {
    let notesresponse =  await fetch("http://localhost:8080/notes/getnotes",{method:"GET","headers":
        {'Content-Type':"application/json",
          'Token-Googlekeep':"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtpcmFuc2FpczAzIiwibmFtZSI6IktpcmFuIFNhaSIsImVtYWlsIjoia2lyYW5zYWlzMDNAZ21haWwuY29tIiwidXNlcklkIjoiNjY2NzI2MTVhZWFmNzgwNDgyZDAzNjE2IiwiaWF0IjoxNzE4MDM2MDI2fQ.SnZ5u3T9PzwowrpyW2AxaqzJ2Nmd2FkTC2dCQRx9NLs"
        }});
    let notesdata = await notesresponse.json();
    console.log(notesdata,"data");
    //   noteuidiv.innerHTML = `
    //   <div>${notearrobj.title}</div`
     notesdata.notesarr[0].usernotes.map((notearrobj,index,arr)=>{
       let noteuidiv = document.createElement('div');
       console.log(notearrobj)
       noteuidiv.classList.add("noteui");
       noteuidiv.innerHTML = `<div >
        <div class='notetitlerow'>
          <input class='note-input' style="font-weight:500;font-size:1.2rem,background-color:white" type="text" placeholder="" value="${notearrobj.title}" onchange="onchangedata()">
       

           <button class='roundbtn' onclick="onchangedata()"><img src="../../svg/pin.svg" alt="pin"></button>
          </div>
        <div style="display:flex;justify-content:flex-start;padding-left:10px;column-gap:5px">
           ${ notearrobj.labels.map((label,index)=>{
             return (`<div>
              <button class="roundbtn" style="background-color:white;font-size:12px;border:1px solid black;padding:3px">${label} x</button>
             </div>`)
          })}
        </div>
           <textarea class='note-input' cols="34"  style="height:${(parseInt(34/34)*16)+40}px;font-weight:500;font-size:1rem;background-color:white" placeholder="Take a note..." onChange="onchangedata()">${notearrobj.text}</textarea>
       <div class='notebtnrow' style="${true?'display:flex':'display:none'}">
        <div style="display:flex;align-items:center">
          <img width="20px" style="background-color:white" src="../../svg/backgroundcoloricon.svg" alt='bgcoloricon'/> ᐅᐅ
          <input type="color" style="border-radius:5px;cursor:pointer"}} value="#000000" onchange="onchangedata()">
         <button class='roundbtn' onclick="onchangedata()"><img width="20px" src="../../svg/archives.svg" alt="archivesicon"></button>
          <button class='roundbtn' onclick="onchangedata()"><img width="20px" src="../../svg/deleteforevericon.svg" alt="deleteforevericon"></button>
         

         <button class='roundbtn' onclick="onchangedata()"><img width="20px" src="../../svg/restoreicon.svg" alt="restoreicon"></button>
        </div>
        <div>
        <button class='roundbtn' styles="font-weight:600;background-color:white" onclick="onchangedata()">Save</button>
        </div>
      </div>`
      
      othernotesdiv.append(noteuidiv)
     })   
}
