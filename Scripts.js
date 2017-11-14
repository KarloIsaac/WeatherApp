function testFuction() {
    requestLocation();
}


function requestLocation() {
    var processPosition = function(position) {
        var coordinates = position.coords;
        processCoordinates(coordinates.latitude, coordinates.longitude);
    }
    navigator.geolocation.getCurrentPosition(processPosition);
}


function processCoordinates(latitude, longitude) {
    console.log("latitude: " + latitude + ", longitude: " + longitude);
}
