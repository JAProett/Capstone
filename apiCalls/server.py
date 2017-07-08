from flask import Flask
from flask import Flask, render_template, request, redirect, Response, jsonify
import script as API
import random, json
import requests
import datetime
from dateutil import parser

app = Flask(__name__)

# @app.route("/")
# def main():
#     return render_template('index.html')

@app.route('/displayParams', methods=['POST'])
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
        return jsonify(payload)
    else:
        response.status()
        print(error)

app.run(host='0.0.0.0', port=8000)
