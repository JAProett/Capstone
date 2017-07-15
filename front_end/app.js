'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');

const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();


app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());

app.use(express.static('public'))


http.createServer(app).listen(app.get('port'), '0.0.0.0', () => {
    console.log('Express server listening on port ' + app.get('port'));
});
