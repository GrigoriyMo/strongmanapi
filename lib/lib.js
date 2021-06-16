var MySql = require('sync-mysql');

var sqlProcedures = require('./sql');

var fs = require('fs');

var options = JSON.parse(fs.readFileSync(__dirname+'/dbconfig/conf', 'utf-8'));



var connection = new MySql({
    host: options.host,
    user: options.user,
    password: options.password,
    database: options.database,
    charset: options.charset || "utf8mb4"
});

function compareNumbers(a, b) {
    return b.id - a.id; 
}

function reverseSort(array){
    array.sort(compareNumbers);
}

exports.download = function (filename) {
    var sql;
    var additional_sort = false;
    switch (filename) {
        case 'partners':
            sql = sqlProcedures.select().partners;
            break;
        case 'announcement':
            sql = sqlProcedures.select().announcement;
            break;
        case 'judges':
            sql = sqlProcedures.select().judges;
            break;
        case 'direction':
            sql = sqlProcedures.select().direction;
            break;
        case 'protocols':
            sql = sqlProcedures.select().protocols;
            break;
        case 'sportsman':
            sql = sqlProcedures.select().sportsman;
            break;
        case 'mediaboutus':
            sql = sqlProcedures.select().mediaboutus;
            break;
        case 'docs':
            sql = sqlProcedures.select().docs;
            break;
        case 'docslist':
            sql = sqlProcedures.select().docslist;
            break;
        case 'docslist':
            sql = sqlProcedures.select().docslist;
            break;
        case 'protocols':
            sql = sqlProcedures.select().protocols;
            break;
        case 'rating':
            sql = sqlProcedures.select().rating;
            break;
        case 'ratingves':
            sql = sqlProcedures.select().ratingves;
            break;
        case 'equip':
            sql = sqlProcedures.select().equip;
            break;
        case 'equipment':
            sql = sqlProcedures.select().equipment;
            break;
        case 'photo':
            sql = sqlProcedures.select().photo;
            break;
        case 'video':
            sql = sqlProcedures.select().video;
            break;
        case 'news':
            sql = sqlProcedures.select().news;
            additional_sort = true;
            break;
        
            default:
                throw new Error("Requested content does not supported");
    }
    var result = connection.query(sql);

    if (additional_sort) {
        reverseSort(result)
    }
    var downloaded = new Object();

    downloaded[filename] = result;

    console.log(downloaded);
}