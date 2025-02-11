console.log("Hello")
// let notesdiv = document.getElementsByClassName('notesdiv')[0];
// getnotesanddisplay();

function onchangedata () {
    console.log("Onchange called")
}

// ${true?'display:flex':'display:none'}


//This variable is used to determine if the color picker is focused or not.
//To hide or show buttons row of note comp.

let colorpickerfocused = false;
      
      
async function getnotesanddisplay (notesdiv,usernotesarr,listlabels) {
    // console.log(usernotesarr,"data",listlabels);
     usernotesarr.map((notearrobj,index,arr)=>{
       let noteuidiv = document.createElement('div');
      //  console.log(notearrobj)
       noteuidiv.classList.add("noteui");
       noteuidiv.addEventListener('mouseenter',shownotebtnrow)
       noteuidiv.addEventListener('mouseleave',hidenotebtnrow)
       noteuidiv.innerHTML = `<div class="notecontainer" style="background-color:${notearrobj.notebgcolour}" data-objid=${notearrobj.id}>
        <div class='notetitlerow'>
          <input class='note-input' style="font-weight:500;font-size:1.2rem;background-color:${notearrobj.notebgcolour}" type="text" placeholder="Enter Title" value="${notearrobj.title}">
          ${notearrobj.pinselected?`<button class='roundbtn' onclick="onclickpin(this)" style="background-color:${notearrobj.notebgcolour}" data-pinselected='${notearrobj.pinselected}'><img src="../../svg/pinselected.svg" alt="pin"></img></button>`:`<button class='roundbtn' style="background-color:${notearrobj.notebgcolour}" onclick="onclickpin(this)" data-pinselected='${notearrobj.pinselected}'><img src="../../svg/pin.svg" alt="pin"></img></button>`}
           
          </div>
        <div class="labelbtnsline" style="display:flex;justify-content:flex-start;padding-left:10px;column-gap:5px">
          <div class="labelbtnsdiv">
        ${notearrobj.labels.map((label,index)=>{
             return (`
              <button class="roundbtn" onclick="removethisbutton(this)" style="background-color:${notearrobj.notebgcolour};font-size:12px;border:1px solid black;padding:3px">${label} x</button>
             `)
          }).join('')}
          </div>
        </div>
           <textarea class='note-input' cols="34"  style="height:${(parseInt(34/34)*16)+40}px;font-weight:500;font-size:1rem;background-color:${notearrobj.notebgcolour}" placeholder="Take a note..." onChange="onchangedata()">${notearrobj.text}</textarea>
       <div class='notebtnrow' style="display:none">
         <div style="display:flex;align-items:center">
         ${notearrobj.trashed?``:`<img width="20px" class="colorimage" style="background-color:${notearrobj.notebgcolour}" src="../../svg/backgroundcoloricon.svg" alt='bgcoloricon'/> ᐅᐅ`}
         ${notearrobj.trashed?``:`<input type="color" style="background-color:${notearrobj.notebgcolour};cursor: pointer;border-radius:5px" onfocus="colorpickerfocusedfunc()" onblur="colorpickerblurfunc()"  value=${notearrobj.notebgcolour} onchange="notebgcolorchange(this)">`}
         ${notearrobj.trashed?``:notearrobj.archived?`<button class='roundbtn archivebtn' style="background-color:${notearrobj.notebgcolour}" data-objid=${notearrobj.id} data-isarchived='${notearrobj.archived}' onclick="onclickarchive(this)"><img width="20px" src="../../svg/unarchive.svg" alt="unarchive"></button>`:`<button class='roundbtn archivebtn' style="background-color:${notearrobj.notebgcolour}" data-objid=${notearrobj.id} data-isarchived='${notearrobj.archived}' onclick="onclickarchive(this)"><img width="20px" src="../../svg/archivedark.svg" alt="archivedark"></button>`}
         
         ${notearrobj.trashed?`<button class='roundbtn trashbtn' style="background-color:${notearrobj.notebgcolour}" data-objid=${notearrobj.id} data-istrashed='${notearrobj.trashed}' onclick="onclicktrashed(this)"><img width="20px" src="../../svg/trashrestore.svg" alt="trashrestore"></button>`:`<button class='roundbtn trashbtn' style="background-color:${notearrobj.notebgcolour}" data-objid=${notearrobj.id} data-istrashed='${notearrobj.trashed}' onclick="onclicktrashed(this)"><img width="20px" src="../../svg/deleteicon.svg" alt="deleteicon"></button>`}
         ${notearrobj.trashed?`<button class='roundbtn trashbtn' style="background-color:${notearrobj.notebgcolour}" data-objid=${notearrobj.id} data-istrashed='${notearrobj.trashed}' onclick="onclickdelteforever(this)"><img width="20px" src="../../svg/deleteforevericon.svg" alt="deleteforevericon"></button>`:``}
       
         ${notearrobj.trashed?``:
           `<div id="container" style="background-color:${notearrobj.notebgcolour}">
          <div id="menu-wrap">
            <input type="checkbox" class="toggler" />
            <div class="dots">
              <div></div>
            </div>
            <div class="menu">
                <ul>
                <span style="font-weight:bold;color:blue">Lables</span>
                  ${listlabels.map((label,index)=>
                    `<li style="color:blue"><a href="#" onclick="selectlabelclick(this)" class="link">${label}</a></li>`).join('')}
                </ul>
            </div>
          </div>
        </div>`}
       

        </div>
        <div>
        ${notearrobj.trashed?``:`<button class='roundbtn savebtn' style="background-color:${notearrobj.notebgcolour}" onclick="editandsavenotesfunc(this)">Save</button>`}
        </div>
      </div>`
      
      notesdiv.append(noteuidiv);
     })   
}


//Notes component button functions

function onclickpin (elem) {
   let pinboolean = JSON.parse(elem.getAttribute('data-pinselected'));
   if(pinboolean) {
     elem.setAttribute('data-pinselected',"false");
     elem.innerHTML = '<img src="../../svg/pin.svg" alt="pin"></img>'
   }
   else {
    elem.setAttribute('data-pinselected',"true");
    elem.innerHTML = '<img src="../../svg/pinselected.svg" alt="pin"></img>'
   }
}

function notebgcolorchange(elem) {
  let currnotediv = elem.closest('.notecontainer')
  console.log(currnotediv,"uidiv");
  currnotediv.style.backgroundColor=elem.value;
  let buttons = Array.from(currnotediv.querySelectorAll('button'));
  buttons.map((curr)=>{
    curr.style.backgroundColor=elem.value;
  });
  let inputs = Array.from(currnotediv.querySelectorAll('input[type="text"]'));
  inputs.map((curr)=>{
    curr.style.backgroundColor=elem.value;
  })
  let textarea = currnotediv.querySelector('textarea');
  textarea.style.backgroundColor=elem.value;
  let img = currnotediv.querySelector('.colorimage');
  img.style.backgroundColor=elem.value;
}

function removethisbutton (elem) {
  elem.remove();
}

function selectlabelclick (elem) {
  // let currnotediv = elem.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  let currnotediv = elem.closest('.notecontainer')
  let labelbtnsdiv = currnotediv.querySelector('.labelbtnsdiv');
  let btnsarr = Array.from(currnotediv.querySelectorAll('.labelbtnsdiv button'));
  let scrollPosition = window.scrollY;
  for(let i=0;i<btnsarr.length;i++)
    {
      if(btnsarr[i].innerHTML === elem.innerText+" x")
        {
          requestAnimationFrame(() => {
            window.scrollTo(0, scrollPosition);
        });
          return ;
        }
    }
  let button = document.createElement('button');
      button.className = 'roundbtn';
      button.style.backgroundColor = 'white';
      button.style.fontSize = '12px';
      button.style.border = '1px solid black';
      button.style.padding = '3px';
      button.onclick = function() { removethisbutton(this); };
      
      console.log(scrollPosition,"pos")
      button.innerHTML = elem.innerText+" x";
      labelbtnsdiv.append(button);
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollPosition);
    });
}


async function editandsavenotesfunc (elem) {
  try {
  // 3 parents for save
  let currnotediv = elem.closest('.notecontainer')
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
  console.log("Allvalues",objid,"title",inputtitle,"text",textareavalue,labelnamesarr,inputcolor,"pin",ispinselected,"archive",isarchived,"trash",istrashed);
  
  let accesstoken = localStorage.getItem('accesstoken');
  let editandsaveresponse =  await fetch("https://google-keep-backend-node-h-c-n.onrender.com/notes/editandreplacenotes",{method:"PUT","headers":
    {'Content-Type':"application/json",
      'Token-Googlekeep':`Bearer ${accesstoken}`
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
let editsaveresponsedata = await editandsaveresponse.json();
console.log("Replaced obj successfully",editsaveresponsedata);
location.reload();

  } catch (error) {
    console.log("Failed to edit notes",error)
  }
}


async function onclickarchive(elem) {
  try {
  let archiveboolean = JSON.parse(elem.getAttribute('data-isarchived'));
  let objid = parseInt(elem.getAttribute('data-objid'));
  if(archiveboolean) {
    elem.setAttribute('data-isarchived',"false");
    elem.innerHTML = '<img src="../../svg/archivedark.svg" alt="archive"></img>'
    let accesstoken = localStorage.getItem('accesstoken');
    let archiveresponse =  await fetch("https://google-keep-backend-node-h-c-n.onrender.com/notes/editnotes",{method:"PATCH","headers":
        {'Content-Type':"application/json",
          'Token-Googlekeep':`Bearer ${accesstoken}`
        },body:JSON.stringify({
            "email":"kiransais03@gmail.com",
            "id":objid,
            "editingkey":"archived",
            "editingvalue":false
      })});
    let archivedresult = await archiveresponse.json();
    console.log("Archive is set to false",archivedresult);
    location.reload();
  }
  else {
   elem.setAttribute('data-isarchived',"true");
   elem.innerHTML = '<img src="../../svg/unarchive.svg" alt="unarchive"></img>';
   let accesstoken = localStorage.getItem('accesstoken');
   let archiveresponse =  await fetch("https://google-keep-backend-node-h-c-n.onrender.com/notes/editnotes",{method:"PATCH","headers":
    {'Content-Type':"application/json",
      'Token-Googlekeep':`Bearer ${accesstoken}`
    },body:JSON.stringify({
        "email":"kiransais03@gmail.com",
        "id":objid,
        "editingkey":"archived",
        "editingvalue":true
  })});
let archivedresult = await archiveresponse.json();
console.log("Archive is set to true",archivedresult);
location.reload();
  }
}
catch(err) {
  console.log("Failed to edit notes",err);
}
}

async  function onclicktrashed(elem) {
  try {
  let deleteboolean = JSON.parse(elem.getAttribute('data-istrashed'));
  let objid = parseInt(elem.getAttribute('data-objid'));
  if(deleteboolean) {
    elem.setAttribute('data-istrashed',"false");
    elem.innerHTML = '<img src="../../svg/deleteicon.svg" alt="deleteicon"></img>';
    let accesstoken = localStorage.getItem('accesstoken');
    let trashedresponse =  await fetch("https://google-keep-backend-node-h-c-n.onrender.com/notes/editnotes",{method:"PATCH","headers":
      {'Content-Type':"application/json",
        'Token-Googlekeep':`Bearer ${accesstoken}`
      },body:JSON.stringify({
          "email":"kiransais03@gmail.com",
          "id":objid,
          "editingkey":"trashed",
          "editingvalue":false
    })});
  let trashedresult = await trashedresponse.json();
  console.log("Trashed is set to false",trashedresult);
  location.reload();
  }
  else {
   elem.setAttribute('data-istrashed',"true");
   elem.innerHTML = '<img src="../../svg/trashrestore.svg" alt="trashrestore"></img>';
   let accesstoken = localStorage.getItem('accesstoken');
   let trashedresponse =  await fetch("https://google-keep-backend-node-h-c-n.onrender.com/notes/editnotes",{method:"PATCH","headers":
    {'Content-Type':"application/json",
      'Token-Googlekeep':`Bearer ${accesstoken}`
    },body:JSON.stringify({
        "email":"kiransais03@gmail.com",
        "id":objid,
        "editingkey":"trashed",
        "editingvalue":true
  })});
let trashedresult = await trashedresponse.json();
console.log("Trashed is set to true",trashedresult);
location.reload();
  }
}
catch(err) {
  console.log("Failed to edit notes",err);
}
}


async function onclickdelteforever(elem) {
  try {
    console.log(elem)
    let objid = parseInt(elem.getAttribute('data-objid'));
    let accesstoken = localStorage.getItem('accesstoken');
    let deleteresponse =  await fetch("https://google-keep-backend-node-h-c-n.onrender.com/notes/deletenotes",{method:"DELETE","headers":
        {'Content-Type':"application/json",
          'Token-Googlekeep':`Bearer ${accesstoken}`
        },body:JSON.stringify({
            "email":"kiransais03@gmail.com",
            "deletingobjid":objid
        })});
    let deletedata = await deleteresponse.json();
    console.log("Note deleted permanently",deletedata)
    location.reload();

  } catch (error) {
    console.log("Failed to delete the note",error)
  }
}


async function onclickaddnewnotes(elem) {
    try {
      let currnotediv = elem.closest('.notecontainer')
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
      let isarchived = false;
      let istrashed = false;
      let objid = parseInt(currnotediv.getAttribute('data-objid'));
      console.log("Allvalues",objid,"title",inputtitle,"text",textareavalue,labelnamesarr,inputcolor,"pin",ispinselected,"archive",isarchived,"trash",istrashed);
    
      let accesstoken = localStorage.getItem('accesstoken');
      let addnewresponse =  await fetch("https://google-keep-backend-node-h-c-n.onrender.com/notes/addnewnotes",{method:"POST","headers":
        {'Content-Type':"application/json",
          'Token-Googlekeep':`Bearer ${accesstoken}`
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
    let addnewresponsedata = await addnewresponse.json();
    console.log("New note added successfully",addnewresponse);
    location.reload();
    
      }
 catch (error) {
    console.log("Failed to add new note",error)
  }
}

function colorpickerfocusedfunc () {
  colorpickerfocused = true;
}

function colorpickerblurfunc () {
  colorpickerfocused = false;
}

function shownotebtnrow (e) {
  let elem = e.target;
  let notebtnrow = elem.querySelector('.notebtnrow');
  notebtnrow.style.display="flex";
}

function hidenotebtnrow (e) {
  if(colorpickerfocused==false) {
    let elem = e.target;
    let notebtnrow = elem.querySelector('.notebtnrow');
    notebtnrow.style.display="none";
  }
}