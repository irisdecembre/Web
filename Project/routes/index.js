var express = require('express');
var router = express.Router();
// var Mangas = require('../mongo'); 
var ctrlHome = require('../controllers/home'); 
var ctrlDetail = require('../controllers/detail'); 
var ctrlSearch = require('../controllers/search'); 
var ctrlChapter = require('../controllers/chapter'); 

/* GET home page. */
router.get('/', ctrlHome.homePage);

/* GET detail page */
router.get('/manga/:id', ctrlDetail.detail); 
router.post('/manga/:id', ctrlDetail.comment); 
router.get('/category', ctrlDetail.category); 

router.get('/search', ctrlSearch.searching); 
router.get('/category/:category', ctrlSearch.sorting); 

router.get('/manga/:id/chapter', ctrlChapter.chapter); 

module.exports = router;