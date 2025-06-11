function search(event) {
	event.preventDefault();
	let searchInputElement = document.querySelector('#search-form-input');
	searchForCity(searchInputElement.value);
}
