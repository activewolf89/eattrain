var mongoose = require('mongoose');
Schema = mongoose.Schema;
var WeatherSchema= new mongoose.Schema({
  WeatherObject: {
      type: Object,
      trim: true,
    }
 },{timestamps: true});


 var Weather = mongoose.model('Weather', WeatherSchema);
