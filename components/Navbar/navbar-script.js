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