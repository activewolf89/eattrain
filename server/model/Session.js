var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SessionSchema = new mongoose.Schema({
  Exercises: [{type:Schema.Types.ObjectId, ref:'Exercise'}],
  Resistance: {
    type: Number,
    required:[true,'Resistence is required'],
  },
  Set: {
    type: Number
  }

},{timestamps:true})

var Session = mongoose.model('Session', SessionSchema);
