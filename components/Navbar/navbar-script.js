let iconlistelements = document.querySelectorAll(".icon li a");
let iconlistarr = Array.from(iconlistelements)
iconlistarr.map((elem)=>{
  elem.addEventListener("mouseenter",addbghighlighter);
  elem.addEventListener("mouseleave",removebghighlighter);
})


let textlistitems = document.querySelectorAll(".text li a");
let textlistarr = Array.from(textlistitems)
textlistarr.map((elem)=>{
  elem.addEventListener("mouseenter",addbghighlightertext);
  elem.addEventListener("mouseleave",removebghighlightertext);
})

function addbghighlighter(e) {
   let elemclass = e.target.className;
   document.querySelectorAll(".text li a")[parseInt(e.target.id)].classList.add(elemclass+"hover");  
}

function removebghighlighter(e) {
    let elemclass = e.target.className;
    document.querySelectorAll(".text li a")[parseInt(e.target.id)].classList.remove(elemclass+"hover");  
 }

 function addbghighlightertext(e) {
    let elemclass = e.target.className;
    document.querySelectorAll(".icon li a")[parseInt(e.target.id)-4].classList.add(elemclass+"hover");  
 }
 
 function removebghighlightertext(e) {
     let elemclass = e.target.className;
     document.querySelectorAll(".icon li a")[parseInt(e.target.id)-4].classList.remove(elemclass+"hover");  
  }

  function navmenutoggle () {
     document.getElementById("navmenu").classList.add('togglemenu');
  }

  function reloadpage () {
   location.reload();
  }

  //Search functionality

  let notedivcollectionarr = '';
  let pagename = ''

  function searchfunc (elem) {
     if(notedivcollectionarr=='') {
      notedivcollectionarr = Array.from(document.getElementsByClassName('noteui'));
      pagename = document.querySelector('.notescontainer h3').innerText;
      if(pagename==="Pinned Notes")
         {
            pagename="Notes"
         }
      searchandfilternotes(elem,notedivcollectionarr);
     }
     else {
      searchandfilternotes(elem,notedivcollectionarr);
     }
  }

  console.log("statted")

  function searchandfilternotes (elem,notedivcollectionarr) {
   let searchtext = elem.value;
   let notescontainerdiv = document.getElementsByClassName('notescontainer')[0];
   let noteuidivs = Array.from(document.getElementsByClassName('noteui'))
   console.log(notedivcollectionarr,"uiu")
   notescontainerdiv.innerHTML = `<h2 style="text-align:center">${pagename} Search</h2>`;
   notescontainerdiv.style="row-gap:10px;display:flex;flex-direction:column"
   for(let i=0;i<notedivcollectionarr.length;i++)
      {
         let notetitle = notedivcollectionarr[i].querySelector('.note-input').value;
         let notetext = notedivcollectionarr[i].querySelector('textarea').value;
         console.log("title",notetitle,notetext)
         if(notetitle.toLowerCase().search(searchtext.toLowerCase())!==-1 || notetext.toLowerCase().search(searchtext.toLowerCase())!==-1) {
            notescontainerdiv.append(notedivcollectionarr[i]) 
         }
      }
  }


