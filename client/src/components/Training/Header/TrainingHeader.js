  import React,{Component} from "react";
  import {NavLink} from 'react-router-dom';
  class TrainingHeader extends Component{
    render(){
      return(
        <div>
          <NavLink to="/training/add">add </NavLink>
          <NavLink to="/training/show">show </NavLink>
          <NavLink to="/training/session">session </NavLink>
        </div>
      )
    }
  }

  export default TrainingHeader;
