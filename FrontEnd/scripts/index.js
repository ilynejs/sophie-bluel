import { fetchWorks, fetchCategories } from './dataFetching.js';
import { displayWorks, displayCategoriesFilters } from './display.js';
import {
	isUserConnected,
	hideAdminElements,
	showAdminElements,
	logout,
} from './adminFunctions.js';
import { buildWorkModal } from './modal.js';

const init = async () => {
	const logoutButton = document.querySelector('#logout');
	logoutButton.addEventListener('click', () => {
		logout();
	});

	let works = [];
	let categories = [];

	try {
		works = await fetchWorks();
		categories = await fetchCategories();

		displayWorks(works);
		displayCategoriesFilters(categories, works);

		const modifyWorksButton = document.querySelector('#modify-works');

		modifyWorksButton.addEventListener('click', () => {
			buildWorkModal(works);
		});
	} catch (error) {
		console.error("Erreur lors de l'initialisation:", error);
	}

	if (isUserConnected()) {
		showAdminElements();

		const modifyWorksButton = document.querySelector('#modify-works');

		modifyWorksButton.addEventListener('click', () => {
			buildWorkModal(works);
		});
	} else {
		hideAdminElements();
	}
};

init();
