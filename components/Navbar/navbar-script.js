
function addingeventlistenersfunc() {
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
}

function addbghighlighter(e) {
   let elemclass = e.target.className.split(' ')[0];
   // console.log("imghigh",elemclass)
   document.querySelectorAll(".text li a")[parseInt(e.target.id)].classList.add(elemclass+"hover");  
}

function removebghighlighter(e) {
    let elemclass = e.target.className.split(' ')[0];
    document.querySelectorAll(".text li a")[parseInt(e.target.id)].classList.remove(elemclass+"hover");  
 }

 function addbghighlightertext(e) {
   // console.log("namehigh",e.target.className)
    let elemclass = e.target.className.split(' ')[0];
    document.querySelectorAll(".icon li a")[parseInt(e.target.id)-54].classList.add(elemclass+"hover");  
 }
 
 function removebghighlightertext(e) {
     let elemclass = e.target.className.split(' ')[0];
     document.querySelectorAll(".icon li a")[parseInt(e.target.id)-54].classList.remove(elemclass+"hover");  
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

  console.log("started")

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


async function addlabelnamesTonav () {
   try {
   let iconuldiv = document.querySelector('.icon ul');
   let textuldiv = document.querySelector('.text ul');
   let iconlicollection = document.getElementsByClassName('iconli');
   let textlicollection = document.getElementsByClassName('textli');
   let notesresponse =  await fetch("http://localhost:8080/notes/getnotes",{method:"GET","headers":
      {'Content-Type':"application/json",
        'Token-Googlekeep':"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtpcmFuc2FpczAzIiwibmFtZSI6IktpcmFuIFNhaSIsImVtYWlsIjoia2lyYW5zYWlzMDNAZ21haWwuY29tIiwidXNlcklkIjoiNjY2NzI2MTVhZWFmNzgwNDgyZDAzNjE2IiwiaWF0IjoxNzE4MDM2MDI2fQ.SnZ5u3T9PzwowrpyW2AxaqzJ2Nmd2FkTC2dCQRx9NLs"
      }});
  let notesdata = await notesresponse.json();
  let labelslistarr1 = notesdata.notesarr[0].labelslist
  let navmenu= document.getElementById('navmenu');
  let styletextline='';
  labelslistarr1.map((label)=>{
      styletextline+='.'+label+"hover"+",."+"t-"+label+"hover,"
  });
//   console.log("line",styletextline)
  let style = document.createElement('style');
  style.textContent = `${styletextline.slice(0,styletextline.length-1)} {background-color:#eff3f6;}`;
  document.head.appendChild(style);
  labelslistarr1.map((label,index)=>{
      // console.log(iconlicollection.length);
      let li1= document.createElement('li');
      li1.innerHTML=`<a class="${label} iconli" id=${iconlicollection.length}  onclick="navmenulinkclicked(this)" href="#"  data-href="../../pages/labelspage/labelspage.html"><img src="../../svg/label.svg" alt="label"></a>`;
      iconuldiv.append(li1);
      let li2= document.createElement('li');
      li2.innerHTML=`<a class="t-${label} textli" id=${textlicollection.length+54}  onclick="navmenulinkclicked(this)" href="#"  data-href="../../pages/labelspage/labelspage.html">${label}</a>`;
      textuldiv.append(li2);
  })
  addingeventlistenersfunc();
  console.log("hilton")
}
catch(err) {
   console.log("Failed to add navmenu items",err)
}
}

addlabelnamesTonav();


function navmenulinkclicked (elem) {
   let classname = elem.className
   console.log(classname,"link lcic");
   let pagename = ''
   if(classname[0]==='t' && classname[1]==='-')
      {
         let arr = classname.split(' ');
         arr.pop();
         let newstring = arr.join(' ');
         pagename = newstring.slice(2);
         console.log(pagename,"storing")
      }
      else {
         let arr = classname.split(' ');
         arr.pop();
         pagename = arr.join(' ');
      }
   localStorage.setItem('currpagename',pagename);
   window.location.href = elem.getAttribute('data-href');
}