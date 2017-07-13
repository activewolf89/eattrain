var axios = require('axios');
var mongoose = require('mongoose')
var Weather = mongoose.model('Weather');
var moment = require('moment');
module.exports = {

  getWeather: function(req,res){
    var today = moment().startOf('day')
    var tomorrow = moment(today).add(1, 'days')


    Weather.findOne({createdAt:{
      "$gte": today.toDate(),
      "$lt": tomorrow.toDate()}
    },(err,weather)=>{

      if(!weather){

        axios.get(`http://api.wunderground.com/api/12c9529dc9d4ebbf/conditions/q/WA/Seattle.json`)
        .then((weatherData)=>{

          Weather.create({WeatherObject:weatherData.data},(error,status)=>{
            if(error){
              res.json(error)
            }
            if(status){

              res.json(status)
            }
          })
    })
  }
  if(weather){

    res.json(weather)
  }
})

  }

}
