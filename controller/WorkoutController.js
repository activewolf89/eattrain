var mongoose = require('mongoose')
var Exercise = mongoose.model('Exercise');
module.exports = {
  add: function(req,res){
    Exercise.create({Title:req.body.title,Description: req.body.description,Category:req.body.category},(err,exer)=>{
      if(err){
        res.json(err);
      } else {
        res.json(exer)
      }
    })
  },
  show: function(req,res){
    Exercise.find({},(err,exer)=>{
      if(err){
        res.json(err);
      }
      res.json(exer);
    })
  },
  update: function(req,res){

    Exercise.findOne({_id:req.body.id}, function(err,exercise){

      exercise.Title = req.body.title;
      exercise.Description = req.body.description;
      exercise.Category = req.body.category;
      exercise.save((err)=>{

      }).then(()=>{
        Exercise.find({},(err,exer)=>{
          res.json(exer)
        })
      })

    })
  },
  remove: function(req,res){

    Exercise.remove({_id:req.body.id},function(err){
      if(err){
        res.json(err);
      }
      res.json("Success")
    })
  }
}
