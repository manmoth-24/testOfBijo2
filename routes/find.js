var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('mydb.db')

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.accountID != undefined){
    db.serialize(() => {
      db.all("select * from mydata",(err, rows) => {
        if (!err) {
          res.render('find', { 
            datas: rows
          });
        }
      })
    })
  }else{
    res.render('login', {
      messageForLogin: "「見つける」の使用にはログインしてください。"
    })
  }
});

module.exports = router;
