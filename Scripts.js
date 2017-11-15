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
    var xmlHttpRequest  = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function() {
        if(xmlHttpRequest.readyState === 4 && xmlHttpRequest.status == 200) {
            var jsonResponse = JSON.parse(xmlHttpRequest.responseText);
            processJsonResponse(jsonResponse);
        }
    }
    var url = "https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude;
    xmlHttpRequest.open("GET", url, true);
    xmlHttpRequest.send();
}


function processJsonResponse(jsonResponse) {
    var weather = jsonResponse.weather[0];
    console.log(weather.description);
}
