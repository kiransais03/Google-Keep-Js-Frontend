console.log("Hello")
// let notesdiv = document.getElementsByClassName('notesdiv')[0];
// getnotesanddisplay();

function onchangedata () {
    console.log("Onchange called")
}

        //   <Menulist selectedlabels={selectedlabels} setSelectedlabels={setSelectedlabels}/>

async function getnotesanddisplay (notesdiv,usernotesarr) {
    
    console.log(usernotesarr,"data");
     usernotesarr.map((notearrobj,index,arr)=>{
       let noteuidiv = document.createElement('div');
       console.log(notearrobj)
       noteuidiv.classList.add("noteui");
       noteuidiv.innerHTML = `<div data-objid=${notearrobj.id}>
        <div class='notetitlerow'>
          <input class='note-input' style="font-weight:500;font-size:1.2rem,background-color:white" type="text" placeholder="Enter Title" value="${notearrobj.title}">
           <button class='roundbtn' onclick="onclickpin(this)" data-pinselected='${notearrobj.pinselected}'><img src="../../svg/pin.svg" alt="pin"></img></button>
          </div>
        <div style="display:flex;justify-content:flex-start;padding-left:10px;column-gap:5px">
           ${ notearrobj.labels.map((label,index)=>{
             return (`<div class="labelbtnsdiv">
              <button class="roundbtn" style="background-color:white;font-size:12px;border:1px solid black;padding:3px">${label} x</button>
             </div>`)
          })}
        </div>
           <textarea class='note-input' cols="34"  style="height:${(parseInt(34/34)*16)+40}px;font-weight:500;font-size:1rem;background-color:white" placeholder="Take a note..." onChange="onchangedata()">${notearrobj.text}</textarea>
       <div class='notebtnrow' style="${true?'display:flex':'display:none'}">
        <div style="display:flex;align-items:center">
          <img width="20px" style="background-color:white" src="../../svg/backgroundcoloricon.svg" alt='bgcoloricon'/> ᐅᐅ
          <input type="color" style="border-radius:5px;cursor:pointer"}} value="#000000">
         <button class='roundbtn archivebtn' data-isarchived='${notearrobj.archived}' onclick="onchangedata()"><img width="20px" src="../../svg/archives.svg" alt="archivesicon"></button>
          <button class='roundbtn trashbtn' data-istrashed='${notearrobj.trashed}' onclick="onchangedata()"><img width="20px" src="../../svg/deleteforevericon.svg" alt="deleteforevericon"></button>
         <button class='roundbtn' onclick="onchangedata()"><img width="20px" src="../../svg/restoreicon.svg" alt="restoreicon"></button>
        </div>
        <div>
        <button class='roundbtn' styles="font-weight:600;background-color:white" onclick="editandsavenotesfunc(this)">Save</button>
        </div>
      </div>`
      
      notesdiv.append(noteuidiv)
     })   
}


//Notes component button functions

function onclickpin (elem) {
   let pinboolean = JSON.parse(elem.getAttribute('data-pinselected'));
   if(pinboolean) {
     elem.setAttribute('data-pinselected',"false");
     elem.innerHTML = '<img src="../../svg/pinselected.svg" alt="pin"></img>'
   }
   else {
    elem.setAttribute('data-pinselected',"true");
    elem.innerHTML = '<img src="../../svg/pin.svg" alt="pin"></img>'
   }
}

async function editandsavenotesfunc (elem) {
  try {
  // 3 parents for save
  let currnotediv = elem.parentElement.parentElement.parentElement;
  console.log(currnotediv,"uidiv");
  let inputtitle = currnotediv.querySelector('.notetitlerow input').value;
  let textareavalue = currnotediv.querySelector('textarea').value;
  let labelbtnsnodelist = currnotediv.querySelectorAll('.labelbtnsdiv button');
  let labelbtnselemarr = Array.from(labelbtnsnodelist);
  let labelnamesarr = labelbtnselemarr.map((elem,index)=>{
    let innertext= elem.innerText;
    let labelname = innertext.slice(0,innertext.length-2);
    return labelname;
  })
  let inputcolor = currnotediv.querySelector('input[type="color"]').value;
  let ispinselected = JSON.parse(currnotediv.querySelector('.notetitlerow button').getAttribute('data-pinselected'));
  let isarchived = JSON.parse(currnotediv.querySelector('.archivebtn').getAttribute('data-isarchived'));
  let istrashed = JSON.parse(currnotediv.querySelector('.trashbtn').getAttribute('data-istrashed'))
  let objid = parseInt(currnotediv.getAttribute('data-objid'));
  console.log(objid,inputtitle,textareavalue,labelnamesarr,inputcolor,ispinselected,isarchived,istrashed);

  let editandsaveresponse =  await fetch("http://localhost:8080/notes/editandreplacenotes",{method:"PUT","headers":
    {'Content-Type':"application/json",
      'Token-Googlekeep':"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtpcmFuc2FpczAzIiwibmFtZSI6IktpcmFuIFNhaSIsImVtYWlsIjoia2lyYW5zYWlzMDNAZ21haWwuY29tIiwidXNlcklkIjoiNjY2NzI2MTVhZWFmNzgwNDgyZDAzNjE2IiwiaWF0IjoxNzE4MDM2MDI2fQ.SnZ5u3T9PzwowrpyW2AxaqzJ2Nmd2FkTC2dCQRx9NLs"
    },body:JSON.stringify({
        "email":"kiransais03@gmail.com",
        "noteobj" : {
          "id": objid,
          "title": inputtitle,
          "text": textareavalue,
          "pinselected": ispinselected,
          "archived": isarchived,
          "trashed": istrashed,
          "notebgcolour": inputcolor,
          "labels": labelnamesarr
        }
    })});
let labelsarrdata = await editandsaveresponse.json();
console.log("Replaced obj successfully",labelsarrdata)

  } catch (error) {
    console.log("Failed to edit notes",error)
  }
}
