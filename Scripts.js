function testFuction() {
    updateWeather();
}


function updateWeather() {
    var processPosition = function(position) {
        var coordinates = position.coords;
        processCoordinates(coordinates.latitude, coordinates.longitude);
    }
    navigator.geolocation.getCurrentPosition(processPosition);
}


function processCoordinates(latitude, longitude) {
    updateWeatherIformation(latitude, longitude);
    updateLocation(latitude, longitude);
}


function updateWeatherIformation(latitude, longitude) {
    var xmlHttpRequest  = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function() {
        if(xmlHttpRequest.readyState === 4 && xmlHttpRequest.status == 200) {
            var jsonResponse = JSON.parse(xmlHttpRequest.responseText);
            diplayWeatherInformationResponse(jsonResponse);
        }
    }
    var url = "https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude;
    xmlHttpRequest.open("GET", url, true);
    xmlHttpRequest.send();
}


function diplayWeatherInformationResponse(jsonResponse) {
    var weather = jsonResponse.weather[0];
    document.getElementById("weather-description").innerHTML = weather.description;
    document.getElementById("weather-image").src = weather.icon;
    var temperatureInfo = jsonResponse.main;
    document.getElementById("temp").innerHTML = temperatureInfo["temp"];
    document.getElementById("min-temp").innerHTML = temperatureInfo["temp_min"];
    document.getElementById("max-temp").innerHTML = temperatureInfo["temp_max"];
}


function updateLocation(latitude, longitude) {
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function() {
        if(xmlHttpRequest.readyState === 4 && xmlHttpRequest.status == 200) {
            jsonResponse = JSON.parse(xmlHttpRequest.responseText);
            diplayLocationInformationResponse(jsonResponse);
        }
    }
    var url = "https://maps.googleapis.com/maps/api/geocode/json?result_type=locality&latlng=" +
            latitude + "," + longitude + "&sensor=true&key=AIzaSyC9FJPGJX7FLhjybKWBmr3hWkePo1Wfz24"
    xmlHttpRequest.open("GET", url);
    xmlHttpRequest.send();
}


function diplayLocationInformationResponse(jsonResponse) {
    var results = jsonResponse.results[0];
    var location = results.formatted_address;
    document.getElementById("location").innerHTML = location;
}
