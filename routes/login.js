var express = require('express');
var router = express.Router();

const sqlite3 = require("sqlite3")

var db = new sqlite3.Database("mydb.db")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login/index', {
    messageForLogin: ''
  });
});

router.get('/makeAccount', (req, res, next)=>{
  res.render('login/makeAccount', {

  })
})

router.post('/makeAccount', (req, res, next) =>{
  var accountName = req.body["name"]
  var accountNewPass = req.body["newPass"]

  var q = 'select * from accountsData where account="' + accountName + '"'
  var q2 = 'insert into accountsData (account, password, votingCount) values (?, ?, ?)'
  
  db.serialize(()=>{
    db.get(q, [], (err, rows) => {
      console.log(rows)
      if (!err){
        if (rows == undefined || rows == []){
          db.run(q2, accountName, accountNewPass, 0)
          req.session.accountID = accountName
          res.render("login/loginResult", {
            title: 'アカウントの作成が完了しました。',
            message: 'ID:' + accountName + '<br>でログインしています。↑',
            linksA: '<a href="/">ホームに戻る</a>'
          })
        }else{
          res.render("login/loginResult", {
            title: 'そのアカウントは既に存在します。',
            message: 'アカウント名を変えてください。',
            linksA: '<a href="./makeAccount">もう一度</a>'
          })
        }
      }else{
        console.error(err.message)
      }
        
    })
  })
})

module.exports = router;
