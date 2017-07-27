var mongoose = require('mongoose')

var UserRegSchema= new mongoose.Schema({
  firstName: {
      type: String,
      required:true,
      trim:true
    },
    lastName: {
        type: String,
        required:true,
        trim:true
      },
    bodyWeight: {
        type: String,
        required:true,
        trim:true
      }

 },{timestamps: true});


 var User = mongoose.model('User', UserRegSchema);
