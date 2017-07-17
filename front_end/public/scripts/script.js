const map = L.map('mapid').setView([30.29255837, -97.77570084], 10);

window.onload = () => {
    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }).addTo(map)

    getSitesWithStats()
    document.getElementById('theButton').onclick = function(ev) {
        ev.preventDefault()
        getstats()
    };
    document.getElementById('calc').addEventListener('click', (ev) => {
        ev.preventDefault();
        testcalc()
    })
}



class SiteStats {
    constructor(site_name, m_result, m_err, m_wt_result, m_ph_result, m_dis_result,
        m_tur, m_ds_rain, m_temp, n, e_std, r2, r22, param_intercip, tstat_intercip,
        param_wt, tstat_wt, param_ph, tstat_ph, param_dis, tstat_dis, param_tur, tstat_tur,
        param_ds_rain, tstat_ds_rain, param_amb_temp, tstat_amb_temp, calc_hi_val, site_img) {
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
        this.site_img = site_img;
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
                    document.getElementById('calc_hi_val').value = '';
                    document.getElementById('m_tur_result').style.backgroundColor = 'white';
                    document.getElementById('param_tur').style.backgroundColor = 'white';
                    document.getElementById('tstat_tur').style.backgroundColor = 'white';
                    SiteStats.calc_hi_val = 0;
                    SiteStats.m_err = response.M_Error;
                    SiteStats.m_result = response.M_Result;
                    SiteStats.m_wt_result = response.M_WT_Result;
                    SiteStats.m_ph_result = response.M_PH_Result;
                    SiteStats.m_dis_result = response.M_DIS_Result;
                    SiteStats.m_ds_rain = response.M_DS_Rain;
                    SiteStats.m_temp = response.M_Temp;
                    SiteStats.n = response.N;
                    SiteStats.e_std = response.E_std;
                    SiteStats.r2 = response.R2;
                    SiteStats.r22 = response.R22;
                    SiteStats.param_intercip = response.PARM_INTERCIP;
                    SiteStats.tstat_intercip = response.tSTAT_INTERCIP;
                    SiteStats.param_wt = response.PARM_WT;
                    SiteStats.tstat_wt = response.tSTAT_WT;
                    SiteStats.param_ph = response.PARM_PH;
                    SiteStats.tstat_ph = response.tSTAT_PH;
                    SiteStats.param_dis = response.PARM_DIS;
                    SiteStats.tstat_dis = response.tSTAT_DIS;
                    SiteStats.param_ds_rain = response.PARM_DS_Rain;
                    SiteStats.tstat_ds_rain = response.tSTAT_DS_Rain;
                    SiteStats.param_amb_temp = response.PARM_AMB_TEMP;
                    SiteStats.tstat_amb_temp = response.tSTAT_AMB_TEMP;
                    howHigh('m_result');
                    howHigh('calc_hi_val')
                    if (response.M_TUR_Result === 0) {
                        SiteStats.m_tur_result = response.M_TUR_Result;
                        SiteStats.param_tur = response.PARM_TUR;
                        SiteStats.tstat_tur = response.tSTAT_TUR;
                        document.getElementById('m_tur_result').value = "N/A";
                        document.getElementById('param_tur').value = "N/A";
                        document.getElementById('tstat_tur').value = "N/A";
                        document.getElementById('m_tur_result').readOnly = true;
                        document.getElementById('m_tur_result').style.borderColor = '#d3d3d3';
                        document.getElementById('param_tur').style.borderColor = '#d3d3d3';
                        document.getElementById('tstat_tur').style.borderColor = '#d3d3d3';
                        document.getElementById('m_tur_result').style.backgroundColor = '#d3d3d3';
                        document.getElementById('param_tur').style.backgroundColor = '#d3d3d3';
                        document.getElementById('tstat_tur').style.backgroundColor = '#d3d3d3';
                        document.getElementById('param_tur').readOnly = true;
                        document.getElementById('tstat_tur').readOnly = true;
                    } else {
                        SiteStats.m_tur_result = response.M_TUR_Result;
                        SiteStats.param_tur = response.PARM_TUR;
                        SiteStats.tstat_tur = response.tSTAT_TUR;
                        document.getElementById('m_tur_result').value = SiteStats.m_tur_result;
                        document.getElementById('param_tur').value = response.PARM_TUR;
                        document.getElementById('tstat_tur').value = response.tSTAT_TUR;
                        document.getElementById("m_tur_result").style.borderColor = "#32cd32";
                        document.getElementById('m_tur_result').readOnly = false;
                        document.getElementById('param_tur').readOnly = false;
                        document.getElementById('tstat_tur').readOnly = false;
                    }

                    document.getElementById('m_result').value = SiteStats.m_result;
                    let attributes_wo_tur = ['m_wt_result', 'm_ph_result', 'm_dis_result', 'm_ds_rain', 'm_temp', 'param_intercip', 'tstat_intercip', 'param_wt', 'tstat_wt', 'param_ph', 'tstat_ph', 'param_dis', 'tstat_dis', 'param_ds_rain', 'tstat_ds_rain', 'param_amb_temp', 'tstat_amb_temp'];
                    attributes_wo_tur.forEach((el) => {
                        document.getElementById(el).value = SiteStats[el];

                        if (el.charAt(0) !== 'm') {
                            document.getElementById(el).readOnly = true;
                            document.getElementById(el).style.borderColor = '#d3d3d3';

                        } else {
                            document.getElementById(el).style.borderColor = '#32cd32';

                        }
                    });
                    let tstat = ['tstat_tur', 'tstat_intercip', 'tstat_wt', 'tstat_ph', 'tstat_dis', 'tstat_ds_rain', 'tstat_amb_temp'];
                    let obj = {}
                    tstat.forEach((el) => {
                        if (el === 'tstat_tur' && SiteStats[el] === 0) {
                            obj[el] = 20
                        } else {
                            obj[el] = SiteStats[el]
                        }
                    });
                    let keysSorted = Object.keys(obj).sort((a, b) => {
                        return obj[a] - obj[b]
                    })
                    document.getElementById(keysSorted[0]).style.backgroundColor = 'rgb(255, 0, 0)'
                    document.getElementById(keysSorted[1]).style.backgroundColor = 'rgb(210, 0, 50)'
                    document.getElementById(keysSorted[2]).style.backgroundColor = 'rgb(170, 0, 90)'
                    document.getElementById(keysSorted[3]).style.backgroundColor = 'rgb(130, 0,130)'
                    document.getElementById(keysSorted[4]).style.backgroundColor = 'rgb(90, 0, 170)'
                    document.getElementById(keysSorted[5]).style.backgroundColor = 'rgb(50, 0, 210)'
                    document.getElementById(keysSorted[6]).style.backgroundColor = 'rgb(0, 0, 255)'





                    ///////////////////////////this is going to be changes with image path/////////////////////////
                    let num = Math.floor(Math.random() * 74 + 1)
                    SiteStats.site_img = num
                    ///////////////////////////////////////////////////////////////////////////////////////////////
                    let img_comp = document.getElementById('imgdiv');
                    let img_box = img_comp.childNodes;
                    console.log(img_box[1]);
                    img_box[1].src = '/assets/charts/' + SiteStats.site_img + '.png'
                };
            }
        }
        xhr.send(formData);
    } else {
        console.log('select a site ');
    }
}

function testcalc(SiteStat) {
    let xhr = new XMLHttpRequest();
    let formData = new FormData();
    formData.append('M_WT_Result', document.getElementById('m_wt_result').value);
    formData.append('M_PH_Result', document.getElementById('m_ph_result').value);
    formData.append('M_DIS_Result', document.getElementById('m_dis_result').value);
    if (document.getElementById('m_tur_result').value === 'N/A') {
        formData.append('M_TUR_Result', '0');
        formData.append('PARM_TUR', '0');
        formData.append('tSTAT_TUR', '0');
    } else {
        formData.append('M_TUR_Result', SiteStats.m_tur_result);
        formData.append('PARM_TUR', SiteStats.param_tur);
        formData.append('tSTAT_TUR', SiteStats.tstat_tur);
    }
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
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                let response = JSON.parse(xhr.response);
                console.log(response);
                SiteStats.m_result = response.ecoli;
                SiteStats.calc_hi_val = response.hi_value;
                if (SiteStats.m_result == null) {
                    document.getElementById('m_result').value = 'Out of Scope of the Model';
                    document.getElementById('calc_hi_val').value = 'Out of Scope of the Model';
                    howHigh('m_result')
                    howHigh('calc_hi_val')
                } else {
                    document.getElementById('m_result').value = SiteStats.m_result;
                    document.getElementById('calc_hi_val').value = SiteStats.calc_hi_val;
                    howHigh('m_result');
                    howHigh('calc_hi_val');
                }
            };
        }
    }
    xhr.send(formData);
};


///////////////// helper function to color code the results/////////
function howHigh(ecolival) {
    let checkval = SiteStats[ecolival];
    if (!checkval) {
        console.log('unknown');
        document.getElementById(ecolival).style.backgroundColor = '#d3d3d3';
    }
    else if (checkval > 0 && checkval < 75) {
        console.log('low');
        document.getElementById(ecolival).style.backgroundColor = '#00ee00';
    }
    else if (checkval >= 75 && checkval < 100) {
        console.log('med');
        document.getElementById(ecolival).style.backgroundColor = '#FFCC00';
    }
    else if (checkval >= 100 && checkval < 160) {
        console.log('high');
        document.getElementById(ecolival).style.backgroundColor = '#FF0000';
    }
    else {
        document.getElementById(ecolival).style.backgroundColor = '#d3d3d3';
    }

}
