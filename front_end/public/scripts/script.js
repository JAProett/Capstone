const map = L.map('mapid').setView([30.25, -97.75], 10);

window.onload = () => {
    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }).addTo(map)
    getSitesWithStats()
    document.getElementById('theButton').onclick = function(ev) {
        ev.preventDefault()
        getstats()
        // test()
    };
    document.getElementById('calc').addEventListener('click', (ev) => {
        ev.preventDefault();
        // console.log('didnt rerfrehS');
        testcalc()
    })
}

class SiteStats {
    constructor(site_name, m_result, m_err, m_wt_result, m_ph_result, m_dis_result,
        m_tur, m_ds_rain, m_temp, n, e_std, r2, r22, param_intercip, tstat_intercip,
        param_wt, tstat_wt, param_ph, tstat_ph, param_dis, tstat_dis, param_tur, tstat_tur,
        param_ds_rain, tstat_ds_rain, param_amb_temp, tstat_amb_temp, calc_hi_val) {
        this.site_name = site_name;
        this.m_result = m_result;
        this.m_err = m_err;
        this.m_wt_result = m_wt_result;
        this.m_ph_result = m_ph_result;
        this.m_dis_result = m_dis_result;
        this.m_tur_result = m_tur_result;
        this.m_ds_rain = m_ds_rain;
        this.m_temp = m_temp;
        this.n = n;
        this.e_std = e_std;
        this.r2 = r2;
        this.r22 = r22;
        this.param_intercip = param_intercip;
        this.tstat_intercip = tstat_intercip;
        this.param_wt = param_wt;
        this.tstat_wt = tstat_wt;
        this.param_ph = param_ph;
        this.tstat_ph = tstat_ph;
        this.param_dis = param_dis;
        this.tstat_dis = tstat_dis;
        this.param_tur = param_tur;
        this.tstat_tur = tstat_tur;
        this.param_ds_rain = param_ds_rain;
        this.tstat_ds_rain = tstat_ds_rain;
        this.param_amb_temp = param_amb_temp;
        this.tstat_amb_temp = tstat_amb_temp;
        this.calc_hi_val = calc_hi_val;
    }
}

function getSitesWithStats() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:8000/statistics');
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                let response = JSON.parse(xhr.response);
                response.forEach(function(el) {
                    let marker = L.circleMarker([el.LAT_DD_WGS84, el.LON_DD_WGS84], {
                        color: 'green',
                        fillColor: '#00ff00',
                        fillOpacity: 0.5
                    }).addTo(map).bindPopup(el.SITE_NAME)

                    marker.addEventListener("click", (ev) => {

                        SiteStats.site_name = el.SITE_NAME
                        console.log(SiteStats.site_name);
                    })
                })
            }
        }
    }
    xhr.send();
};


function getstats() {
    let formData = new FormData();
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:8000/statistics/sitesample');
    if (typeof SiteStats.site_name === 'string') {
        formData.append('SITE_NAME', SiteStats.site_name);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    let response = JSON.parse(xhr.response);
                    console.log(response);
                    SiteStats.m_err = response.M_Error;
                    SiteStats.m_wt_result = response.M_WT_Result;
                    SiteStats.m_ph_result = response.M_PH_Result;
                    SiteStats.m_dis_result = response.M_DIS_Result;
                    SiteStats.m_tur_result = response.M_TUR_Result;
                    SiteStats.m_ds_rain = response.M_DS_Rain;
                    SiteStats.m_temp = response.M_Temp;
                    SiteStats.n = response.N;
                    SiteStats.e_std = response.E_std;
                    SiteStats.r2 = response.R2;
                    SiteStats.r22 = response.R22;
                    SiteStats.param_intercip = response.PARM_INTERCIP;
                    SiteStats.tstat_intercip = response.tSTAT_INTERCIP;
                    console.log(SiteStats.param_intercip);
                    SiteStats.param_wt = response.PARM_WT;
                    SiteStats.tstat_wt = response.tSTAT_WT;
                    SiteStats.param_ph = response.PARM_PH;
                    SiteStats.tstat_ph = response.tSTAT_PH;
                    SiteStats.param_dis = response.PARM_DIS;
                    SiteStats.tstat_dis = response.tSTAT_DIS;
                    SiteStats.param_tur = response.PARM_TUR;
                    SiteStats.tstat_tur = response.tSTAT_TUR;
                    SiteStats.param_ds_rain = response.PARM_DS_Rain;
                    SiteStats.tstat_ds_rain = response.tSTAT_DS_Rain;
                    SiteStats.param_amb_temp = response.PARM_AMB_TEMP;
                    SiteStats.tstat_amb_temp = response.tSTAT_AMB_TEMP;
                    let attributes = ['m_wt_result', 'm_ph_result', 'm_dis_result', 'm_tur_result', 'm_ds_rain', 'm_temp', 'param_intercip', 'tstat_intercip', 'param_wt', 'tstat_wt', 'param_ph', 'tstat_ph', 'param_dis', 'tstat_dis', 'param_tur', 'tstat_tur', 'param_ds_rain', 'tstat_ds_rain', 'param_amb_temp', 'tstat_amb_temp'];
                    attributes.forEach(function(el) {
                        document.getElementById(el).value = SiteStats[el];
                        
                    });

                };
            }
        }
        xhr.send(formData);
    } else {
        /////////////////////// PLACEHOLDER!!!!!!!!!!!!///////////////////////////////
        console.log('select a site ');
    }
}

function testcalc(SiteStat) {
    let xhr = new XMLHttpRequest();
    let formData = new FormData();
    formData.append('M_WT_Result', document.getElementById('m_wt_result').value);
    formData.append('M_PH_Result', document.getElementById('m_ph_result').value);
    formData.append('M_DIS_Result', document.getElementById('m_dis_result').value);
    formData.append('M_TUR_Result', document.getElementById('m_tur_result').value);
    formData.append('M_DS_Rain', document.getElementById('m_ds_rain').value);
    formData.append('M_Temp', document.getElementById('m_temp').value);
    formData.append('E_std', SiteStats.e_std);
    formData.append('PARM_INTERCIP', SiteStats.param_intercip);
    formData.append('PARM_WT', SiteStats.param_wt);
    formData.append('PARM_PH', SiteStats.param_ph);
    formData.append('PARM_DIS', SiteStats.param_dis);
    formData.append('PARM_TUR', SiteStats.param_dis);
    formData.append('PARM_DS_Rain', SiteStats.param_ds_rain);
    formData.append('PARM_AMB_TEMP', SiteStats.param_amb_temp);
    xhr.open('POST', 'http://127.0.0.1:8000/statistics/estimate');
    // will be equl to table values

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            // console.log('wge');
            if (xhr.status == 200) {
                let response = JSON.parse(xhr.response);
                console.log(response);
                SiteStats.m_result = response.ecoli;
                SiteStats.calc_hi_val = response.hi_val;

            };
        }
    }
    xhr.send(formData);
};
