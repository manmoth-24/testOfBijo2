var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3')

const db = new sqlite3.Database('mydb.db')

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.accountID != undefined){
    res.render('oubo', {
      resultOfOubo: ""
    });
  }else{
    res.render('login', {
      messageForLogin: "「応募」の使用にはログインしてください。"
    })
  }
});

router.post('/post', (req, res, next) => {
  var newObName = req.body['ouboName'];

  var q = 'insert into mydata (name, eval) values (?, ?)'
  db.run(q, [newObName, 0], (err) =>{
    if (err){
      console.error(err.message)
    }
  })

  res.render('oubo', {
    resultOfOubo: newObName + "を応募し、追加されました。"
  })
})



module.exports = router;
