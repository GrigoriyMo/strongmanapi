var fs = require('fs');
var path = require('path');
var MediaElement = require('../class/mediaaboutus').MediaAboutUsElement;
var AnnouncementElement = require('../class/announcement').AnnouncementElement;
var DocsElement = require('../class/docs').DocsElement;
var EquipElement = require('../class/equip').EquipElement;
var JudgesElement = require('../class/judges').JudgesElement;
var NewsElement = require('../class/news').NewsElement;
var PhotoVideoElement = require('../class/photovideo').PhotoVideoElement;
var ProtocolsElement = require('../class/protocols').ProtocolsElement;
var RatingvesElement = require('../class/ratingves').RatingvesElement;
var SportsmanElement = require('../class/sportsman').SportsmanElement;
var DirectionElement = require('../class/direction').DirectionElement;
var DocslistElement = require('../class/docslist').DocslistElement;
var EquipmentElement = require('../class/equipment').EquipmentElement;
var PartnersElement = require('../class/partners').PartnersElement;
var RatingElement = require('../class/rating').RatingElement;

function compareNumbers(a, b) {
    return a.id - b.id;
}

function parse_data(data) {


    return data;
}

var table_of_contents = {
    //переписать на создание через класс
    list: [
        {
            title: "mediaaboutus",
            file_path: path.join(__dirname, "/..", "public", "jsond/mediaaboutus.json"),
            array_name: "news",
            elem_class: MediaElement
        },
        {
            title: "announcement",
            file_path: path.join(__dirname, "/..", "public", "jsond/announcement.json"),
            array_name: "announcements",
            elem_class: AnnouncementElement,
            sort: function (a, b) {
                return b.id - a.id;
            }
        },
        {
            title: "docs",
            file_path: path.join(__dirname, "/..", "public", "jsond/docs.json"),
            array_name: "docs",
            elem_class: DocsElement
        },
        {
            title: "equip",
            file_path: path.join(__dirname, "/..", "public", "jsond/equip.json"),
            array_name: "equip",
            elem_class: EquipElement,
            sort: function (a, b) {
                return b.id - a.id;
            }
        },
        {
            title: "judges",
            file_path: path.join(__dirname, "/..", "public", "jsond/judges.json"),
            array_name: "judges",
            elem_class: JudgesElement
        },
        {
            title: "news",
            file_path: path.join(__dirname, "/..", "public", "jsond/news.json"),
            array_name: "news",
            elem_class: NewsElement,
            sort: function (a, b) {
                return b.id - a.id;
            }
        },
        {
            title: "photovideo",
            file_path: path.join(__dirname, "/..", "public", "jsond/photovideo.json"),
            array_name: "multimedia",
            sub_level_names: ["photo", "video"],
            elem_class: PhotoVideoElement,
            sort: function (a, b) {
                console.log(b.id - a.id);
                return b.id - a.id;
            }
        },
        {
            title: "protocols",
            file_path: path.join(__dirname, "/..", "public", "jsond/protocols.json"),
            array_name: "protocols",
            elem_class: ProtocolsElement,
            sort: function (a, b) {
                console.log(b.id - a.id);
                return b.id - a.id;
            }
        },
        {
            title: "ratingves",
            file_path: path.join(__dirname, "/..", "public", "jsond/ratingves.json"),
            array_name: "rating",
            elem_class: RatingvesElement
        },
        {
            title: "sportsman",
            file_path: path.join(__dirname, "/..", "public", "jsond/sportsman.json"),
            array_name: "sportsman",
            elem_class: SportsmanElement,
            sub_array: true,
        },
        {
            title: "direction",
            file_path: path.join(__dirname, "/..", "public", "jsond/direction.json"),
            array_name: "direction",
            elem_class: DirectionElement
        },
        {
            title: "docslist",
            file_path: path.join(__dirname, "/..", "public", "jsond/docslist.json"),
            array_name: "docslist",
            elem_class: DocslistElement
        },
        {
            title: "equipment",
            file_path: path.join(__dirname, "/..", "public", "jsond/equipment.json"),
            array_name: "equip_rent",
            sub_level_names: [
                "common",
                "bigGantel",
                "inchGantel",
                "commontwo",
                "atlasStone",
            ],
            elem_class: EquipmentElement,


        },
        {
            title: "partners",
            file_path: path.join(__dirname, "/..", "public", "jsond/partners.json"),
            array_name: "partners",
            elem_class: PartnersElement
        },
        {
            title: "rating",
            file_path: path.join(__dirname, "/..", "public", "jsond/rating.json"),
            array_name: "rating",
            elem_class: RatingElement
        }
    ],
    search_chapter: function (title) {
        var result = '';
        for (var i = 0; i < this.list.length; i++) {
            if (title === this.list[i].title) {
                result = this.list[i];
                break;
            }
        }
        return result;
    }
}


exports.read_file = function (chapter) {
    var file_path = table_of_contents.search_chapter(chapter).file_path;
    var file = JSON.parse(fs.readFileSync(file_path, 'utf8'));

    //
/*     var result = {
        file,
        file_sort,
        file_path,
        array_name,
        sub_level_names,
        sub_array
    }; */

    return file;
}

exports.edit_file = function (content_name, id) {
    //получили текущие данные контента
    var data = exports.read_file(content_name);

    //Нужен рефакторинг write_file. Первую часть вынести в отдельную функцию, для возможности повторного использования (проверка file_level & sub_level_names)
    parse_data(data);


    //ищем запись 


}


function last_id(array = []) {
    array.sort(compareNumbers);
    var last_id = array[array.length - 1].id;
    return (last_id);
}

/**
 * 
 * @param {String} content_name req.query.file query параметр file (ex: ?file=equipment) наименование контента
 * @param {String} file_level req.query.file_level query параметр file_level (ex: ?file_level=Москва) вложенный уровень контента. Например city в sportsman
 * @param {Object} new_content_elem экземпляр класса контента, простой объект
 * @returns Контент в JSON или ошибку
 */

exports.write_file = function (content_name, file_level, new_content_elem) {

    //получили текущие данные контента
    var data = exports.read_file(content_name);
    //найти контент в оглавлении
    var file_chapter = table_of_contents.search_chapter(content_name);

    //проверяем есть ли сортировка у контента:
    var file_sort = file_chapter.sort || 0;

    //определить путь к файлу из оглавления
    var file_path = file_chapter.file_path;

    //определить имя массива в файле
    var array_name = file_chapter.array_name;

    //проверяем есть ли у контента разделение
    var sub_level_names = file_chapter.sub_level_names || [];

    //проверяем разделены ли данные на 2 уровня массива
    var sub_array = file_chapter.sub_array;
    //если у контента есть разделение sub_level_names, то необходимо выбраить нужное
    if (sub_level_names.length > 0) {
        //считаем будущий новый id
        var new_id = last_id(data[array_name][file_level]) + 1;
    } else {

        //Если у контента данные разделены на 2 уровня массива то необходимо выбрать нужный уровень
        if (sub_array) {

            for (var i = 0; i < data[array_name].length; i++) {

                if (data[array_name][i].cityTitle === file_level) {
                    //считаем будущий новый id
                    var new_id = last_id(data[array_name][i].atlets) + 1;
                    var current_index = i;
                }
            }
        } else {
            //считаем будущий новый id
            var new_id = last_id(data[array_name]) + 1;
        }


    }

    //опеределяем класс контента
    var content_class = file_chapter.elem_class;

    //создаем экземпляр класса
    var content_element = new content_class(new_content_elem);

    //проверяем валидные ли данные были присланы 
    if (content_element.validate()) {
        //устанавливаем новый id
        content_element.set_id(new_id);

        //читаем нужный массив array_name в файле
        var file = JSON.parse(fs.readFileSync(file_path, 'utf8'));

        if (sub_level_names.length > 0) {
            //добавляем новые данные content_element в массив
            file[array_name][file_level].push(content_element);

            //сортируем по сортировкек файла или по-возрастанию 
            file[array_name][file_level].sort(file_sort || compareNumbers);
        } else {

            if (sub_array) {

                //добавляем новые данные content_element в массив
                file[array_name][current_index].atlets.push(content_element);
                //сортируем по сортировкек файла или по-возрастанию 
                file[array_name][current_index].atlets.sort(file_sort || compareNumbers);

            } else {
                //добавляем новые данные content_element в массив
                file[array_name].push(content_element);

                //сортируем по сортировкек файла или по-возрастанию 
                file[array_name].sort(file_sort || compareNumbers);
            }
        }

        //Перезаписываем файл
        fs.writeFileSync(file_path, JSON.stringify(file));

        return JSON.parse(fs.readFileSync(file_path, 'utf8'))
    } else {
        return data = { message: "Данные заполнены не полностью" };
    }

}

