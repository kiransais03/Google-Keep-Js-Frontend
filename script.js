let button = document.getElementsByTagName('button')[0];
button.addEventListener('click',colourchange);

function colourchange () {
    let h1text = document.getElementsByTagName('h1')[0];
    h1text.style.color = "red";
}