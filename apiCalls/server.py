from flask import Flask, render_template, request, redirect, Response, jsonify
import apicall as API
import random, json
import requests
import datetime
from dateutil import parser
import os
from flask_cors import CORS, cross_origin
import psutil
# import calc as Stats
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

@app.route('/displayparams', methods=['GET', 'POST'])
def getContaminants():
    req = request.form['examplekey']
    reqdays = request.form['daysago']
    reqwatershed = request.form['watershed']
# //////////////////////tester///////////////////////////
    return jsonify(testRes)
# ///////////////////////////////////////////////////////
    if req:
        test_par = req
        if test_par=='E COLI BACTERIA':
            test_unit = 'MPN/100ML'
        params = {'parameter': test_par, 'unit': test_unit, 'watershed': reqwatershed}
        payload = API.Contaminate().query_site(API._url, params).return_data(reqdays)
        # print(payload)
        dummyDict = {"key": payload}
        print(dummyDict)
        return jsonify(dummyDict)
    else:
        response.status()
        print('error')

@app.route('/statistics', methods=['GET'])
def analyize():
    raw = db.get_all_loc()
    print(raw)
    return jsonify(raw)

@app.route('/statistics/sitenameplaceholder', method=['POST'])
def get_defalut():
    selected_stite = request.form['SITE_NAME']

# @app.route('/statistics/sitenameplaceholder', method=['POST'])
# def makePrediction():
    # inter = request.form['Intercept']
    # water_temp =request.form['Water Temp']
    # watertemp_mean = request.form['Water Temp Mean']
    # ph = request.form['PH']
    # ph_mean =request.form['PH Mean']
    # dis = request.form['Dissolved O2']
    # dis_mean = request.form['Dissolved O2 Mean']
    # tur = request.form['Turbitity']
    # tur_mean = request.form['Turbitity Mean']
    # amb_temp = request.form['Ambiant Temp']
    # ambtemp_mean = request.form['Ambiant Temp Mean']
    # ds_rain = request.form['Days Since Rain']
    # dsrain_mean = request.form['Days Since Rain Mean']
    #
    # ecloli_est = Stats.e_coli_prediction(inter, water_temp,
    # watertemp_mean, ph, ph_mean, dis, dis_mean, tur, tur_mean,
    # amb_temp, ambtemp_mean, ds_rain, dsrain_mean)

app.run(host='0.0.0.0', port=8000)
