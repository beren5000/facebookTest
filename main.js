// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

//FUNCTION TAKEN FROM FACEBOOK SDK PAGE
// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);

  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    console.log('Welcome!  Fetching your information.... ');

    FB.api(
      '/me', 
      function(response) {
        console.log('Successful login for: ' + response.name);
        $('#messageText').html('Thanks for logging in, ' + response.name + '!');
      });

  } else if (response.status === 'not_authorized') {

    // The person is logged into Facebook, but not your app.
    $('#messageText').html('Please log into this app.');

  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.

    $('#messageText').html('Please log into Facebook.');

  }
}


//THE POST WALL FUNCTION
//on click in the button POST 
var post_wall = function(){
  message = $('#txtArea').val();//get the message to post

  //get the image to post
  if ($('#imageArea').val()){ //if the image area isn't empty
    photo = $('#imageArea').val();//get the url to the image to post
  }
  else{
    photo = $('#photo').attr('src');//get the url to the image in the page
  }

  //facebook api Call
  //this function is the way to post an status in the users wall
  //receive the message and picture url 
  FB.api(
    '/me/feed', 
    'post', 
    { 
      message: message,
      picture: photo
    }, 
    function(response) {
    if (!response || response.error) {
      console.log(response.error);
      if(response.error.code == 2500){
        $('#message').html(response.error.message + ".   YOU MUST LOG IN WITH THE BUTTON IN THE UPPER RIGHT CORNER" );
      }

    } else {
      $('#message').html("Successfuly post in your Wall");
      alert("Successfuly post in your Wall");
      console.log('Post ID: ' + response.id);
    }
  });
}
