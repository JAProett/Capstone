from flask import Flask, render_template, request, redirect, Response, jsonify
import apicall as API
import random, json
import requests
import datetime
from dateutil import parser
import os
from flask_cors import CORS, cross_origin
import psutil
import calc as stats
import dbconfig as db


app = Flask(__name__)
CORS(app)

testRes =    {'key': [{
            'depth_in_meters': '0.2',
            'filter': 'Total',
            'lat_dd_wgs84': '30.3018400754222',
            'location': {
                'type': 'Point',
                'coordinates': [-97.600312, 30.30184]
            },
            'lon_dd_wgs84': '-97.6003116725693',
            'medium': 'Surface Water',
            'method': 'SM 9223 B',
            'param_type': 'Bacteria/Pathogens',
            'parameter': 'E COLI BACTERIA',
            'project': 'Austin Lakes Index (ALI)',
            'ref_no': '2566556',
            'result': '1',
            'sample_date': '2017-04-20T12:30:00.000',
            'sample_id': '4345-WLL @ MIDEAST LWL4 SURF',
            'sample_ref_no': '516671',
            'sample_site_no': '4345',
            'site_name': 'Lake Long mid-lake of Eastern Arm (LWL4)',
            'site_type': 'Lake',
            'time_null': 'false',
            'unit': 'MPN/100ML',
            'watershed': 'Walter E. Long Lake'
        }, {
            'depth_in_meters': '0.2',
            'filter': 'Total',
            'lat_dd_wgs84': '30.2921531272374',
            'location': {
                'type': 'Point',
                'coordinates': [-97.609229, 30.292153]
            },
            'lon_dd_wgs84': '-97.6092289657427',
            'medium': 'Surface Water',
            'method': 'SM 9223 B',
            'param_type': 'Bacteria/Pathogens',
            'parameter': 'E COLI BACTERIA',
            'project': 'Austin Lakes Index (ALI)',
            'ref_no': '2566577',
            'result': '12.1',
            'sample_date': '2017-04-20T13:20:00.000',
            'sample_id': '4346-WLL @ MIDWEST LWL5 SUR',
            'sample_ref_no': '515060',
            'sample_site_no': '4346',
            'site_name': 'Lake Long mid-lake of Western Arm (LWL5)',
            'site_type': 'Lake',
            'time_null': 'false',
            'unit': 'MPN/100ML',
            'watershed': 'Barton Creek'
        }]
    }

# send in days ago and watershed name returns info from the api call
@app.route('/displayparams', methods=['GET', 'POST'])
def getContaminants():
    # reqdays = request.form['daysago']
    reqdays = '360'
    reqwatershed = request.form['watershed']
# //////////////////////tester///////////////////////////
    # return jsonify(testRes)
# ///////////////////////////////////////////////////////
    if reqwatershed:
        params = {'parameter': 'E COLI BACTERIA', 'unit': 'MPN/100ML', 'watershed': reqwatershed}
        payload = API.Contaminate().query_site(API._url, params).return_data(reqdays)
        dummyDict = {"key": payload}
        print(dummyDict)
        return jsonify(dummyDict)
    else:
        response.status()
        print('error')

# when stats page is open: sends the locations and names with stats on them
@app.route('/statistics', methods=['GET'])
def analyize():
    raw = db.get_all_loc()
    print(raw)
    return jsonify(raw)

# Send site name gets mean stats////////////////////////////////////////////
@app.route('/statistics/sitesample', methods=['POST'])
def get_defalut():
    selected_site = request.form['SITE_NAME']
    site_standards = db.retreave_standard(selected_site)
    # print(site_standards)
    return jsonify(site_standards)

# Send info in from table with pacage from sitesampel route returns predicted
@app.route('/statistics/estimate', methods=['POST'])
def makePrediction():
    inter = request.form['PARM_INTERCIP']
    water_temp =request.form['PARM_WT']
    watertemp_mean = request.form['M_WT_Result']
    ph = request.form['PARM_PH']
    ph_mean =request.form['M_PH_Result']
    dis = request.form['PARM_DIS']
    dis_mean = request.form['M_DIS_Result']
    tur = request.form['PARM_TUR']
    tur_mean = request.form['M_TUR_Result']
    amb_temp = request.form['PARM_AMB_TEMP']
    ambtemp_mean = request.form['M_Temp']
    ds_rain = request.form['PARM_DS_Rain']
    dsrain_mean = request.form['M_DS_Rain']
    std = request.form['E_std']
    ecloli_est = stats.e_coli_prediction(inter, water_temp, watertemp_mean, ph, ph_mean, dis, dis_mean, tur, tur_mean, amb_temp, ambtemp_mean, ds_rain, dsrain_mean)
    hi_val = stats.hi_value(std, ecloli_est)
    predict_info = {'ecoli': ecloli_est, 'hi_value': hi_val}
    return jsonify(predict_info)

app.run(host='0.0.0.0', port=8000)
