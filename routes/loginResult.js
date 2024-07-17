var express = require('express');
var router = express.Router();

var id = 'MA2024';
var idPass = '20240706'

const sqlite3 = require("sqlite3")

var db = new sqlite3.Database("mydb.db")

router.get('/', (req, res, next) =>{
    res.send('ログインしてください。')
})

router.post('/', (req, res, next) =>{
  var account = req.body['accountID']
  var pass = req.body['accountPass']
  
  var q = 'select * from accountsData where account="' + account + '"'
  db.serialize(() =>{
    db.get(q, [], (err, rows) =>{
      if (!err){
        if (rows == undefined){
          res.render('login/loginResult', {
            title: 'ログインエラー',
            message: 'IDまたはパスワードが間違っています。<br>',
            linksA : '<a href="./login">ログインページに戻る</a>'
          })
        }else if(rows.password == pass){
          req.session.accountID = account;
          res.render('login/loginResult', {
              title: 'ログインが完了しました。',
              message: 'ID:' + account + '<br>でログインしています。↑',
              linksA: '<a href="/">ホームに戻る</a>'
          });
        }else{
          res.render('login/loginResult', {
            title: 'ログインエラー',
            message: 'IDまたはパスワードが間違っています。<br>',
            linksA : '<a href="./login">ログインページに戻る</a>'
          })
        }
      }else{
        console.error(err.message)
      }
    })
  })
})

module.exports = router;
