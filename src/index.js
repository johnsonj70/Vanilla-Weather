function search(event) {
	event.preventDefault();
	let searchInputElement = document.querySelector('#search-form-input');
	searchForCity(searchInputElement.value);
}

function searchForCity(city) {
	const apiKey = '00a6bfb9b6053b4664t55oaa8c181e51';
	const url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
	axios.get(url).then(displayTemperature);
}

function displayTemperature(response) {
	let cityElement = document.querySelector('#city');
	cityElement.innerHTML = response.data.city;

	let temperatureElement = document.querySelector('#city-temp');
	temperatureElement.innerHTML = fahrenheitToCelsius(
		Math.floor(response.data.temperature.current)
	);
	temperatureElement.innerHTML = Math.round(
		fahrenheitToCelsius(response.data.temperature.current)
	);
	let descriptionElement = document.querySelector('#description');
	descriptionElement.innerHTML = response.data.condition.description;

	let humidityElement = document.querySelector('#humidity');
	humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

	let windSpeedElement = document.querySelector('#wind-speed');
	windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
	date = new Date(response.data.time * 1000);

	let iconElement = document.querySelector('#icon');
	iconElement.innerHTML = `<img src="${response.data.condition.icon_url}", class="weather-app-icon" />`;
	formatDayAndTime(date);
}

function celsiusToFahrenheit(celsius) {
	const fahrenheit = (celsius * 9) / 5 + 32;
	return fahrenheit;
}

function fahrenheitToCelsius(fahrenheit) {
	const celsius = ((fahrenheit - 32) * 5) / 9;
	return celsius;
}

function formatDayAndTime(date) {
	let hour = date.getHours();
	let minutes = date.getMinutes();

	let days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];
	let day = days[date.getDay()];

	if (minutes < 10) {
		minutes = `0${minutes}`;
	}

	if (hour < 10) {
		hour = `0${hour}`;
	}

	let timeElement = document.querySelector('#time');
	timeElement.innerHTML = `${day}, ${hour}:${minutes}:`;
	return timeElement;
}

let searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', search);
