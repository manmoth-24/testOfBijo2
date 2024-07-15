var express = require('express');
var router = express.Router();

var id = 'MA2024';
var idPass = '20240706'

router.get('/', (req, res, next) =>{
    res.send('ログインしてください。')
})

router.post('/', (req, res, next) =>{
  var account = req.body['accountID']
  var pass = req.body['accountPass']
  
  if (account == id && pass == idPass){
    req.session.accountID = account;
    res.render('loginResult', {
        title: 'ログインが完了しました。',
        message: 'ID:' + account + '<br>でログインしています。↑',
        linksA: '<a href="/">ホームに戻る</a>'
    });
    //セッションからアカウントIDに書き込む
  }else{
    res.render('loginResult', {
        title: 'ログインエラー',
        message: 'IDまたはパスワードが間違っています。<br>',
        linksA : '<a href="/login">ログインページに戻る</a>'
    })
  }
})

module.exports = router;
