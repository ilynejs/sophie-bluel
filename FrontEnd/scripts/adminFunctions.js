const isUserConnected = () => {
	return localStorage.getItem('user') !== null;
};

const logout = () => {
	localStorage.removeItem('user');
	window.location.href = './index.html';
};

const hideAdminElements = () => {
	const adminElements = document.querySelectorAll('.admin');
	for (const adminElement of adminElements) {
		adminElement.style.display = 'none';
	}

	const visitorElements = document.querySelectorAll('.visitor');
	for (const visitorElement of visitorElements) {
		visitorElement.style.display = 'block';
	}

	const visitorFlexElements = document.querySelectorAll('.visitor-flex');
	for (const visitorFlexElement of visitorFlexElements) {
		visitorFlexElement.style.display = 'flex';
	}
};

const showAdminElements = () => {
	const adminElements = document.querySelectorAll('.admin');
	for (const adminElement of adminElements) {
		adminElement.style.display = 'block';
	}

	const visitorElements = document.querySelectorAll('.visitor');
	for (const visitorElement of visitorElements) {
		visitorElement.style.display = 'none';
	}
};

export { isUserConnected, logout, hideAdminElements, showAdminElements };
