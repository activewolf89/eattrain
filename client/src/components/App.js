  import React,{Component} from "react";
  import Home from './Home/Home.js';
  import Header from './Header/Header.js';
  import Training from './Training/Training.js';
  import {Route} from 'react-router-dom';


  class App extends Component{
    render(){
      return(
        <div className = "container">
          <Header />
          <Route exact path = "/" component={Home} />
          <Route path = "/training" component={Training} />

        </div>
      )
    }
  }

  export default App;
