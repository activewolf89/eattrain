  import React,{Component} from "react";
  import Header from './Header/Header.js';
  import Footer from './Footer/Footer.js';
  import Home from './Body/Home/Home.js';
  //train
  import Train from './Body/Train/Train.js';
  import TrainingSession from './Body/Train/TrainingSession.js';
  //exercise
  import Exercise from './Body/Train/Exercise.js';
  import AddExercise from './Body/Train/AddExercise.js';
  //
  import Eat from './Body/Eat/Eat.js';
  import About from './Body/AboutWeb/About.js';
  import Technology from './Body/AboutWeb/Technology.js';
  import Login from './Body/LoginReg/Login.js';
  import Register from './Body/LoginReg/Registration.js';
  import {Route,Switch} from 'react-router-dom';

  class App extends Component{

    render(){
      return(
        <div className = "container" style={{background:"gray"}}>
          <div className = "header" >
            <Header />
          </div>
          <div className = "body" style={{height:"300px"}}>


            <Route exact path = "/train" component={Train} />
            <Route exact path = "/train/hangboard" component={TrainingSession} />
            <Route exact path = "/exercise" component={Exercise} />
            <Route exact path = "/exercise/add" component={AddExercise} />
            <Route exact path= "/eat" component={Eat} />
            <Route exact path= "/about" component={About} />
            <Route exact path= "/login" component={Login} />
            <Route exact path= "/register" component={Register} />
            <Route exact path="/technology" component={Technology} />
            <Route exact path = "/" component={Home} />

          </div>
          <div className = "footer" style={{height: "100px"}}>
            <Footer />
          </div>

        </div>
      )
    }
  }

  export default App;
