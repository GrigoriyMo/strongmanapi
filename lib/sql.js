exports.select = function () {
    return {
        sportsman: "select * from sportsman;",
        judges: "select * from judges;",
        direction: "select * from direction",
        partners: "select * from partners",
        protocols: "select * from protocols",
        mediaaboutus: "select * from mediaaboutus",
        news: "select * from news",
        announcements: "select * from announcements",
        docs: "select * from docs",
        docslist: "select * from docslist",
        photo: "select * from multimedia where type='photo'",
        video: "select * from multimedia where type='video'",
        rating: "select * from rating",
        ratingves: "select * from ratingves",
        equip: "select * from equip",
        equipment: "select * from equip_rent"
    }
}

exports.insert = function () {
    return {
        sportsman: function (data) {
            var sql = `INSERT INTO sportsman ( 
                cityTitle, 
                city, 
                name,
                pic) 
            VALUES (
               "${data.cityTitle}",
                "${data.city}",
                "${data.name}",
                "${data.pic}"
            );`;
            return sql;
        },
        judges: function (data) {
            var sql = `INSERT INTO judges (name, level, pic) 
            VALUES 
                (
                "${data.name}",
                "${data.level}",
                "${data.pic}"
                );`;
            return sql;
        },
        direction: function (data) {
            var sql = `INSERT INTO direction (job, name, alt, vk, facebook, instagram, 
                photo) 
        VALUES 
        ("${data.job}",
         "${data.name}",
         "${data.alt}",
         "${data.vk}",
         "${data.facebook}", 
         "${data.instagram}", 
         "${data.photo}");`;

            return sql;
        },
        partners: function (data) {
            var sql = `INSERT INTO partners (pic, url, alt, width, height) 
            VALUES 
                (
                "${data.pic}",
                "${data.url}",
                "${data.alt}",
                "${data.width}",
                "${data.height}"
                );`;
            return sql;
        },
        protocols: function (data) {

            var resultssplitted = "";
            for(var i = 0; i <data.results.length; i++){
                resultssplitted = resultssplitted + data.results[i].link +",";
            }
            var sql = `INSERT INTO protocols ( img, alt, text,  result_link) 
            VALUES (
             "${data.img}",
             "${data.alt}",
             "${data.text}",
             "${resultssplitted}"
             );`;
            return sql;
        },
        mediaaboutus: function (data) {
            var sql = `INSERT INTO mediaaboutus 
            (imgsrc, imgalt, medianame, title, text, date, url ) 
            VALUES 
            (
             "${data.imgsrc}",
             "${data.imgalt}",
             "${data.medianame}",
             "${data.title}",
             "${data.text}",
             "${data.date}",
             "${data.url}"
             );`;
            return sql;
        },
        news: function (data) {
            var sql = `INSERT INTO news (imgsrc, imgalt, title, html, date, url ) 
            VALUES 
            (
             "${data.imgsrc}",
             "${data.imgalt}",
             "${data.title}",
             "${data.text}",
             "${data.date}",
             "${data.url}"
             );`;
            return sql;
        },
        announcements: function (data) {
            var sql = `INSERT INTO announcements (pic, alt, url, annotationContent, annotationTitle) VALUES 
            ("${data.pic}", 
            "${data.alt}", 
            "${data.url}", 
            "${data.annotationContent}", 
            "${data.annotationTitle}");`;
            return sql;
        },
        docs: function (data) {
            var sql = `INSERT INTO docs (title, src) 
            VALUES 
            (
             "${data.title}",
             "${data.src}"
             );`;
            return sql;
        },
        docslist: function (data) {
            var sql = `INSERT INTO docslist (title, url) 
            VALUES 
            (
             "${data.title}",
             "${data.url}"
             );`;

            return sql;
        },
        photo: function (data) {
            var sql = `INSERT INTO multimedia ( url, pic, title, alt, type) 
            VALUES 
            (
             "${data.url}",
             "${data.pic}",
             "${data.title}",
             "${data.alt}",
             "photo"
             );`;

            return sql;
        },
        video: function (data) {
            var sql = `INSERT INTO multimedia ( url, pic, title,  type) 
            VALUES 
            (
             "${data.url}",
             "${data.pic}",
             "${data.title}",
             "video"
             );`;

            return sql;
        },
        rating: function (data) {
            var sql = `INSERT INTO rating ( 
                place, 
                fio, 
                tournament1result,
                tournament2result,
                tournament3result,
                tournament4result,
                tournament5result,
                tournament6result,
                tournament7result,
                tournament8result,
                tournament9result,
                result) 
            VALUES (
             "${data.place}",
             "${data.fio}",
             "${data.tournament1result}",
             "${data.tournament2result}",
             "${data.tournament3result}",
             "${data.tournament4result}",
             "${data.tournament5result}",
             "${data.tournament6result}",
             "${data.tournament7result}",
             "${data.tournament8result}",
             "${data.tournament9result}",
             "${data.result}"
             );`;
            return sql;
        },
        ratingves: function (data) {
            var sql = `INSERT INTO ratingves ( 
                place, 
                fio, 
                year2017,
                year2018,
                year2019,
                year2020,
                year2021,
                sum,
                type) 
            VALUES (
             "${data.place}",
             "${data.fio}",
             "${data.year2017}",
             "${data.year2018}",
             "${data.year2019}",
             "${data.year2020}",
             "${data.year2021}",
             "${data.sum}",
             "${data.type}");`;
            return sql;
        },
        equip: function (data) {
            var sql = `INSERT INTO equip (excercise, dimensions) 
            VALUES 
            (
             "${data.excercise}",
             "${data.dimensions}"
             );`;
            return sql;
        },
        equipment: function (data) {
            var sql = `INSERT INTO equip_rent (type, name, sell, rent) 
            VALUES 
            (
                "${data.type}",
             "${data.name}",
             "${data.sell}",
             "${data.rent}"
             );`;
            return sql;
        }
    }
}