let loginbtn = document.getElementsByClassName('login-btn');
let signupbtn = document.getElementsByClassName('signup-btn');
let homebtn=document.getElementsByClassName('home-btn')[0];

console.log("location",window.location.pathname)
if(window.location.pathname=='/pages/loginpage/loginpage.html')
    {
        loginbtn[0].style.textDecoration = 'underline'
    }
else if(window.location.pathname=='/pages/signuppage/signuppage.html')
    {
        signupbtn[0].style.textDecoration = 'underline'
    }
else {
    homebtn.style.textDecoration = 'underline'
}

homebtn.addEventListener('click',()=>{
    let a=document.createElement('a');
    a.href='/index.html';
    a.click();
    console.log('Homr button clicked');
})


Array.from(loginbtn).forEach((element)=>{element.addEventListener('click',(event)=>{
    let a=document.createElement('a');
    a.href='/pages/loginpage/loginpage.html';
    a.click();
    console.log('login button clicked');
})});


Array.from(signupbtn).forEach((element)=>{element.addEventListener('click',(event)=>{
    let a=document.createElement('a');
    a.href='/pages/signuppage/signuppage.html';
    a.click();
    console.log('signup button clicked');
})})