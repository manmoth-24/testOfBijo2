var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var accountInSession = req.session.accountID
  if (accountInSession == undefined){
    res.render('index', {
      accountName: 'ログインしてください。'
    });
  }else{
    res.render('index', {
      accountName: req.session.accountID
    });
  }
});

module.exports = router;
