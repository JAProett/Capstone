function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(30.307182,-97.755996),
    zoom: 10,
    mapTypeId: 'roadmap',
    streetViewControl: false,
    mapTypeControl: false,
    scrollwheel: false,
});
}
