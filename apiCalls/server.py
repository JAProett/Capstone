from flask import Flask, render_template, request, redirect, Response, jsonify
import script as API
import random, json
import requests
import datetime
from dateutil import parser
import os
from flask_cors import CORS, cross_origin
import psutil

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
            'watershed': 'Walter E. Long Lake'
        }]
    }



@app.route('/displayparams', methods=['GET', 'POST'])
def getContaminants():

    req = request.form['examplekey']
    reqdays = request.form['daysago']
    # return jsonify(testRes)
    if req:

        test_par = req
        if test_par=='E COLI BACTERIA':
            test_unit = 'MPN/100ML'
        if test_par== 'DISSOLVED OXYGEN':
            test_unit = 'MG/L'
        if test_par== 'PH':
            test_unit = 'Standard units'
        if test_par== 'TURBIDITY':
            test_unit = 'NTRU'
        if test_par== 'WATER TEMPERATURE':
            test_unit = 'Deg. Celsius'
        params = {'parameter': test_par, 'unit': test_unit, 'watershed': 'Barton Creek'}
        payload = API.Contaminate().query_site(API._url, params).return_data(reqdays)
        # print(payload)
        dummyDict = {"key": payload}
        print(dummyDict)
        return jsonify(dummyDict)

    else:
        response.status()
        print('error')


app.run(host='0.0.0.0', port=8000)
