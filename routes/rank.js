var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('mydb.db')

  if (req.session.accountID != undefined){
    db.serialize(() => {
      db.all("select * from mydata",(err, rows) => {
        rows.sort((a, b)=>{
          return b.eval - a.eval
        })
        if (!err) {
          res.render('rank', { 
            datas: rows
          });
        }
      })
    })
  }else{
    res.render('login', {
      messageForLogin: "「ランキング」の使用にはログインしてください。"
    })
  }
});

module.exports = router;
