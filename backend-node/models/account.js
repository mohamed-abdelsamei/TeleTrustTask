// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Service = require('../models/service')
// create a schema
var accountSchema = new Schema({
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


accountSchema.pre('validate', function(next){
  console.log(Math.random())
  this.number = '35' + Math.floor((Math.random() * 9999999999999) + 1);
  next();
});


// the schema is useless so far
// we need to create a model using it
var Account = mongoose.model('Account', accountSchema);

// make this available to our users in our Node applications
module.exports = Account;