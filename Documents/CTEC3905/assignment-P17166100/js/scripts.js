"use strict";

let slideIndex = 1;
showSlides(slideIndex);

//Next/Previous controls
function plusSlides(n) {
	showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
	showSlides(slideIndex = n);
}

function showSlides(n) {
		let i;
		let slides =
	document.getElementsByClassName("animeSlides");
		let change =
	document.getElementsByClassName("op");
		let captionText =
	document.getElementById("description");

		if (n > slides.length) {slideIndex = 1}
		if (n < 1) {slideIndex = slides.length}
		for (i = 0; i < slides.length; i++) {
			slides[i].style.display = "none";
		}
		for (i = 0; i < change.length; i++) {
			change[i].className =
		change[i].className.replace("active", "");
		}
		slides[slideIndex-1].style.display =
		"block";
		change[slideIndex-1].className += "active";
			captionText.innerHTML =
		change[slideIndex-1].alt;
		}

let checkConfirmation = ev => {
	if (myPassword.value != myPassword.value) {
		myPassword.setCustomValidity("These passwords do not match!");
	} else {
		myPassword.setCustomValidity('');
	}
};

myPassword.addEventListener('input', checkConfirmation);

login.addEventListener('submit', ev => {
	const modal = document.querySelector('.modal');
	modal.textContent = `Logged in as ${myUser.value}`;
	modal.classList.add('visible');
	loadUser();
});


register.addEventListener('submit', ev => {
	const modal = document.querySelector('.modal');
	modal.textContent = `Registered as ${newUser.value}`;
	modal.classList.add('visible');
	saveUser(newUser.value, newPassword.value);
})

let username = document.getElementById('newUser');
let password = document.getElementById('newPassword');

function saveUser(username, password){
	const account = {"username": username, "password": password};
	localStorage.setItem('user', JSON.stringify(account));
}

function loadUser() {
	return JSON.parse(localStorage.getItem('user'));
}


function checkStorage() {
	const storedUser = localStorage.getItem('username');
	const storedPass = localStorage.getItem('password');

	const loginUser = document.getElementById('myUser');
	const loginPass = document.getElementById('myPassword');
}
