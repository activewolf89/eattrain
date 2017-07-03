var axios = require('axios')
module.exports = {
  show: function(req,res){
    var test = axios.get("http://smashlounge.com/api/techs/all")
    .then((techData)=>{

      var zObject = {data: techData.data}
         res.send(zObject)
    })
    // res.json("hi")

  }
}
