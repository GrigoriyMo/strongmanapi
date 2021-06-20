var MySql = require('sync-mysql');

var sqlProcedures = require('./sql');

var fs = require('fs');

var options = JSON.parse(fs.readFileSync(__dirname + '/dbconfig/conf', 'utf-8'));

function collectEquipRent(data) {

    var part_titles = [
        'common',
        'commontwo',
        'atlasStone',
        'bigGantel',
        'inchGantel'
    ];

    var result = { equip_rent: {} };

    //создаем шаблон :
    /* 
        {
            equip_rent: {
              common: { name: 'common', content: [] },
              commontwo: { name: 'commontwo', content: [] },
              atlasStone: { name: 'atlasStone', content: [] },
              bigGantel: { name: 'bigGantel', content: [] },
              inchGantel: { name: 'inchGantel', content: [] }
            }
          } 
    */
    for (var i = 0; i < part_titles.length; i++) {
        result.equip_rent[part_titles[i]] = { name: part_titles[i], content: [] }
    }

    //наполняем шаблон данными
    for (var i = 0; i < data.length; i++) {
        if (data[i].frontend_type === 'common') {
            result.equip_rent.common.content.push(data[i])
        }

        if (data[i].frontend_type === 'commontwo') {
            result.equip_rent.commontwo.content.push(data[i])
        }

        if (data[i].frontend_type === 'atlasStone') {
            result.equip_rent.atlasStone.content.push(data[i])
        }

        if (data[i].frontend_type === 'bigGantel') {
            result.equip_rent.bigGantel.content.push(data[i])
        }

        if (data[i].frontend_type === 'inchGantel') {
            result.equip_rent.inchGantel.content.push(data[i])
        }
    }

    return result;
}

function collectSportsman(data) {
    var part_titles = [
        'Москва',
        'Приволжье',
        'Северо - запад',
        'Сибирь',
        'Урал',
        'Центр',
        'Юг'
    ];

    var result = { sportsman: [] };


    /**
     * формируем шаблон для фронтенда
     * {
    sportsman: [
        { id: 1, cityTitle: 'Москва', atlets: [] },
        { id: 2, cityTitle: 'Приволжье', atlets: [] },
        { id: 3, cityTitle: 'Северо - запад', atlets: [] },
        { id: 4, cityTitle: 'Сибирь', atlets: [] },
        { id: 5, cityTitle: 'Урал', atlets: [] },
        { id: 6, cityTitle: 'Центр', atlets: [] },
        { id: 7, cityTitle: 'Юг', atlets: [] }
    ]
     */
    for (var i = 0; i < part_titles.length; i++) {
        result.sportsman.push({ id: i + 1, cityTitle: part_titles[i], atlets: [] })
    }

    //наполняем шаблон данными
    for (i = 0; i < data.length; i++) {
        for (z = 0; z < result.sportsman.length; z++) {
            if (data[i].cityTitle === result.sportsman[z].cityTitle) {
                result.sportsman[z].atlets.push(data[i]);
            }
        }
    }

    return result;
}

function collectRatingVes(data) {
    var part_titles = [
        'm110',
        'm95',
        'm80'
    ];

    var result = { rating: {} };

    //создаем шаблон
    //смотри пример в функции collectRatingVes
    for (var i = 0; i < part_titles.length; i++) {
        result.rating[part_titles[i]] = [];
    }

    //наполняем шаблон данными
    for (var i = 0; i < data.length; i++) {
        if (data[i].type === 'm110') {
            result.rating.m110.push(data[i])
        }

        if (data[i].type === 'm95') {
            result.rating.m95.push(data[i])
        }

        if (data[i].type === 'm80') {
            result.rating.m80.push(data[i])
        }
    }
    return result;
}

function collectEquip(data) {
    var result = data;

    for(var i = 0; i < data.length; i++){
        result[i].dimensions = result[i].dimensions.split(','); 
    }

    return result;
}

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

function reverseSort(array) {
    array.sort(compareNumbers);
}

exports.download = function (filename) {
    var sql;
    var reverse_sort_enabled = false;
    var specific_group;

    switch (filename) {
        case 'partners':
            sql = sqlProcedures.select().partners;
            break;
        case 'announcements':
            sql = sqlProcedures.select().announcements;
            reverse_sort_enabled = true;
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
            specific_group = collectSportsman;
            break;
        case 'mediaaboutus':
            sql = sqlProcedures.select().mediaaboutus;
            break;
        case 'docs':
            sql = sqlProcedures.select().docs;
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
            specific_group = collectRatingVes;
            break;
        case 'equip':
            sql = sqlProcedures.select().equip;
            specific_group = collectEquip;
            break;
        case 'equipment':
            sql = sqlProcedures.select().equipment;
            specific_group = collectEquipRent;
            break;
        case 'photo':
            sql = sqlProcedures.select().photo;
            break;
        case 'video':
            sql = sqlProcedures.select().video;
            break;
        case 'news':
            sql = sqlProcedures.select().news;
            reverse_sort_enabled = true;
            break;

        default:
            throw new Error("Requested content does not supported. Send correct query.");
    }
    var result = connection.query(sql);

    //если нужна обратная сортировка
    if (reverse_sort_enabled) {
        reverseSort(result);
    }

    var downloaded = new Object();

    downloaded[filename] = result;


    //применить специфичную группировку 

    if (specific_group) {
        downloaded = specific_group(downloaded[filename]);
    }

    return (JSON.stringify(downloaded));
}

exports.insert = function (filename, data) {

    var sql;

    switch (filename) {
        case 'partners':
            sql = sqlProcedures.insert().partners(data);
            break;
        case 'announcements':
            sql = sqlProcedures.insert().announcements(data);
            break;
        case 'judges':
            sql = sqlProcedures.insert().judges(data);
            break;
        case 'direction':
            sql = sqlProcedures.insert().direction(data);
            break;
        case 'protocols':
            sql = sqlProcedures.insert().protocols(data);
            break;
        case 'sportsman':
            sql = sqlProcedures.insert().sportsman(data);
            break;
        case 'mediaaboutus':
            sql = sqlProcedures.insert().mediaaboutus(data);
            break;
        case 'docs':
            sql = sqlProcedures.insert().docs(data);
            break;
        case 'docslist':
            sql = sqlProcedures.insert().docslist(data);
            break;
        case 'protocols':
            sql = sqlProcedures.insert().protocols(data);
            break;
        case 'rating':
            sql = sqlProcedures.insert().rating(data);
            break;
        case 'ratingves':
            sql = sqlProcedures.insert().ratingves(data);
            break;
        case 'equip':
            sql = sqlProcedures.insert().equip(data);
            break;
        case 'equipment':
            sql = sqlProcedures.insert().equipment(data);
            break;
        case 'photo':
            sql = sqlProcedures.insert().photo(data);
            break;
        case 'video':
            sql = sqlProcedures.insert().video(data);
            break;
        case 'news':
            sql = sqlProcedures.insert().news(data);
            break;
        default:
            throw new Error("Requested content does not supported. Send correct query.");
    }

    console.log(sql);

    var result = connection.query(sql);

    console.log(result);

    if (result.insertId) {
        var response = {
            message: "Data have been successfully inserted.",
            lastid: result.insertId
        };
        return JSON.stringify(response);
    } else {
        throw new Error("DB layer error. Please, contact administrator.")
    }
}

/**
 * 
 * @param {Object} query_params входящие параметры query
 * @param {Array} possible_query_params массив с разрешенными query параметрами
 */
exports.check_query_params = function (query_params, possible_query_params) {

    for (var i = 0; i < possible_query_params.length; i++) {

        if (query_params[possible_query_params[i]]) {
            break;
        } else {
            throw new Error('HTTP requet error: Detected not possible_query_params');
        }
    }
}