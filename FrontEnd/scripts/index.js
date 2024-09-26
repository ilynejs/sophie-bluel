import { fetchWorks, fetchCategories } from './dataFetching.js';
import { displayWorks, displayCategoriesFilters } from './display.js';

const init = async () => {
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
