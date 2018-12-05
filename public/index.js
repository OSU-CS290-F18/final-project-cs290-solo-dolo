/*
 * Write your JS code in this file.  Don't forget to include your name and
 * @oregonstate.edu email address below.
 *
 * Name: Dannon Gilbert
 * Email: gilbedan@oregonstate.edu
 */

//Derived from Rob Hess' class example
 function getPersonIdFromURL() {
  var path = window.location.pathname;
  var pathParts = path.split('/');
  return pathParts[1];
}

 //getting today's date
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd = '0'+dd
}

if(mm<10) {
    mm = '0'+mm
}

today = mm + '/' + dd + '/' + yyyy;


//The username display on the BIO
var usernameBio = document.getElementById('userNameBio');


//The data for changing the profile picture
var profilePicture = document.getElementById('profilePicture');
profilePicture.addEventListener('click', openProfilePicModal);
var profilePicModal = document.getElementById('profilePicModal');

var profilePicUrlInput = document.getElementById('profilePicUrlInput');
var profilePicSubmitButton = document.getElementById('profilePicSubmitButton'); //submit URL
var profilePicCancelButton = document.getElementById('profilePicCancelButton'); //cancel button

//The content of the page where posts go
var content = document.querySelector('.content');

//The button elements for the modals
var noteButton = document.getElementById('noteButton');
var audioButton = document.getElementById('audioButton');
var pictureButton = document.getElementById('pictureButton');
var videoButton = document.getElementById('videoButton');

//Assigning actions to the buttons
noteButton.addEventListener('click', openNoteModal);
audioButton.addEventListener('click', addAudio);
pictureButton.addEventListener('click', openPictureModal);
videoButton.addEventListener('click', addVideo);

var modalOpen = false;

// These are the values for the note modal
var noteModal = document.getElementById('noteModal');
var noteInput = document.getElementById('noteModalInput');
var noteSubmitButton = document.getElementById('noteSubmitButton');
var	closeNoteModal = document.getElementById('closeNoteModal');


// These are the values for the picture modal
var pictureSubmitButton = document.getElementById('pictureSubmitButton');
var pictureInput = document.getElementById('pictureModalInput');
var	closePictureModal = document.getElementById('closePictureModal');


function openProfilePicModal(){
  var currentUserName = getPersonIdFromURL();
  console.log(currentUserName);
  if (currentUserName === "dannondarko"){
  	if(!modalOpen){
  		modalOpen = true;
  		profilePicModal.classList.toggle('hidden');
  		profilePicSubmitButton.addEventListener('click', changeProfilePicture);
  		profilePicCancelButton.addEventListener('click', function(){
  				profilePicUrlInput.value = "";
  				profilePicModal.classList.toggle('hidden');
  				modalOpen = false;
  		});
  	}
    else{
      console.log("couldn't open modal because not logged in");
    }
  }
}

function changeProfilePicture(){
	var profilePicUrlValue = profilePicUrlInput.value; //input of URL
	if (!profilePicUrlValue == ""){
		profilePicture.src= profilePicUrlValue; //the source of profile pic now = the value of URL
		profilePicModal.classList.toggle('hidden');//hide modal
		modalOpen = false;
	}
	else{
		profilePicModal.classList.toggle('hidden');//hide moda
	}
}

function openNoteModal(){
	if(!modalOpen){
    console.log("Note Modal has been opened.")
		modalOpen = true;
    console.log("The value of modalOpen : ", modalOpen)
		noteModal.classList.toggle('hidden');
		noteInput.focus();
		var noteValue = noteInput.value;
		noteSubmitButton.addEventListener('click', addNote);
    closeNoteModal.addEventListener('click', function(){
      noteInput.value = "";
    	noteModal.classList.toggle('hidden');
    	modalOpen = false;
      console.log("The value of modalOpen : ", modalOpen)
    });
	}
}

function openPictureModal(){
	if(!modalOpen){
    console.log("The value of modalOpen : ", modalOpen)
		modalOpen = true;
		pictureModal.classList.toggle('hidden');
		pictureInput.focus();
		pictureSubmitButton.addEventListener('click', addPicture);
    closePictureModal.addEventListener('click', function(){
      pictureInput.value = "";
      pictureModal.classList.toggle('hidden');
      modalOpen = false;
      console.log("The value of modalOpen : ", modalOpen)
    });
	}
}

function charcountupdate(str) {
	var lng = str.length;
	document.getElementById("charcount").innerHTML = lng + ' out of 200 characters';
}

function addNote(){
	var noteValue = noteInput.value;
	if (noteValue.length > 200){
		alert('Character Limit is 200');
	}
	else{
		noteModal.classList.toggle('hidden');

    var postRequest = new XMLHttpRequest();
    var requestURL = getPersonIdFromURL()  + '/addPost';
    postRequest.open('POST', requestURL);

    var requestBody = JSON.stringify({
      noteText: noteValue,
      date: today
    });

    postRequest.addEventListener('load', function (event) {
     if (event.target.status === 200) {
       var addNotePostTemplate = Handlebars.templates.addNotePost;
       var notePostHTML = addNotePostTemplate({
         noteText: noteValue,
         date: today
       });
      content.insertAdjacentHTML('beforeend', notePostHTML);
     } else {
       alert("Error storing photo: " + event.target.response);
     }
    });

    postRequest.setRequestHeader('Content-Type', 'application/json');
    postRequest.send(requestBody);

		noteInput.value = "";
		modalOpen = false;
	}
}

function addAudio(){

}

function addPicture(){
	pictureModal.classList.toggle('hidden');
	var pictureValue = pictureInput.value;

  var postRequest = new XMLHttpRequest();
  var requestURL = getPersonIdFromURL()  + '/addPost';
  postRequest.open('POST', requestURL);

  var requestBody = JSON.stringify({
    url: pictureValue,
    date: today
  });

  ///
  postRequest.addEventListener('load', function (event) {
   if (event.target.status === 200) {
     var addPicPostTemplate = Handlebars.templates.addPicPost;
     var picPostHTML = addPicPostTemplate({
       url: pictureValue,
       date: today
     });
    content.insertAdjacentHTML('beforeend', picPostHTML);
   } else {
     alert("Error storing photo: " + event.target.response);
   }
  });

  postRequest.setRequestHeader('Content-Type', 'application/json');
  postRequest.send(requestBody);


  ///

  pictureInput.value = "";
	modalOpen = false;
}

function addVideo(){

}
