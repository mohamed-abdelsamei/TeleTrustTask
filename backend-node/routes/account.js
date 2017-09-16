var express = require('express');
var router = express.Router();
var Account = require('../models/account');
var Service = require('../models/service');

/* GET users listing. */
router.get('/getall', function (req, res, next) {
  var sp = req.query.search || '';
  var resultsPerPage = 20; //req.query.resultsPerPage || 5;
  var page = req.query.page || 1;
  var accs = Account.find({
    "number": {
      $regex: ".*" + sp + ".*"
    }
  }).limit(parseInt(resultsPerPage)).skip(parseInt(page) * 20).populate('services').exec(function (err, accounts) {
    if (err) console.log(err);
    console.log(accounts.length);
    res.json({
      success: true,
      accounts: accounts
    });
  });
});




router.get('/getAccount/:id', function (req, res, next) {
  console.log(req.params)
  Account.findOne({
    _id: req.params.id
  }).populate('services').exec(function (err, account) {
    if (err) console.log(err);
    res.json({
      success: true,
      account: account
    });
  });
});

router.get('/getallservices', function (req, res, next) {
  Service.find(function (err, services) {
    if (err) console.log(err);
    res.json({
      success: true,
      services: services
    });
  });
});

router.post('/addaccount', function (req, res, next) {

  var accParams = {
    name: req.body.name,
    services: ["59bcad32ee099c4800ef55de","59bcad45ee099c4800ef55df","59bcad54ee099c4800ef55e0"]
  };
  Account.create(accParams, function (err, account) {
    if (err) console.log(err);
    res.json({
      success: true,
      account: account
    });
  });
});

router.post('/addservice', function (req, res, next) {
  var serviceParams = {
    name: req.body.name,
    price: req.body.price
  };
  Service.create(serviceParams, function (err, service) {
    if (err) console.log(err);
    console.log('service created');
    res.json({
      success: true,
      service: service
    });
  });

});


module.exports = router;