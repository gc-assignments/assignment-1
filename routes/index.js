/**
 * Filename: routes/index.js
 * Author: Slevin Zhang
 * Website name: slevin.im
 * description: Express routes handling
 */
/* Dependencies */
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* Email Configs */
var mailConfigs = require('../configs/mail');
var transporter = nodemailer.createTransport(mailConfigs.smtp);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', shrink: false });
});

/* GET services page. */
router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Services', shrink: true });
});

/* GET projects page. */
router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects', shrink: true });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About', shrink: true });
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact', shrink: true });
});

function buildContactText(name) {
  var text = 'Hello, ' + name;
  text += '! I have received your message and will get back to you as soon as';
  text += ' possible. Have a nice day!';
  return text;
}

function buildContactHtml(name, message, phone) {
  var html = 'Hello ' + name + ',<br><br>' + 'Thank you for contacting me!<br>';
  html += '<br><strong>Your message: </strong>' + message + '<br>';
  html += '<strong>Your phone #: </strong>' + phone + '<br><br>';
  html += 'I will try to get back to you as soon as possible.<br><br>';
  html += 'Have a great day :)<br><br>Slevin Zhang';
  return html;
}

/* Post contact form and send emails. */
router.post('/contact', function(req, res, next) {
  if (req.body.name && req.body.phone && req.body.email && req.body.message) {
    var mailOptions = {
      from: mailConfigs.from,
      to: mailConfigs.myself + req.body.email,
      subject: 'Thank you for contacting Slevin, will get back to you ASAP',
      text: buildContactText(req.body.name),
      html: buildContactHtml(req.body.name, req.body.message, req.body.phone)
    };
    transporter.sendMail(mailOptions, function(error, info) {
      if (error)
        res.sendStatus(500);
      else
        res.sendStatus(200);
    });
  } else res.sendStatus(500); 
});

module.exports = router;
