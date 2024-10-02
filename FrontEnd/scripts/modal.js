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

const buildWorkModal = (works) => {
	const modalOverlay = document.querySelector('.modal-overlay');
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

                <button class="add-btn">Ajouter une photo</button>
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

	const addPhotoBtn = modalOverlay.querySelector('.add-btn');
	addPhotoBtn.addEventListener('click', () => {
		// À faire : ajouter la modale de l'ajout de photo
		console.log('Ajouter une photo');
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
			console.log(item);
			item.parentElement.removeChild(item);
		} else {
			console.error('Erreur lors de la suppression du travail');
		}
	} catch (error) {
		console.error(error);
	}
};

export { buildWorkModal };
