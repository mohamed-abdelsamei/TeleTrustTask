var express = require('express');
var router = express.Router();
var Order = require('../models/order');
var Service = require('../models/service')
/* GET users listing. */
router.get('/getall', function (req, res, next) {
  Order.find().populate('services').exec(function (err, orders) {
    if (err) console.log(err)
    res.json({
      success: true,
      orders: orders
    });
  });
});

router.post('/addorder',function(req,res,next){
  var orderParams={
    name:"order2343343",
    services:["59bb1fab3bf1de2a84570fae","59bb1fc45efc152aa9144d3c"]
  }
  Order.create(orderParams,function(err,order){
    if (err) console.log(err)
    res.json({
      success: true,
      order: order
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