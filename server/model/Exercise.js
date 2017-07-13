var mongoose = require('mongoose');
Schema = mongoose.Schema;
var ExerciseSchema= new mongoose.Schema({
  Title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [2, "Title has to be more than the min of 2 length"],
      maxlength:[20, "Title has to be less than a max length of 20"],
      trim: true,
    },
    Description: {
        type: String,
        required: [true, "Description is required"],
        minlength: [2, "Description has to be more than the min of 2 length"],
        maxlength:[20, "Description has to be less than a max length of 20"],
        trim: true,
      },
    Category: {
        type: String,
        required: [true, "Category is required"],
        minlength: [2, "Category has to be more than the min of 2 length"],
        maxlength:[20, "Category has to be less than a max length of 20"],
        trim: true,
      }
 },{timestamps: true});


 var Exercise = mongoose.model('Exercise', ExerciseSchema);
