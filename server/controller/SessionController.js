var mongoose = require('mongoose')
var HangboardSession = mongoose.model('HangboardSession');

module.exports = {
  addHangboardSession: function(req,res){
    HangboardSession.create({Type: req.body.type, ArrayOfExercises: req.body.sessionArray},(err,session)=>{
      if(err){
        res.json(err);
      } else {
        res.json('success')
      }
    })
  },
  getHangBoardSession: function(req,res){
    if(req.params.sortFrom == "Most Recent Session"){
      HangboardSession.findOne({Type:req.params.type}).sort('-createdAt').exec(function(err, session) {
        res.json(session)
      });
    }
    if(req.params.sortFrom == "First Ever Session"){
      HangboardSession.findOne({Type:req.params.type}).sort('createdAt').exec(function(err, session) {
        res.json(session)
      });
    }
  }
}
