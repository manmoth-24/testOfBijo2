var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3')

var db = new sqlite3.Database('mydb.db')

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.accountID != undefined){
    res.render('search/index', { });
  }else{
    res.render('login', {
      messageForLogin: "「探す」の使用にはログインしてください。"
    })
  }
});

router.post('/result', (req, res, next)=>{
  var searchWord = req.body['search']

  if (searchWord.indexOf("=") == -1){
    searchWord = "name=" + '"' + searchWord + '"'
  }

  db.serialize(() => {
    var q = "select * from mydata where "
    db.all(q + searchWord, [], (err, rows)=>{
      if (!err){
        if (rows == ''){
          rows = [{id: "00", name: "データがありません",eval: "null"}]
        }
        res.render('search/result', {
          datas: rows
        })
      }else{
        console.error(err.message)
      }
    })
  })
})

module.exports = router;
