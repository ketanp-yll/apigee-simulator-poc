
const express = require('express');
const app = express();
const apigeeapps = require('./routes/apps.route');
const platformApi = require('./routes/platform-api.route');
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/apigee").catch(err => console.log(err.reason)); 

app.use('/apps', apigeeapps);
app.use('/', platformApi);
app.listen(3344);
console.log("stubbed-apigee started on port ", 3344);