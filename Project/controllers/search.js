var MongoClient = require('mongodb').MongoClient; 
//var url = 'mongodb+srv://hoangnam:khongbiet@webproject.s6fki.mongodb.net/manga_web?retryWrites=true&w=majority'; 
var url = 'mongodb://localhost:27017/';
var dbName = 'manga_web';
// var ObjectId = require('mongodb').ObjectID;

const searching = (req, res) => {
    var mangaNew = [];
    var topMonth = [];
    var topWeek = [];
    var topDay = [];
    var mangaSearch = [];
    var allManga = [];
    var nameOfPage; 
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, database) {
        var manga_search = req.query.q.toLowerCase();
        var dbo = database.db(dbName);  
        dbo.collection('manga').find({}).toArray(function(err, result) {
            for (var i = 0; i < result.length; i++) {
                allManga.push(result.slice(i, i+1)); 
            }
        })
        dbo.collection('manga').find({}).toArray(function(err, result) {
            if (err) throw err; 
            for (var i = 0; i < result.length; i++) {
                var manga_name = result[i].name.toLowerCase(); 
                if (manga_name.indexOf(manga_search) !== -1) {
                    nameOfPage = result[i].name; 
                    mangaSearch.push(result.slice(i, i+1)); 
                }
                // else {
                //     res.send('<h1 style="text-align: center;">NOT FOUND</h1>');
                // }
            }
        })
        dbo.collection('manga').find({ isNew: true }).toArray(function (err, result) {
            for (var i = 0; i < result.length; i++) {
                mangaNew.push(result.slice(i, i + 1));
            }
        })  
        dbo.collection('manga').find({ topMonth: true }).toArray(function (err, result) {
            for (var i = 0; i < result.length; i++) {
                topMonth.push(result.slice(i, i + 1));
            }
        })  
        dbo.collection('manga').find({ topWeek: true }).toArray(function (err, result) {
            for (var i = 0; i < result.length; i++) {
                topWeek.push(result.slice(i, i + 1));
            }
        })  
        dbo.collection('manga').find({ topDay: true }).toArray(function (err, result) {
            for (var i = 0; i < result.length; i++) {
                topDay.push(result.slice(i, i + 1));
            }
            // console.log(mangaSearch); 
            res.render('detail', { title: nameOfPage + ' | Manga Webiste', allManga: allManga, mangaDetail: mangaSearch, mangaNew: mangaNew, topMonth: topMonth, topWeek: topWeek, topDay: topDay });
        })
    }); 
}

const sorting = (req, res) => {
    var nameOfPage; 
    var mangaSort = []; 
    var topMonth = [];
    var topWeek = [];
    var topDay = [];
    var allManga = [];
    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, database) {
        var dbo = database.db(dbName); 
        var category = req.params.category; 
        dbo.collection('manga').find({}).toArray(function(err, result) {
            for (var i = 0; i < result.length; i++) {
                allManga.push(result.slice(i, i+1)); 
            }
        })
        dbo.collection('manga').find({category: category}).toArray(function(err, result) {
            for (var i = 0; i < result.length; i++) {
                mangaSort.push(result.slice(i, i+1)); 
            }
        })
        dbo.collection('manga').find({ topMonth: true }).toArray(function (err, result) {
            for (var i = 0; i < result.length; i++) {
                topMonth.push(result.slice(i, i + 1));
            }
        })  
        dbo.collection('manga').find({ topWeek: true }).toArray(function (err, result) {
            for (var i = 0; i < result.length; i++) {
                topWeek.push(result.slice(i, i + 1));
            }
        })  
        dbo.collection('manga').find({ topDay: true }).toArray(function (err, result) {
            for (var i = 0; i < result.length; i++) {
                topDay.push(result.slice(i, i + 1));
            }
            // console.log(mangaSearch); 
            res.render('sort', { title: category, allManga: allManga, mangaSort: mangaSort, topMonth: topMonth, topWeek: topWeek, topDay: topDay });
        })
    })
}

module.exports = {
    searching,
    sorting
}