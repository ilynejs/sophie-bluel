import { fetchWorks } from './dataFetching.js';
import { displayWorks } from './display.js';

const hideModal = () => {
	const modalDiv = document.querySelector('#modals');
	modalDiv.style.display = 'none';

	const modalOverlay = document.querySelector('.modal-overlay');
	modalOverlay.style.display = 'none';
};

const showModal = () => {
	const modalDiv = document.querySelector('#modals');
	modalDiv.style.display = 'block';

	const modalOverlay = document.querySelector('.modal-overlay');
	modalOverlay.style.display = 'block';
};

/* Modale de gestion des travaux */
const buildWorkModal = (works, categories) => {
	const modalOverlay = document.querySelector('.modal-overlay');
	modalOverlay.innerHTML = '';

	showModal();

	modalOverlay.addEventListener('click', (event) => {
		if (event.target === modalOverlay) {
			hideModal();
		}
	});

	const modalContent = `
        <section class="modal gallery-modal">
            <header class="modal-header">
                <div class="actions">
                    <button class="close-btn">
                        <img src="./assets/icons/close.png" alt="icon fermeture" />
                    </button>
                </div>
                <h3>Galerie photo</h3>
            </header>

            <div class="modal-content">
                <ul class="gallery">
                    <!-- Les travaux affichés dynamiquement ici -->
                </ul>

                <hr class="modal-divider" />

                <button class="switch-add-btn">Ajouter une photo</button>
            </div>
        </section>
    `;

	modalOverlay.innerHTML = modalContent;

	const gallery = modalOverlay.querySelector('.gallery');
	buildGallery(works, gallery);
	buildDeleteBtn(gallery);

	const closeModalBtn = modalOverlay.querySelector('.close-btn');
	closeModalBtn.addEventListener('click', () => {
		hideModal();
	});

	const addPhotoBtn = modalOverlay.querySelector('.switch-add-btn');
	addPhotoBtn.addEventListener('click', () => {
		buildAddPhotoModal(categories);
	});
};

const buildGallery = (works, gallery) => {
	for (const work of works) {
		const listItem = document.createElement('li');
		listItem.innerHTML = `
        <img src="${work.imageUrl}" alt="${work.title}" />
        <button class="delete-btn">
            <img src="./assets/icons/delete.png" alt="icon suppression" />
        </button>
    `;
		listItem.setAttribute('work-id', work.id);

		gallery.appendChild(listItem);
	}
};

const buildDeleteBtn = (gallery) => {
	const deleteButtons = gallery.querySelectorAll('.delete-btn');

	for (const button of deleteButtons) {
		button.addEventListener('click', (event) => {
			const listItem = event.target.closest('li');
			const workId = listItem.getAttribute('work-id');

			if (workId) {
				deleteWork(workId, listItem);
			} else {
				console.error('Erreur lors de la suppression du travail');
			}
		});
	}
};

const deleteWork = async (workId, item) => {
	const user = JSON.parse(localStorage.getItem('user'));

	try {
		const res = await fetch(`http://localhost:5678/api/works/${workId}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${user.token}`,
			},
		});
		if (res.ok) {
			item.remove();
			removeWorkFromGallery(workId);
		} else {
			console.error('Erreur lors de la suppression du travail');
		}
	} catch (error) {
		console.error(error);
	}
};

const removeWorkFromGallery = (workId) => {
	const gallery = document.querySelector('.gallery');
	const works = gallery.querySelectorAll('figure');

	for (const work of works) {
		const workIdAttr = work.getAttribute('work-id');
		if (workIdAttr === workId) {
			work.remove();
		}
	}
};

/* Modale d'ajout de photo */
const buildAddPhotoModal = (categories) => {
	const modalOverlay = document.querySelector('.modal-overlay');
	modalOverlay.innerHTML = '';

	const modalContent = document.createElement('section');
	modalContent.classList.add('modal', 'add-photo-modal');

	modalContent.innerHTML = `
		<header class="modal-header">
			<div class="actions">
				<button class="back-btn">
					<img src="./assets/icons/arrow-left.png" alt="icone de retour" />
				</button>
				<button class="close-btn">
					<img src="./assets/icons/close.png" alt="icone de fermeture" />
				</button>
			</div>
			<h3>Ajouter une photo</h3>
		</header>
		<div class="modal-content">
			<form id="add-photo-form" method="post">
				<label class="image-label">
					<img src="./assets/icons/picture_placeholder.png" alt="placeholder de l'image" />
					<input type="file" name="image" id="image-input" required />
					<div class="fake-button">+ Ajouter photo</div>
					<span class="details">jpg, png : 4mo max</span>
                    <img class="image-preview" src="" alt="preview de l'image" />
				</label>
                <p class="error"></p>
				<label>
					Titre
					<input type="text" name="title" id="title" required />
				</label>
				<label>
					Catégorie
					<select name="category" id="category" required>
						<option value="" selected disabled hidden></option>
					</select>
				</label>
				<hr class="modal-divider" />
				<input type="submit" value="Valider" class="disabled" />
			</form>
		</div>
	`;

	modalOverlay.appendChild(modalContent);

	const categorySelect = modalContent.querySelector('#category');
	for (const category of categories) {
		const option = document.createElement('option');
		option.value = category.id;
		option.textContent = category.name;
		categorySelect.appendChild(option);
	}

	const closeModalBtn = modalContent.querySelector('.close-btn');
	const backBtn = modalContent.querySelector('.back-btn');

	closeModalBtn.addEventListener('click', () => {
		hideModal();
	});
	backBtn.addEventListener('click', async () => {
		const works = await fetchWorks();
		buildWorkModal(works, categories);
	});

	setupImageUpload(modalContent);

	const submitBtn = modalContent.querySelector('input[type="submit"]');
	const form = document.querySelector('#add-photo-form');

	form.addEventListener('change', () => {
		if (isFormValid(form)) {
			submitBtn.classList.remove('disabled');
		} else {
			submitBtn.classList.add('disabled');
		}
	});

	form.addEventListener('submit', async (event) => {
		event.preventDefault();
		const formData = new FormData(form);
		const user = JSON.parse(localStorage.getItem('user'));

		try {
			const res = await fetch('http://localhost:5678/api/works', {
				method: 'POST',
				body: formData,
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			});
			if (res.ok) {
				const works = await fetchWorks();
				displayWorks(works);

				form.reset();
				hideModal();
			} else {
				console.error("Erreur lors de l'ajout de la photo");
			}
		} catch (error) {
			console.error('Erreur:', error);
		}
	});
};

const setupImageUpload = (modalContent) => {
	const imagePreview = document.querySelector('.image-preview');
	const imageInput = modalContent.querySelector('#image-input');
	const placeholderImg = modalContent.querySelector(
		`.image-label img[alt="placeholder de l'image"]`
	);
	const fakeButton = modalContent.querySelector('.fake-button');
	const detailsText = modalContent.querySelector('.details');

	imageInput.addEventListener('change', (event) => {
		const file = event.target.files[0];
		const errorElement = document.querySelector('.error');
		errorElement.textContent = '';

		// Vérification du type de fichier
		const validTypes = ['image/jpeg', 'image/png'];
		if (file && !validTypes.includes(file.type)) {
			errorElement.textContent =
				'Le fichier doit être au format jpg ou png.';
			imageInput.value = '';
			return;
		}

		// Vérfication de la taille du fichier
		const maxSize = 4 * 1024 * 1024;
		if (file && file.size > maxSize) {
			errorElement.textContent = 'Le fichier doit être inférieur à 4 Mo.';
			imageInput.value = '';
			return;
		}

		if (file) {
			const imageUrl = URL.createObjectURL(file);

			imagePreview.src = imageUrl;
			imagePreview.style.display = 'block';

			placeholderImg.style.display = 'none';
			fakeButton.style.display = 'none';
			detailsText.style.display = 'none';

			errorElement.textContent = '';
		}
	});
};

const isFormValid = (form) => {
	return (
		form.querySelector('#image-input').files.length > 0 &&
		form.querySelector('#title').value !== '' &&
		form.querySelector('#category').value !== ''
	);
};

export { buildWorkModal, buildAddPhotoModal };
