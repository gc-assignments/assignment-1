var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', shrink: false });
});

router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Services', shrink: true });
});

router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects', shrink: true });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About', shrink: true });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact', shrink: true });
});

router.post('/contact', function(req, res, next) {
  console.log(req.body);
  if (req.body.name && req.body.phone &&
      req.body.email && req.body.message)
    res.sendStatus(200);
  else
    res.sendStatus(500);
});

module.exports = router;
