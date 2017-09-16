// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Service = require('../models/service')
// create a schema
var ordreSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true,
    unique: true
  },
  services: [{
    type: Schema.Types.ObjectId,
    ref: 'Service'
  }]
});


ordreSchema.pre('validate', function(next){
  console.log(Math.random())
  this.number = '35' + Math.floor((Math.random() * 9999999999999) + 1);
  next();
});


// the schema is useless so far
// we need to create a model using it
var Order = mongoose.model('Order', ordreSchema);

// make this available to our users in our Node applications
module.exports = Order;