var HomeRoute = require('./../controller/HomeController.js')
var WorkRoute = require('./../controller/WorkoutController.js')
module.exports = function(app){
//all CRUD for workout
app.post('/train/add',(req,res)=>{
  WorkRoute.add(req,res);
})
app.post('/train/remove', (req,res)=>{
  WorkRoute.remove(req,res);
})
//
app.get('/train/show', (req,res)=>{
  WorkRoute.show(req,res);
})
app.post('/train/update',(req,res)=>{
  WorkRoute.update(req,res)
})
//
app.get('/train/session/:date',(req,res)=>{
  WorkRoute.get(req,res)
})
app.get('/show/weather',(req,res)=>{
  HomeRoute.getWeather(req,res)
})
app.get('/train/session/exercises/all',(req,res)=>{
  WorkRoute.getAllExercises(req,res)
})
}
