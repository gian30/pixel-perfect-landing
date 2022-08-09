// on click submit button get the input values and send them to the server
function formSubmit(event) {
	event.preventDefault();
	event.stopPropagation();
	var name = document.querySelector('.input-name').value;
	var email = document.querySelector('.input-email').value;
	var phone = document.querySelector('.input-phone').value;
	var message = document.querySelector('.input-message').value;
	var data = { name, email, phone, message };
	if (!name || name === '') {
		showMessage('Please enter your name');
		return;
	}
	if (!email || email === '') {
		showMessage('Please enter your email');
		return;
	}
	if (!phone || phone === '') {
		showMessage('Please enter your phone');
		return;
	}
	if (!message || message === '') {
		showMessage('Please enter the message');
		return;
	}
	var xhr = new XMLHttpRequest();
	// on message sent show message in modal
	xhr.onreadystatechange = function() {
		if (xhr.readyState == XMLHttpRequest.DONE) {
			if (JSON.parse(xhr.responseText).ok) {
				showMessage('Thank you for getting in touch! \nWe will get back to you as soon as possible.');
				// reset form
				document.querySelector('.input-name').value = '';
				document.querySelector('.input-email').value = '';
				document.querySelector('.input-phone').value = '';
				document.querySelector('.input-message').value = '';
			} else if (JSON.parse(xhr.responseText).error) {
				let errorTitle = JSON.parse(xhr.responseText).error;
				let errors = JSON.parse(xhr.responseText).errors.map((error) => error.message).join('\n');
				let errorMessage = `${errorTitle}`;
				if (errorTitle != errors) {
					errorMessage = `${errorTitle}:\n${errors}`;
				}
				showMessage(errorMessage);
			}
		}
	};
	// send form data to server
	xhr.open('POST', 'https://formspree.io/f/xwkzeanq');
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify(data));
}

// show message in modal
function showMessage(message) {
	modal.style.display = 'block';
	document.querySelector('#modal-text').innerHTML = message;
}

// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

// When the user clicks on <span> (x), close the modal
if (span) {
	span.onclick = function() {
		modal.style.display = 'none';
	};

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = 'none';
		}
	};
	
	// trigger on click submit button
	document.querySelector('#contact-submit').addEventListener('click', formSubmit, false);
}

// on product page load get the product info
var url = new URL(window.location.href);
if (url.searchParams.get('name')) {
	var name = url.searchParams.get('name');
	var desc = url.searchParams.get('desc');
	// assign name to .project h1
	document.querySelector('.project h1').innerHTML = name;
	document.querySelector('.project .project-desc').innerHTML = desc;
}

