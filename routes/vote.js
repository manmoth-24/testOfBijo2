const { json } = require('body-parser');
var express = require('express');
var router = express.Router();
const fs = require('fs')


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
  
  var readQ = ""
  db.serialize(() => {
    /*
    var nowEval = 0
    db.get(readQ, [votingForName], (err, dFromName)=>{
      if (!err){
        if (dFromName != undefined){
          nowEval = dFromName.eval
        }
      }
    })
      */

    db.run(updateQ, [votingForName], (err)=>{
      if (err){
        console.error(err.message)
      }
    })

  })
    res.render('vote', {
      messageForVote: votingForName + 'に投票しました。'
    })
})

module.exports = router;
