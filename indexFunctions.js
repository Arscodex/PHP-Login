(function(){

	var indexFunctions = {
		clickTab: clickTab,
		passwordVerify: passwordVerify,
		specialKeyChecker: specialKeyChecker,
		tabKeyChecker: tabKeyChecker,
		pasteChecker: pasteChecker,
		usernameCharacterChecker: usernameCharacterChecker,
		passwordCharacterChecker: passwordCharacterChecker,
		emailCharacterChecker: emailCharacterChecker,
		passwordKeyChecker: passwordKeyChecker,
		register: register,
		logIn: logIn
	};

	//DISPLAY FUNCTIONS 

	function clickTab(){
		for(i=0; i<tabs.length; i++){
			tabs[i].classList.remove('tabSelected');
			tabs[i].classList.add('tabUnselected');
		}
			this.classList.remove('tabUnselected');
			this.classList.add('tabSelected');
		if(this.id==='loginTab'){
			registerDisplay.style.display = 'none';
			loginDisplay.style.display = 'block';
		}else if(this.id==='registerTab'){
			loginDisplay.style.display = 'none';
			registerDisplay.style.display = 'block';
		}
	}

	//INPUT FUNCTIONS

	//Paste Checker

	function pasteChecker(evt, input){
		var pastedText = '';
		//IE	
		if(evt.which){
			pastedText = evt.clipboardData.getData('Text');
		}
		//Other browsers
		else{
			pastedText = evt.clipboardData.getData('text/plain');
		}
		evt.preventDefault();
		if (passwordCharacterChecker(pastedText)){
			input.storedValue = '';
			input.value = '';
			input.storedValue = pastedText;
			for (i=0; i<pastedText.length; i++){
				input.value = input.value + '*';
			}
		}
	}

	//Key Checker

	function specialKeyChecker(evt, passwordInput){
		var keypress;
		//browser compatibility. 'Which' is used by IE
		if(evt.which){
			keypress = evt.which;
		}else{
			keypress = evt.keyCode;
		}
		var passwordInputValue = passwordInput.storedValue;
		var keypressString = keypress.toString();
		//The delete and backspace keys delete the entire password
		if(keypressString.match(/^([8]|3[7-9]|4[06])$/)){
			evt.preventDefault;
			passwordInput.value = '';
			passwordInput.storedValue = '';
			return false;
		}
		/*
		//The left arrow key updates the caret position normally when unselected
		else if(keypress === 37 && passwordInput.caretPosition > 0 && !passwordInput.isSelected){
			passwordInput.caretPosition -= 1;
			passwordInput.isSelected = false;
		//The left arrow key behaves like the up arrow key when the input is selected
		}else if(keypress === 37 && passwordInput.caretPosition > 0 && passwordInput.isSelected){
			passwordInput.caretPosition = 0;
			passwordInput.isSelected = false;
		}else if(keypress === 38){
			passwordInput.caretPosition = 0;
			passwordInput.isSelected = false;
		//The right arrow key updates the caret position normally when unselected
		}else if(keypress === 39 && passwordInput.caretPosition < passwordInputValue.length && !passwordInput.isSelected){
			passwordInput.caretPosition += 1;
			passwordInput.isSelected = false;
		}else if(keypress === 39 && passwordInput.caretPosition < passwordInputValue.length && passwordInput.isSelected){
			passwordInput.isSelected = false;
			passwordInput.caretPosition = passwordInputValue.length;
		//The down arrow key behaves like the down arrow key when the input is selected
		}else if(keypress ===40){
			passwordInput.caretPosition = passwordInputValue.length;
			passwordInput.isSelected = false;
			//console.log(passwordInput.caretPosition);
			//console.log(passwordInput.isSelected);
		}
		*/

	}

	//Input Tab Key Checker: This fires on certain inputs when pressing the tab key
	//The goal is to erase the appropriate password box.

	function tabKeyChecker(evt){
		var keypress;
		if(evt.which){
			keypress = evt.which;
		}else{
			keypress = evt.keyCode;
		}
		//The regular tab function clears all stored caret positions
		if(keypress === 9){
			for(i=0; i<passwordInputs.length; i++){
				var currentValue = passwordInputs[i].value
				passwordInputs[i].caretPosition=currentValue.length;
				console.log(passwordInputs[i].caretPosition);
			}
		}
		//The shift+tab function should do the same
		if(evt.shiftKey && keypress === 9){
			for(i=0; i<passwordInputs.length; i++){
				var currentValue = passwordInputs[i].value
				passwordInputs[i].caretPosition=currentValue.length;
				console.log(passwordInputs[i].caretPosition);
			}
		}
	}

	//The password key checker evaluates and stores input, only showing *'s.

	function passwordKeyChecker(evt, passwordInput){
		var keypress;
		//Firefox and other browsers
		if(evt.which){
			keypress = evt.which;
		//IE
		}else{
			keypress = evt.keyCode;
		}
		
		var keyCharacter = keypress.toString();

		//Prevent keydown-keypress mixups often seen in Firefox. Should work with earlier IE vers.
		if('charCode' in evt && evt.charCode === 0){
			return false;
		//Make sure the key pressed is alphanumeric or one of several special characters
		//The allowable special characters include: !-.,'"`()#$&~
		//These codes correspond to 33, 34, 35, 36, 38, 39, 40, 41, 44, 45, 46, 96, 126
		}else if(passwordInput.value.length<passwordInput.maxLength && keyCharacter.match(/^(3[3-6]|3[8-9]|4[0-1]|4[4-9]|5[0-7]|6[5-9]||[7-8][0-9]|9[06-9]|1[0-1][0-9]||12[0-26])$/)
			){
			passwordInput.caretPosition +=1;
			passwordInput.storedValue = passwordInput.storedValue + String.fromCharCode(keypress);
			evt.preventDefault();
			passwordInput.value = passwordInput.value + '*';
			return false
		//The event for "enter", treated as a submission of the whole form
		}else if(keypress === 13){

		}else{
			evt.preventDefault();
		}
		
	};


	//VERIFICATION FUNCTIONS FOR SUBMIT EVENTS

	//The password verification checks to see if a password contains all necessary characters

	function passwordCharacterChecker(passwordString){
		//Check if there are illegal characters in the password
		if(passwordString.match(/[^A-Za-z0-9\!-.,'"`()#$&~]/)){
			//Throw an exception for illegal characters, and identify which characters are illegal
			console.log('Illegal Password');
			console.log('lower case: ' + passwordString.search(/[a-z]/) +
			' upper case: ' + passwordString.search(/[A-Z]/) +
			' numbers: ' + passwordString.search(/[0-9]/) +
			' symbols: ' + passwordString.search(/[!\-.,'"`()#$&~]/)
			);
		}else{
			return true;
		}
	}

	//The username character checker is similar to the legalCharacterChecker, but
	//only alphanumeric characters and underscores are allowed. 

	function usernameCharacterChecker(usernameString){
		if(usernameString.match(/[^A-Za-z0-9\_]/)){
			console.log('Illegal Username');
			return false;
		}else{
			return true;
		}
	}

	function emailCharacterChecker(emailString){
		//I didn't write the following RegExp, so the extensive comments are to help
		//me learn as much as possible. 
		if(
			/*
			-The RegExp is evaluated as one possibility. The ranges are 
			 there for a single part of the larger whole, unlike the other expressions
			 I've made where they represent many individual possibilities.
			-The first part looks for the actual name, like 'Jake' in Jake@mail.com
			-The second part concatenates an @ on the evaluation
			-The third part checks for all parts of the domain before the .com, always
			 concatenating a period on the end. 
			-The fourth part adds the final com, net, etc. 
			*/
			emailString.match(/^[A-Za-z0-9\.+%+-]+@(?:[A-Za-z0-9\-])+\.[A-Za-z]{2,4}$/)){
			return true;
		}else{
			console.log('Illegal Email');
		}
	}

	function passwordVerify(passwordString){
		if(passwordCharacterChecker(passwordString)){
			//The password should contain at least one of each required 
			//character type
			if(passwordString.match(/[a-z]/) && 
				passwordString.match(/[A-Z]/) &&
				passwordString.match(/[0-9]/) &&
				passwordString.match(/[!\-.,'"`()#$&~]/)){
					//If all conditions are met, the password passes the client-side 
					//stage of verification
					return true;
			}else{
				//Throw an exception for the password, and identify which characters 
				//are missing
				console.log('Illegal Password');
				console.log('lower case: ' + passwordString.search(/[a-z]/) +
				' upper case: ' + passwordString.search(/[A-Z]/) +
				' numbers: ' + passwordString.search(/[0-9]/) +
				' symbols: ' + passwordString.search(/[!-.,'"`()#$&~]/)
				);
			}
		}
	}

	//AJAX FUNCTIONS

	//The registration function

	function register(username, password, email){
		var xhr;
		//Check once more if the fields all have legal characters
		/*
		if(){
			//Compatibility
			if(window.XMLHttpRequest){
				//Most browsers
				xhr = new XMLHttpRequest();
			}
			else{
				//IE6 and IE5
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
			xhr.onreadystatechange = function(){
				var response = xhr.responseText;
				if(xhr.readyState == 4 && xhr.status == 200){
					registerMessage.innerHTML = response;
				}else{
					registerMessage.innerHTML = response;
				}
			};
			xhr.open("GET", "register.php?" + 
				"username=" + username +
				"&password=" + password +
				"&email=" + email +
				"&t=" + Math.random(), true);
			//xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
			xhr.send();
		}
		*/

	}

	function logIn(username, password){

	}


	window.indexFunctions = indexFunctions;

})();
