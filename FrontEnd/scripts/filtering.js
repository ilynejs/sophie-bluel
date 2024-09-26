import { displayWorks } from './display.js';

const getFilteredWorks = (works, categoryId) => {
	if (categoryId === 'all') {
		return works;
	} else {
		return works.filter((work) => work.categoryId === categoryId);
	}
};

const handleCategoryClick = (categoryButton, categoryId, works) => {
	removeActiveClassFromAllButtons();
	setActiveButton(categoryButton);

	const filteredWorks = getFilteredWorks(works, categoryId);
	displayWorks(filteredWorks);
};

const removeActiveClassFromAllButtons = () => {
	const buttons = document.querySelectorAll('.category-filter button');
	for (const button of buttons) {
		button.classList.remove('active');
	}
};

const setActiveButton = (button) => {
	button.classList.add('active');
};

export { getFilteredWorks, handleCategoryClick };
