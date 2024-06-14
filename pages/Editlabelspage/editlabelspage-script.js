
let navbarhomepagediv = document.getElementsByClassName('navbarhomepagediv')[0];
let labelsdisplaydiv = document.getElementsByClassName('showlabels')[0];

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

async function getlabelslist () {
    let labelsresponse =  await fetch("http://localhost:8080/notes/getlabelslist",{method:"GET","headers":
        {'Content-Type':"application/json",
          'Token-Googlekeep':"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtpcmFuc2FpczAzIiwibmFtZSI6IktpcmFuIFNhaSIsImVtYWlsIjoia2lyYW5zYWlzMDNAZ21haWwuY29tIiwidXNlcklkIjoiNjY2NzI2MTVhZWFmNzgwNDgyZDAzNjE2IiwiaWF0IjoxNzE4MDM2MDI2fQ.SnZ5u3T9PzwowrpyW2AxaqzJ2Nmd2FkTC2dCQRx9NLs"
        }});
    let labelsarrdata = await labelsresponse.json();
    console.log(labelsarrdata.notesarr[0].labelslist,"response data")
    let labelslistarr = labelsarrdata.notesarr[0].labelslist;
    labelsdisplaydiv.innerHTML=''
    labelslistarr.map((currelem,index)=>{
       let labeldiv = document.createElement('div');
       labeldiv.classList.add('labelrow');
       console.log("name",currelem)
       labeldiv.innerHTML = `<button class='roundbtn' data-labelrownum=${index} onclick="deletelabelfunc(this)"><img width="20px" src="../../svg/trash.svg" alt="trash"></button>
            <input class='note-input' disabled  type="text" placeholder="Enter Lable Name" value='${currelem}'>
            <button class='roundbtn editbtn' data-labelrownum=${index} onclick="editlabelclicked(this)" style="font-weight:400"><img src="../../svg/editicon.svg" alt="edit"></button>`
            labelsdisplaydiv.append(labeldiv);
            clickchangedata()
    })
}  

async function loadscriptfilesonebyone () {
    await shownavbarcomponent();
    await getlabelslist();
   }
   

loadscriptfilesonebyone();

//Buttons action functions

function clearinputfunc () {
  let newlabelinputelem = document.getElementById('newlabelinput');
  newlabelinputelem.value = ""
}

async function createlabelfunc () {
    try {
        let newlabelinputelem = document.getElementById('newlabelinput');
        let labelname = newlabelinputelem.value;
        let labelsresponse =  await fetch("http://localhost:8080/notes/addlabel",{method:"POST","headers":
            {'Content-Type':"application/json",
              'Token-Googlekeep':"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtpcmFuc2FpczAzIiwibmFtZSI6IktpcmFuIFNhaSIsImVtYWlsIjoia2lyYW5zYWlzMDNAZ21haWwuY29tIiwidXNlcklkIjoiNjY2NzI2MTVhZWFmNzgwNDgyZDAzNjE2IiwiaWF0IjoxNzE4MDM2MDI2fQ.SnZ5u3T9PzwowrpyW2AxaqzJ2Nmd2FkTC2dCQRx9NLs"
            },body:JSON.stringify({
                "email":"kiransais03@gmail.com",
                "labelname":labelname
            })});
        let labelsarrdata = await labelsresponse.json();
        console.log("Label created successfully",labelsarrdata);
        await getlabelslist()
        
    }
    catch(err) {
       console.log("Failed to create new label")
    }
    

}


async function deletelabelfunc (elem) {
  try {
    console.log(elem)
    let labelrownum = parseInt(elem.getAttribute('data-labelrownum'));
    let deletinglabelname = document.querySelectorAll('div.labelrow input')[labelrownum].value
    // let deletinglabelname = document.getElementsByClassName('labelrow')[labelrownum+1].children[1].value
    let labelsresponse =  await fetch("http://localhost:8080/notes/deletelabel",{method:"DELETE","headers":
        {'Content-Type':"application/json",
          'Token-Googlekeep':"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtpcmFuc2FpczAzIiwibmFtZSI6IktpcmFuIFNhaSIsImVtYWlsIjoia2lyYW5zYWlzMDNAZ21haWwuY29tIiwidXNlcklkIjoiNjY2NzI2MTVhZWFmNzgwNDgyZDAzNjE2IiwiaWF0IjoxNzE4MDM2MDI2fQ.SnZ5u3T9PzwowrpyW2AxaqzJ2Nmd2FkTC2dCQRx9NLs"
        },body:JSON.stringify({
            "email":"kiransais03@gmail.com",
            "labelname":deletinglabelname
        })});
    let labelsarrdata = await labelsresponse.json();
    console.log("Label deleted successfully",labelsarrdata)
    await getlabelslist()

  } catch (error) {
    console.log("Failed to delete the label",error)
  }
}

//storing old unedited label name
let oldlabelname ="";
let editclicked = false;


async function editlabelclicked (elem) {
    if(editclicked) {
        await editlabelfuncclick2(elem);
        editclicked=false;
    } 
    else {
        await editlabelfuncclick1(elem);
        editclicked=true;
    }
}


async function editlabelfuncclick1 (elem) {
    try {
        let labelrownum = parseInt(elem.getAttribute('data-labelrownum'));
        let inputform = document.querySelectorAll('div.labelrow input')[labelrownum];
        oldlabelname = inputform.value;
        inputform.disabled = false;
        inputform.focus()
        elem.innerHTML = `<img src="../../svg/tickicon.svg" alt="tickicon">`;
        
  
    } catch (error) {
      console.log("Failed to edit the label",error)
    }
  }


  async function editlabelfuncclick2 (elem) {
    try {
      let labelrownum = parseInt(elem.getAttribute('data-labelrownum'));
         let editedlabelname = document.querySelectorAll('div.labelrow input')[labelrownum].value;
      let labelsresponse =  await fetch("http://localhost:8080/notes/editlabel",{method:"PATCH","headers":
          {'Content-Type':"application/json",
            'Token-Googlekeep':"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtpcmFuc2FpczAzIiwibmFtZSI6IktpcmFuIFNhaSIsImVtYWlsIjoia2lyYW5zYWlzMDNAZ21haWwuY29tIiwidXNlcklkIjoiNjY2NzI2MTVhZWFmNzgwNDgyZDAzNjE2IiwiaWF0IjoxNzE4MDM2MDI2fQ.SnZ5u3T9PzwowrpyW2AxaqzJ2Nmd2FkTC2dCQRx9NLs"
          },body:JSON.stringify({
              "email":"kiransais03@gmail.com",
              "oldlabel":oldlabelname,
              "editedlabel":editedlabelname
          })});
      let labelsarrdata = await labelsresponse.json();
      let inputform = document.querySelectorAll('div.labelrow input')[labelrownum];
      inputform.disabled = true;
      elem.innerHTML = `<img src="../../svg/editicon.svg" alt="edit">`

      console.log("Label edited successfully",labelsarrdata)
      await getlabelslist();
  
    } catch (error) {
      console.log("Failed to edit the label",error)
    }
  }