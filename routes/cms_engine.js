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

router.get('/', function (req, res, next) {
    check_query_params(req.query, possible_query_params);
    var content_type = 'application/json';
    var data = ib.download(req.query.file);
    res.setHeader('Content-Type', content_type);
    res.send(data);
});

module.exports = router;
