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
        // test()
        // testcalc()
    };
}

////////////Makes call to server and returns data//////////
function getData(timPar, watershed) {
    let formData = new FormData();
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:8000/displayparams');

    ////// put input vars here from froms //////////////////////
    ////// use either timePar or watershed //////
    // formData.append('examplekey', 'E COLI BACTERIA');
    // formData.append('daysago', 100);
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
                        L.circleMarker([el.lat_dd_wgs84, el.lon_dd_wgs84], {
                            color: 'green',
                            fillColor: '#00ff00',
                            fillOpacity: 0.5
                        }).addTo(map).bindPopup(el.site_name)
                    }
                    if (el.result >= 90 && el.result < 125) {
                        L.circleMarker([el.lat_dd_wgs84, el.lon_dd_wgs84], {
                            color: 'yellow',
                            fillColor: '#ffff00',
                            fillOpacity: 0.5
                        }).addTo(map).bindPopup(el.site_name)
                    }
                    if (el.result >= 125) {
                        L.circleMarker([el.lat_dd_wgs84, el.lon_dd_wgs84], {
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

function test() {
    let formData = new FormData();
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:8000/statistics/sitesample');
    formData.append('SITE_NAME', 'Barton Spring Pool @ Downstream Dam');
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            // console.log('wge');
            if (xhr.status == 200) {
                console.log('here?');
                let response = JSON.parse(xhr.response);
                console.log(response);
            };
        }
    }
    xhr.send(formData);
};

function testcalc() {
    let formData = new FormData();
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:8000/statistics/estimate');
    formData.append('SITE_NAME', 'Barton Spring Pool @ Downstream Dam')
    formData.append('M_Result', 21.2379235)
    formData.append('M_Error', 4.77e-15)
    formData.append('M_WT_Result', 21.30872617)
    formData.append('M_PH_Result', 7.488240437)
    formData.append('M_DIS_Result', 7.015453552)
    formData.append('M_TUR_Result', 2.565081967)
    formData.append('M_DS_Rain', 11.74863388)
    formData.append('M_Temp', 21.4)
    formData.append('N', 915.0)
    formData.append('E_std', 26.57328948)
    formData.append('R2', 0.100582281)
    formData.append('R22', 0.21123673)
    formData.append('PARM_INTERCIP', 10.01260151)
    formData.append('tSTAT_INTERCIP', 0.164535066)
    formData.append('PARM_WT', 0.152127225)
    formData.append('tSTAT_WT', 0.133520882)
    formData.append('PARM_PH', 0.458821011)
    formData.append('tSTAT_PH', 0.616648124)
    formData.append('PARM_DIS', 0.419624687)
    formData.append('tSTAT_DIS', 0.053841082)
    formData.append('PARM_TUR', 0.014185995)
    formData.append('tSTAT_TUR', 0.881240542)
    formData.append('PARM_DS_Rain', -0.474075859)
    formData.append('tSTAT_DS_Rain', 5.14e-35)
    formData.append('PARM_AMB_TEMP', -0.033413268)
    formData.append('tSTAT_AMB_TEMP', 0.529702759)
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            // console.log('wge');
            if (xhr.status == 200) {
                console.log('here?');
                let response = JSON.parse(xhr.response);
                console.log(response);
            };
        }
    }
    xhr.send(formData);
};



L.circleMarker([el.lat_dd_wgs84, el.lon_dd_wgs84], {
    color: 'green',
    fillColor: '#00ff00',
    fillOpacity: 0.5
})
