var map = L.map('mapid').setView([30.25, -97.75], 13);


L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(map)




function getData() {
	var formData = new FormData();
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "http://127.0.0.1:8000/displayparams");
	formData.append("examplekey", "E COLI BACTERIA");
	xhr.onreadystatechange = () => {
	    if (xhr.readyState == 4) {
	        // console.log(xhr.response);
			// console.log('got inside this part');
	        if (xhr.status == 200) {
	            let response = JSON.parse(xhr.response);
				// console.log('got inside handler');
	            console.log(response);
	        };
	    }
	}
	xhr.send(formData);

};

window.onload = function() {
    // setup the button click
    document.getElementById("theButton").onclick = function(ev) {
		ev.preventDefault()
        getData()
    };
}



// let xhr = new XMLHttpRequest();
// xhr.open('POST', 'http://0.0.0.0:8000/displayparams');
// xhr.send(formData);
