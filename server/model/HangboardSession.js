var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var HangboardSessionSchema = new mongoose.Schema({
  Type: {
      type: String,
      required: [true, "Type is required"],
      minlength: [2, "Type has to be more than the min of 2 length"],
      maxlength:[20, "Type has to be less than a max length of 20"],
      trim: true,
    },
  ArrayOfExercises: {
    type: Array,
    required: [true,"Array is required"]
  }

},{timestamps:true})

var HangboardSession = mongoose.model('HangboardSession', HangboardSessionSchema);
