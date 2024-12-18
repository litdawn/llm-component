
var express = require('express');
const {pool} = require("../mysql");
var router = express.Router();

// /* GET home page. */
//
// router.get('/', function (req, res) {
//   res.render('login');
//
// })
// router.get('/mainpage.html', function (req, res) {
//   res.render('mainpage');
// })
// router.get('/register.html', function (req, res) {
//   res.render('register')
// })
// router.get('/detail_picture_page/detail_picture_1.html', function (req, res) {
//   res.render('detail_picture_page/detail_picture_1.html');
// })
// router.get('/detail_picture_page/detail_picture_2.html', function (req, res) {
//   res.render('detail_picture_page/detail_picture_2.html');
// })
// router.get('/detail_picture_page/detail_picture_3.html', function (req, res) {
//   res.render('detail_picture_page/detail_picture_3.html');
// })
// router.get('/style_transfer.html', function (req, res) {
//   res.render('style_transfer');
// })

router.get('/list', function(req, res, next) {
//pool.query是数据库的连接池下面会说到
  pool.query('SELECT * FROM counter;', function (err, rows, fields) {
    if (err) throw err;
    console.log(rows)
    res.json(
      rows
    )

  })
});
router.post('/add', function(req, res, next) {
  console.log(req.body)
  //var mysqltl='INSERT INTO counter(id,counter, time) VALUES(\''+req.body.counter+'\','+'now()'+');'
  var mysqltl=`INSERT INTO counter(counter, time) VALUES('${req.body.counter}',now());`
  console.log(mysqltl)
  pool.query(mysqltl, function (err, rows, fields) {
    if (err) throw err;
    console.log(rows)
    res.json(
      rows
    )

  })
});

module.exports = router;