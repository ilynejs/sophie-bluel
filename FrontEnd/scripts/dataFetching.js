const fetchWorks = async () => {
	try {
		const response = await fetch(`http://localhost:5678/api/works`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

const fetchCategories = async () => {
	try {
		const response = await fetch('http://localhost:5678/api/categories');
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export { fetchWorks, fetchCategories };
