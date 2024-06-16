let loginbtn = document.getElementsByClassName('login-btn');
let signupbtn = document.getElementsByClassName('signup-btn');
let homebtn=document.getElementsByClassName('home-btn')[0];

homebtn.addEventListener('click',()=>{
    let a=document.createElement('a');
    a.href='./index.html';
    a.click();
    console.log('Homr button clicked');
})


Array.from(loginbtn).forEach((element)=>{element.addEventListener('click',(event)=>{
    let a=document.createElement('a');
    a.href='./pages/loginpage/loginpage.html';
    a.click();
    console.log('login button clicked');
})});


Array.from(signupbtn).forEach((element)=>{element.addEventListener('click',(event)=>{
    let a=document.createElement('a');
    a.href='./pages/signuppage/signuppage.html';
    a.click();
    console.log('signup button clicked');
})})