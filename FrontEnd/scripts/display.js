import { handleCategoryClick } from './filtering.js';

const displayWorks = (works) => {
	const worksGallery = document.querySelector('.gallery');
	worksGallery.innerHTML = '';

	for (const work of works) {
		const workFigure = document.createElement('figure');
		const workImg = document.createElement('img');
		const workCaption = document.createElement('figcaption');

		workImg.src = work.imageUrl;
		workImg.alt = work.title;
		workCaption.textContent = work.title;

		workFigure.appendChild(workImg);
		workFigure.appendChild(workCaption);
		worksGallery.appendChild(workFigure);
	}
};

const displayCategoriesFilters = (categories, works) => {
	const categoriesFilters = document.querySelector('.categories-filters');
	categoriesFilters.innerHTML = '';

	// Bouton "Tous"
	const allCategoryItem = document.createElement('li');
	allCategoryItem.classList.add('category-filter');

	const allCategoryButton = document.createElement('button');
	allCategoryButton.textContent = 'Tous';
	allCategoryButton.setAttribute('category-id', 'all');
	allCategoryButton.classList.add('active');
	allCategoryItem.appendChild(allCategoryButton);

	// Comportement de clic sur le bouton "Tous"
	allCategoryButton.addEventListener('click', () =>
		handleCategoryClick(allCategoryButton, 'all', works)
	);

	categoriesFilters.appendChild(allCategoryItem);

	// Boutons pour chaque catégorie
	for (const category of categories) {
		const categoryItem = document.createElement('li');
		categoryItem.classList.add('category-filter');

		const categoryButton = document.createElement('button');
		categoryButton.textContent = category.name;
		categoryButton.setAttribute('category-id', category.id);
		categoryItem.appendChild(categoryButton);

		// Comportement de clic sur le bouton de la catégorie
		categoryButton.addEventListener('click', () =>
			handleCategoryClick(categoryButton, category.id, works)
		);

		categoriesFilters.appendChild(categoryItem);
	}
};

export { displayWorks, displayCategoriesFilters };
