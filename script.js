document.addEventListener('DOMContentLoaded', ()=> {
  document.querySelector('#menu-btn').addEventListener('click', menu_btn)
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

function RedirectToProfile(pictureUrl,name,email,logout){
  const profileSection = document.querySelector('#my-profile'),
  profilePicture = document.querySelector('#profile-picture'),
  userName = document.querySelector('#user-name'),
  userEmail = document.querySelector('#user-email'),
  signout = document.querySelector('#signout')

  profilePicture.src = pictureUrl
  userName.innerText = name
  userEmail.innerText = email
  signout.onclick = logout

  document.querySelectorAll('section').forEach(section => {
    section.style.display = 'none'
  })
  profileSection.style.display = 'block'
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
    if(response.status === 'connected'){
      FbLoginSuccess();
    }
    else {
      FB.login((response)=>{
        checkLoginState()
      }, {scope: 'public_profile, email, name, picture'})
    }
  });
}

function FbLoginSuccess(){
  FB.api('/me?fields=name,email,picture', function(response){
    console.log("Email : " + response.email)
    console.log("Name : " + response.name)
    console.log("Picture : " + response.picture)

    RedirectToProfile(response.picture, response.name, response.email, logOut)

  })
}

function logOut(){
  FB.logout()
  console.log('User signed out.');
  RemoveProfile()
}

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
  RedirectToProfile(profile.getImageUrl(),profile.getName(),profile.getEmail(),signOut);
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  RemoveProfile()
}

function RemoveProfile(){
  alert('You are successfully logged out!')
  document.querySelectorAll('section').forEach(section => {
    if(section.id == 'my-profile'){
      document.querySelector('#profile-picture').src = ''
      document.querySelector('#user-name').innerText = ''
      document.querySelector('#user-email').innerText = ''
      document.querySelector('#signout').onclick = ''
      section.style.display = 'none'
    }
    else {
      section.style.display = 'block'
    }
  })
}
