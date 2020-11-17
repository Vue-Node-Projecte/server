var express = require('express');
var router = express.Router();

router.use('/organizations',require('./organization'))
router.use('/user',require('./user'))

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
