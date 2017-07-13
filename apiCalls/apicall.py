import json
import requests
import datetime
from dateutil import parser
import dbconfig

_url = 'https://data.austintexas.gov/resource/v7et-4fvp.json?$limit=50000'


headers={"X-App-Token":"YZ8DEL6qcIIFd0Jk3OWuRXbwd"}
results = []
class Contaminate:
    def __init__(self):
        self.results = []

    def query_site(self, url, params):
        response = requests.get(url, params)
        if response.status_code == requests.codes.ok:
            self.raw = response.json()
            return self
            print(error)
        else:
          response.status()


    def return_data(self, daysago):
        for i in self.raw:
            test = parser.parse(i['sample_date'])
            # print(test.date() - datetime.date.today())
            if datetime.date.today() - test.date() < datetime.timedelta(days = float(daysago)):
                self.results.append(i)
        return self.results
print('a')
