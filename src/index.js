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
	let day = date.getDay();
	let hours = date.getHours();
	let minutes = date.getMinutes();

	if (minutes < 10) {
		minutes = `0${minutes}`;
	}

	if (hours < 10) {
		hours = `0${newHour}`;
	}

	let days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];

	let formattedDay = days[day];
	return `${formattedDay}, ${hours}:${minutes}`;
}

let searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', search);

let currentDateElement = document.querySelector('#day-and-time');
let currentDate = new Date();
currentDateElement.innerHTML = formatDayAndTime(currentDate);
