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

    var result = { sportsman: {} };

    for (var i = 0; i < part_titles.length; i++) {
        result.sportsman[part_titles[i]] = { id: i + 1, cityTitle: part_titles[i], atlets: [] }
    }

    //наполняем шаблон данными
    for (var i = 0; i < data.length; i++) {
        if (data[i].cityTitle === 'Москва') {
            result.sportsman['Москва'].atlets.push(data[i])
        }
        if (data[i].cityTitle === 'Приволжье') {
            result.sportsman['Приволжье'].atlets.push(data[i])
        }
        if (data[i].cityTitle === 'Северо - запад') {
            result.sportsman['Северо - запад'].atlets.push(data[i])
        }
        if (data[i].cityTitle === 'Сибирь') {
            result.sportsman['Сибирь'].atlets.push(data[i])
        }
        if (data[i].cityTitle === 'Урал') {
            result.sportsman['Урал'].atlets.push(data[i])
        }
        if (data[i].cityTitle === 'Центр') {
            result.sportsman['Центр'].atlets.push(data[i])
        }
        if (data[i].cityTitle === 'Юг') {
            result.sportsman['Юг'].atlets.push(data[i])
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

    console.log(JSON.stringify(downloaded));
}