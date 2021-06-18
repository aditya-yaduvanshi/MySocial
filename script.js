document.addEventListener('DOMContentLoaded', ()=> {
  document.querySelector('#menu-btn').addEventListener('click', menu_btn)
  document.querySelector('#login-form').addEventListener('submit', LoginUser)
  document.querySelector('#register-form').addEventListener('submit', RegisterUser)
})

function menu_btn(){
  const nav = document.querySelector('nav')
  if(nav.style.display === 'none'){
    nav.style.display = 'flex'
  }
  else {
    nav.style.display = 'none'
  }
}

var USERS = [
  {
    PICTURE_URL : 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/768px-Circle-icons-profile.svg.png',
    USERNAME : 'ADMIN',
    EMAIL : 'admin@admin.com',
    PASSWORD : 'Admin#123'
  }
]

function FbLoginSuccess(response){
  if(response.status === 'connected'){
    LoginUser()
  }
}

function LoginUser(){
  let loginEmail = document.querySelector('#login-email').value,
  loginPassword = document.querySelector('#login-password').value

  for(let usr in USERS){
    if(loginEmail === usr.EMAIL && loginPassword === usr.PASSWORD){
      RedirectToProfile(usr.PICTURE_URL,usr.USERNAME,usr.EMAIL)
      break;
    }
    else if(loginEmail === usr.EMAIL && loginPassword !== usr.PASSWORD){
      console.log("Incorrect Password! Try Again.")
    }
  }
  console.log("User not found! New here ? Try Register here.")
  return
}

function RegisterUser(){
  let username = document.querySelector('#username').value,
  email = document.querySelector('#email').value,
  password = document.querySelector('#password').value,
  confirmPassword = document.querySelector('#confirmPassword').value

  if(password === confirmPassword){
    SignInUser('#',username,email,password)
  }
  else {
    let errorMessage = document.createElement('div')
    errorMessage.innerText = "Password do not matched!"
    errorMessage.className = "alert-box error"
    document.querySelector('#register-form').prepend(errorMessage)
    return false
  }
}

function SignInUser(pictureUrl,name,email,password){
  let newUser = {
    PICTURE_URL : pictureUrl,
    USERNAME : name,
    EMAIL : email,
    PASSWORD : password
  }
  USERS.push(newUser)
  RedirectToProfile(pictureUrl,name,email)
}

function RedirectToProfile(pictureUrl,name,email){
  const profileSection = document.querySelector('#my-profile'),
  profilePicture = document.querySelector('#profile-picture'),
  userName = document.querySelector('#user-name'),
  userEmail = document.querySelector('#user-email')

  profilePicture.src = pictureUrl
  userName.innerText = name
  userEmail.innerText = email

  document.querySelectorAll('section').forEach(section => {
    section.style.display = 'none'
  })
  profileSection.style.display = 'block'
}

function LogoutUser(){

}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '1032608233947182',
    cookie     : true,
    xfbml      : true,
    version    : 'v11.0'
  });
      
  FB.AppEvents.logPageView();   
      
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function checkLoginState() {
  FB.getLoginStatus(function(response) {
    FbLoginSuccess(response);
  });
}


var finished_rendering = function() {
  console.log("finished rendering plugins");
  var spinner = document.getElementById("spinner");
  spinner.removeAttribute("style");
  spinner.removeChild(spinner.childNodes[0]);
}
FB.Event.subscribe('xfbml.render', finished_rendering);

/* 
Response by getLoginStatus
{
    status: 'connected',
    authResponse: {
        accessToken: '...',
        expiresIn:'...',
        signedRequest:'...',
        userID:'...'
    }
}
*/

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

/*
google - - - 

  $g_client->setApplicationName('MySocial');
  $g_client->setClientId('75534178851-p5ueavfdn18bfrg8nkpt3335oct8bsbc.apps.googleusercontent.com');
  $g_client->setClientSecret('ptYkGyiNIu3nu-5o4a2wfR4X');
  $g_client->setScopes('email','name');
  $g_client->setRedirectUri('https://mysocial-aditya.herokuapp.com/');
  $g_login_url = $g_client->createAuthUrl();
  $g_access_token = $g_client->fetchAccessTokenWithAuthCode($code);
      $g_client->setAccessToken($g_access_token);
      $pay_load = $g_client->verifyIdToken();
*/