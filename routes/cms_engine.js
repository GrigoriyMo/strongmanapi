//ß.js
var lib = require('../lib/lib');

var express = require('express');
var router = express.Router();

var possible_query_params = ['file', 'file_level'];


/**
 * 
 * @param {Object} query_params входящие параметры query
 * @param {Array} possible_query_params массив с разрешенными query параметрами
 */
function check_query_params(query_params, possible_query_params) {
   
    for (var i = 0; i < possible_query_params.length; i++) {

        if(query_params[possible_query_params[i]]){
            break;
        }else{
            throw new Error('HTTP requet error: Detected not possible_query_params');
        }
    }
}

router.post('/:mode', function (req, res, next) {
    check_query_params(req.query, possible_query_params);
    var content_type = 'application/json';
    var data = {};
    switch (req.params.mode) {
        case "download":
            data = lib.download(req.query.file);
            break; 

        case "update":

            data = lib.write_file(req.query.file, req.query.file_level, req.body);
            break;

        default:
            res.status(405);
            content_type = "text/plain";
            data = '';
    }
    res.setHeader('Content-Type', content_type);
    res.send(data);
});

module.exports = router;
