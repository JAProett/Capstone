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

@app.route('/displayparams', methods=['GET', 'POST'])
def getContaminants():

    req = request.form['examplekey']

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
        params = {'parameter': test_par, 'unit': test_unit}
        payload = API.Contaminate().query_site(API._url, params).return_data()
        print(payload)
        dummyDict = {"key": payload}
        # return jsonify(payload[0])
        return jsonify(dummyDict)

    else:
        response.status()
        print('error')


app.run(host='0.0.0.0', port=8000)
