//download.js
var lib = require('../lib/lib');

var express = require('express');
var router = express.Router();

var possible_query_params = ['file', 'file_level'];

router.get('/', function (req, res, next) {
    lib.check_query_params(req.query, possible_query_params);
    var content_type = 'application/json';
    var data = lib.download(req.query.file);
    res.setHeader('Content-Type', content_type);
    res.send(data);
});

module.exports = router;
