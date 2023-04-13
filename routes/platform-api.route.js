const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const proxy = require('http-proxy');
const app = require('../controllers/apps.controller');

const platformapi = proxy.createProxyServer({
    host: 'http://localhost',
    port: 3322
});

const publicApi = function (req, res, next) {
    //req.headers["clientId"]= "1234xyz";
    let ourl = req.url.replace("internal", "api");
    console.log(ourl);
    req.url = ourl;
    platformapi.web(req, res, {
        target: 'http://localhost:3322'
    }, next);
}

const authApi = function (req, res, next) {
    let key = req.headers["authorization"];
    if (!key) {
        res.status(403).json({ "error": "Auth failed" });
        return;
    }
    let result = app.findByKey(key);
    if (!result) {
        res.status(403).json({ "error": "Auth failed" });
        return;
    }
    result.then((obj) => {
        if (!obj){
            res.status(403).json({ "error": "Auth failed" });
            return;         
        }
        req.headers["clientId"] = obj.clientId;
        req.headers["clientSecret"] = obj.clientSecret;
        let ourl = '/api' + req.url;
        console.log(ourl);
        req.url = ourl;
        platformapi.web(req, res, {
            target: 'http://localhost:3322'
        }, next);
    }).catch((err) => {
        let ret = {};
        ret.msg = err.message;
        res.status(500).json(ret);
    });
}

router.get('/internal*', publicApi);
router.get('/*', authApi);
module.exports = router;