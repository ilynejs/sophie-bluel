import { fetchWorks, fetchCategories } from './dataFetching.js';
import { displayWorks, displayCategoriesFilters } from './display.js';
import {
	isUserConnected,
	hideAdminElements,
	showAdminElements,
	logout,
} from './adminFunctions.js';

const init = async () => {
	const user = JSON.parse(localStorage.getItem('user'));

	const logoutButton = document.querySelector('#logout');
	logoutButton.addEventListener('click', () => {
		logout();
	});

	if (isUserConnected()) {
		console.log(user);
		showAdminElements();
	} else {
		hideAdminElements();
	}

	try {
		const works = await fetchWorks();
		const categories = await fetchCategories();

		displayWorks(works);
		displayCategoriesFilters(categories, works);
	} catch (error) {
		console.error("Erreur lors de l'initialisation:", error);
	}
};

init();
