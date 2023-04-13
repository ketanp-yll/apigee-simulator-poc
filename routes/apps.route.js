const express = require('express');
const router = express.Router();
const app = require('../controllers/apps.controller');
const bodyParser = require('body-parser');

router.post('/', bodyParser.json(), app.insert);
router.get('/connections', function(req, resp){
    resp.send('get method called');
});

module.exports = router;