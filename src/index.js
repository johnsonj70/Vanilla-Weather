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
	let temperatureElement = document.querySelector('#city-temp');
	let descriptionElement = document.querySelector('#description');
	let humidityElement = document.querySelector('#humidity');
	let windSpeedElement = document.querySelector('#wind-speed');
	let timeElement = document.querySelector('#time');
	let iconElement = document.querySelector('#icon');

	cityElement.innerHTML = response.data.city;
	cityElement.innerHTML = cityElement.innerHTML.toUpperCase();

	temperatureElement.innerHTML = fahrenheitToCelsius(
		Math.round(response.data.temperature.current)
	);
	temperatureElement.innerHTML = Math.round(
		fahrenheitToCelsius(response.data.temperature.current)
	);
	descriptionElement.innerHTML = response.data.condition.description;
	descriptionElement.innerHTML = descriptionElement.innerHTML.toUpperCase();

	humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
	windSpeedElement.innerHTML =
		Math.round(kmhToMph(`${response.data.wind.speed}`)) + ` M/PH`;
	date = new Date(response.data.time * 1000);
	timeElement.innerHTML = formatDayAndTime(date).toUpperCase();
	iconElement.innerHTML = `<img src="${response.data.condition.icon_url}", class="weather-app-icon" />`;
	getForecast(response.data.city);
}

function celsiusToFahrenheit(celsius) {
	const fahrenheit = (celsius * 9) / 5 + 32;
	return fahrenheit;
}

function fahrenheitToCelsius(fahrenheit) {
	const celsius = ((fahrenheit - 32) * 5) / 9;
	return celsius;
}

function kmhToMph(kmh) {
	// 1 kilometer = 0.621371 miles
	return kmh * 0.621371;
}

function mphTokmh(mph) {
	// 1 mile = 1.600934 kilometres
	return mph * 1.60934;
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

	let months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	let month = months[date.getMonth()];
	let dayOfMonth = date.getDate();

	if (minutes < 10) {
		minutes = `0${minutes}`;
	}

	if (hour < 10) {
		hour = `0${hour}`;
	}

	return `${day} ${dayOfMonth} ${month}, ${hour}:${minutes}`;
}

function getForecast(city) {
	let apiKey = '00a6bfb9b6053b4664t55oaa8c181e51';
	let url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
	axios.get(url).then(displayForecast);
}

function formatDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	return days[date.getDay()];
}

function displayForecast(response) {
	console.log(response.data);
	let forecastHTML = '';

	response.data.daily.forEach(function (day, index) {
		if (index > 0 && index < 6) {
			forecastHTML =
				forecastHTML +
				`
					<div class="daily-forecast">
						<div class="forecast-weekday">${formatDay(day.time).toUpperCase()}</div>
						<div class="forecast-icon">
							<img
								src="${day.condition.icon_url}" class="forecast-icon"
							/>
						</div>
						<div class="daily-temperatures">
							<div class="daily-temperature"><strong>${Math.round(
								day.temperature.maximum
							)}° </strong></div>
							<div class="daily-temperature">${Math.round(day.temperature.minimum)}°</div>
						</div>
					</div>
		`;
		}
	});
	let forecastElement = document.querySelector('#weather-forecast');
	forecastElement.innerHTML = forecastHTML;
}

let searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', search);

searchForCity('Barcelona');
