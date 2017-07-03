var HomeRoute = require('./../controller/HomeController.js')
var WorkRoute = require('./../controller/WorkoutController.js')
module.exports = function(app){
app.get('/home/api/show/tech',(req,res)=>{
  HomeRoute.show(req,res);
})
//all CRUD for workout
app.post('/training/add',(req,res)=>{
  WorkRoute.add(req,res);
})
app.post('/training/remove', (req,res)=>{
  WorkRoute.remove(req,res);
})
//
app.get('/training/show', (req,res)=>{
  WorkRoute.show(req,res);
})
app.post('/training/update',(req,res)=>{
  WorkRoute.update(req,res)
})

}
