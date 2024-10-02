import {
	isUserConnected,
	hideAdminElements,
	showAdminElements,
	logout,
} from './adminFunctions.js';

const loginForm = document.querySelector('.login-form');
const errorMessage = document.querySelector('.error');

const logoutButton = document.querySelector('#logout');
logoutButton.addEventListener('click', () => {
	logout();
});

if (isUserConnected()) {
	showAdminElements();
} else {
	hideAdminElements();
}

loginForm.addEventListener('submit', (event) => {
	event.preventDefault();

	let emailInput = document.querySelector('#email');
	let passwordInput = document.querySelector('#password');

	const email = emailInput.value;
	const password = passwordInput.value;

	if (email === '' || password === '') {
		errorMessage.textContent = 'Veuillez remplir tous les champs';
		return;
	}

	handleLogin(email, password);

	emailInput.value = '';
	passwordInput.value = '';
	emailInput.focus();
});

const handleLogin = async (email, password) => {
	try {
		const response = await fetch('http://localhost:5678/api/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		});

		const user = await response.json();

		if (response.ok) {
			localStorage.setItem('user', JSON.stringify(user));
			window.location.href = './index.html';
		} else {
			errorMessage.textContent = data.message;
		}
	} catch (error) {
		console.error(error);
	}
};
