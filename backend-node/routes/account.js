var express = require('express');
var router = express.Router();
var Account = require('../models/account');
var Service = require('../models/service');

/* GET users listing. */
router.get('/getall', function (req, res, next) {
  var sp = req.query.search;
  Account.find({ "number" : {$regex : ".*"+sp+".*"}} ).populate('services').exec(function (err, accounts) {
    if (err) console.log(err);
    res.json({
      success: true,
      accounts: accounts
    });
  });
});

router.post('/addAccount', function (req, res, next) {
  var orderParams = {
    name: "mmmasss",
    services: ["59bb1fab3bf1de2a84570fae", "59bb1fc45efc152aa9144d3c"]
  };
  Account.create(orderParams, function (err, account) {
    if (err) console.log(err);
    res.json({
      success: true,
      account: account
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



router.post('/addservice', function (req, res, next) {
  console.log(req.params);
  console.log(req.body);
  var serviceParams = {
    name: "graphic design",
    price: 67
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