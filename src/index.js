function search(event) {
	event.preventDefault();
	let searchInput = document.querySelector('#search-form-input');
	let cityElement = document.querySelector('#city');
	cityElement.innerHTML = searchInput.value;
	searchForCity(searchInput.value);
}

function searchForCity(city) {
	const apiKey = '00a6bfb9b6053b4664t55oaa8c181e51';
	const url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
	axios.get(url).then(refreshWeather);
}

function refreshWeather(response) {
	let temperatureElement = document.querySelector('#city-temp');
	let cityElement = document.querySelector('#city');
	cityElement.innerHTML = response.data.city;
	temperatureElement.innerHTML = Math.round(response.data.temperature.current);
}

function celsiusToFahrenheit(celsius) {
	const fahrenheit = (celsius * 9) / 5 + 32;
	return fahrenheit;
}

function fahrenheitToCelsius(fahrenheit) {
	const celsius = ((fahrenheit - 32) * 5) / 9;
	return celsius;
}

let searchFormElement = document.querySelector('#search-form');
searchFormElement.addEventListener('submit', search);
