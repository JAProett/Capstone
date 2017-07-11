const map = L.map('mapid').setView([30.25, -97.75], 10);
let redCircle = new L.CircleMarker({
    color: 'red',
    fillColor: '#ff0000',
    fillOpacity: 0.5
});

window.onload = function() {
	L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
	}).addTo(map)
	document.getElementById('theButton').onclick = function(ev) {
		ev.preventDefault()
		getData()
	};
	document.getElementById('getSiteLoc').onclick = function(ev) {
		ev.preventDefault()
		getData()
	};
}


//////////////Makes call to server and returns data//////////
function getData(timPar, watershed) {
    let formData = new FormData();
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:8000/displayparams');

////// put input vars here from froms //////////////////////
////// use either timePar or watershed //////
    formData.append('examplekey', 'E COLI BACTERIA');
	formData.append('daysago', '100');
	formData.append('watershed', 'Barton Creek');
//////////////////////////////////////////////////////////////
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                let response = JSON.parse(xhr.response);
                let arr = response.key
                console.log(arr);
                arr.forEach(function(el) {
					if (el.result < 90) {
						L.circleMarker([el.lat_dd_wgs84, el.lon_dd_wgs84],{
						    color: 'green',
						    fillColor: '#00ff00',
						    fillOpacity: 0.5
						}).addTo(map).bindPopup(el.site_name)
					}
                    if (el.result >= 90 && el.result < 125) {
						L.circleMarker([el.lat_dd_wgs84, el.lon_dd_wgs84],{
						    color: 'yellow',
						    fillColor: '#ffff00',
						    fillOpacity: 0.5
						}).addTo(map).bindPopup(el.site_name)
                    }
					if (el.result >= 125) {
						L.circleMarker([el.lat_dd_wgs84, el.lon_dd_wgs84],{
						    color: 'red',
						    fillColor: '#ff0000',
						    fillOpacity: 0.5
						}).addTo(map).bindPopup(el.site_name)
					}
                });
            };
        }
    }
    xhr.send(formData);
};
