exports.select = function () {
    return {
        sportsman: "select * from sportsman;",
        judges: "select * from judges;",
        direction: "select * from direction",
        partners: "select * from partners",
        protocols: "select * from protocols",
        mediaboutus: "select * from mediaboutus",
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