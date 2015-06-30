

//Tab events to change display

var tabs = document.getElementsByClassName('tab');
var loginDisplay = document.getElementById('loginDisplay');
var registerDisplay = document.getElementById('registerDisplay');
for(i=0; i<tabs.length; i++){
	tabs[i].addEventListener('click', indexFunctions.clickTab);
		
}

//Login tab variables

var loginUsername = document.getElementById('loginUsername');
var loginPassword = document.getElementById('loginPassword');
//The password's value is stored separately since the input's value is "hidden"
loginPassword.storedValue='';
//The caret position helps track the input value when the display is nothing but *'s
loginPassword.caretPosition = 0;
//Determines whether the text box is currently selected
loginPassword.isSelected = false;
//The log in message reports errors and gives instructions
var loginMessage = document.getElementById('loginMessage');

//Registration tab variables

var registerUsername = document.getElementById('registerUsername');
var registerPassword1 = document.getElementById('registerPassword1');
registerPassword1.storedValue = '';
registerPassword1.caretPosition = 0;
registerPassword1.isSelected = false;
var registerPassword2 = document.getElementById('registerPassword2');
registerPassword2.storedValue = '';
registerPassword2.caretPosition = 0;
registerPassword2.isSelected = false;
var registerEmail = document.getElementById('registerEmail');
var registerMessage = document.getElementById('registerMessage');

//Other Variables

var inputs = document.getElementsByClassName('input');
var passwordInputs = document.getElementsByClassName('passwordInput');
var loginSubmit = document.getElementById('loginSubmit');
var registerSubmit = document.getElementById('registerSubmit');

//INPUT EVENTS

for(i=0; i<inputs.length; i++){

	inputs[i].addEventListener('keydown', function(event){
		var functionEvent = event;
		indexFunctions.tabKeyChecker(event);
	});
}

//PASSWORD EVENTS (both tabs)

for(i=0; i<passwordInputs.length; i++){

	//Behavior for backspace, delete and arrow keys
	passwordInputs[i].addEventListener('keydown', function(event){
		var keydownEvent = event;
		indexFunctions.specialKeyChecker(keydownEvent, this);

	})

	//Hide the password's typed characters with *'s and store the hidden value
	passwordInputs[i].addEventListener('keypress', function(event){
		var keypressEvent = event;
		indexFunctions.passwordKeyChecker(keypressEvent, this);
		console.log(this.storedValue);
	});

	//The password text field becomes selected when clicked. 
	passwordInputs[i].addEventListener('mousedown', function(event){
		event.preventDefault();
		this.select();
	});

	//When selected, the isSelected property becomes true
	passwordInputs[i].addEventListener('select', function(event){
		this.isSelected = true;
	});

	//Selection becomes false on focus
	passwordInputs[i].addEventListener('focus', function(event){
		this.isSelected = false;
	});

	//Selection becomes false on blur
	passwordInputs[i].addEventListener('blur', function(event){
		this.isSelected = false;
	});

	//When text is pasted, this function ensures it contains legal characters
	passwordInputs[i].addEventListener('paste', function(event){
		var functionEvent = event;
		indexFunctions.pasteChecker(functionEvent, this);
	});

}

//SUBMIT EVENTS

loginSubmit.addEventListener('click', function(){
	console.log(loginPassword.storedValue);
	console.log(indexFunctions.passwordVerify(loginPassword.storedValue));
});

registerSubmit.addEventListener('click', function(){
	if(registerPassword1.storedValue === registerPassword2.storedValue){
		if(indexFunctions.usernameCharacterChecker(registerUsername.value) &&
			indexFunctions.passwordCharacterChecker(registerPassword1.storedValue) &&
			indexFunctions.emailCharacterChecker(registerEmail.value)){

			console.log('Success!');
		}
		/*
		if(registerUsername && registerPassword && registerEmail){
			indexFunctions.register(registerUsername, registerPassword, registerEmail);
		}
		*/
	}else{
		registerMessage.innerHTML = 'Passwords must match';
	}

	
});