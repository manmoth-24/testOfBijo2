const { json } = require('body-parser');
var express = require('express');
var router = express.Router();
const fs = require('fs')

var maxVoteCount = 10

const sqlite3 = require('sqlite3')

const db = new sqlite3.Database('mydb.db')

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.accountID != undefined){
    res.render('vote', {
      messageForVote: ''
    });
  }else{
    res.render('login', {
      messageForLogin: '「投票」の使用にはログインしてください。'
    });
  }
});

router.post('/post', function(req, res, next) {

  var votingForName = req.body['girlId']

  var updateQ = "UPDATE mydata SET eval = eval + 1 WHERE name = ?";
  var readQ = "select * from accountsData where account = ?"
  var updateVcQ = "UPDATE accountsData SET votingCount = ? WHERE account = ?"
  
  var accountName = req.session.accountID

  db.serialize(() => {
    db.get(readQ, [accountName], (err, account)=>{
      if (!err){
        console.log(account)
        var votingCount = account.votingCount
        if (votingCount >= maxVoteCount){
          res.render('vote', {
            messageForVote: '投票の上限（' + maxVoteCount + '回）に達したため、投票が不可です。'
          })
        }else{ 
          db.run(updateQ, [votingForName], (err)=>{
            if (err){
              console.error(err.message)
            }
          })
          if(votingCount == -1){
            res.render('vote', {
              messageForVote: votingForName + 'に投票しました。<br>' + 
              'スペシャルオプションです。'
            })
          }else{
            db.run(updateVcQ, votingCount + 1, accountName)
            res.render('vote', {
              messageForVote: votingForName + 'に投票しました。<br>' +
              '残り回数は ' + (maxVoteCount - votingCount - 1) + ' 回です'
            })
          }
        }
      }else{
        console.error(err.message)
      }
    })

    
  })
})
    

module.exports = router;
