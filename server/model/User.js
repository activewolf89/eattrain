var mongoose = require('mongoose')
require('mongoose-type-email');

var UserRegSchema= new mongoose.Schema({
  Email: {
      type: mongoose.SchemaTypes.Email,
      required:true
    }
 },{timestamps: true});


 var User = mongoose.model('User', UserRegSchema);
