
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
    console.log(url);
    xmlHttpRequest.open("GET", url, true);
    xmlHttpRequest.send();
}


function diplayWeatherInformationResponse(jsonResponse) {
    var weather = jsonResponse.weather[0];
    document.getElementById("weather-description").innerHTML = weather.description.toUpperCase();
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
    var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
            latitude + "," + longitude + "&sensor=true&key=AIzaSyC9FJPGJX7FLhjybKWBmr3hWkePo1Wfz24"
    xmlHttpRequest.open("GET", url);
    xmlHttpRequest.send();
}


function diplayLocationInformationResponse(jsonResponse) {
    var results = jsonResponse.results[0];
    var location = results.formatted_address;
    document.getElementById("location").innerHTML = location;
}


var TemperaturesScaleChanger = function() {
    var currentScaleName = "celsius";

    this.displayFahrenheit = function() {
        changeTemperatureScale("fahrenheit");
    }

    this.displayCelsius = function() {
        changeTemperatureScale("celsius");
    }

    function changeTemperatureScale(scaleName) {
        if(scaleName === currentScaleName) {
            return;
        }
        currentScaleName = scaleName;
        var tempConverterFunction = currentScaleName === "celsius" ? retrieveCelsius : retrieveFahrenheit;
        changedAllElementDisplayedTemperature(tempConverterFunction);
        updateTempButtonSelectionState();
    }

    function changedAllElementDisplayedTemperature(temperatureAdjustingFunction) {
        var targetElementsIdsArray = ["temp", "min-temp", "max-temp"];
        for(i in targetElementsIdsArray) {
            var elementId = targetElementsIdsArray[i];
            var tempElement = document.getElementById(elementId);
            changedSingleElementDisplayedTemperature(tempElement, temperatureAdjustingFunction);
        }
    }

    function changedSingleElementDisplayedTemperature(tempElement, temperatureAdjustingFunction) {
        var originalTemperature = tempElement.innerHTML;
        var adjustedTemperature = temperatureAdjustingFunction(originalTemperature);
        tempElement.innerHTML = adjustedTemperature;
    }

    function retrieveCelsius(fahrenheit) {
        celsius = (fahrenheit - 32)*5/9
        return roundTo2Decimals(celsius);
    }

    function retrieveFahrenheit(celsius) {
        fahrenheit = 9*celsius/5 + 32;
        return roundTo2Decimals(fahrenheit);
    }

    function roundTo2Decimals(value) {
        value = Math.round(value * 100 + Number.EPSILON) / 100;
        return value;
    }


    function updateTempButtonSelectionState() {
        var selectedButtonId = currentScaleName === "celsius" ? "celsius-button" : "fahrenheit-button";
        var selectedButton = document.getElementById(selectedButtonId);
        selectedButton.className  = "temperature-conversions selected-temperature-scale";
        var unselectedButtonId = currentScaleName === "celsius" ? "fahrenheit-button" : "celsius-button";
        var unselectedButton = document.getElementById(unselectedButtonId);
        unselectedButton.className  = "temperature-conversions";
    }
}


const temperaturesScaleChanger = new TemperaturesScaleChanger();
