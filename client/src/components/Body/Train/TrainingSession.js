  import React,{Component} from "react";
  import axios from 'axios';
  import TrainSet from './TrainSet';
  import {Button,Form,Row,Col,Grid} from 'react-bootstrap';

  class TrainingSession extends Component{
    constructor(props){
      super(props);
      this.state = {
        workOuts: [],
        numberOfExercises: 1
      }
      this.handleAddingGroupSet = this.handleAddingGroupSet.bind(this);
    }
    handleAddingGroupSet(){

      this.setState({numberOfExercises: this.state.numberOfExercises + 1})

    }
    componentDidMount(){
      axios.get("/train/show/").then((res)=>{
        this.setState({workOuts: res.data})
      })
    }

    render(){
      var numberOfExercises = Array(this.state.numberOfExercises).fill()
      numberOfExercises = numberOfExercises.map((test,index)=>{

        if(index != numberOfExercises.length -1){

        return <div key={index}>

          <TrainSet workOuts = {this.state.workOuts} number={index+1}/>

        </div>
      } else {

        return <div key={index}>


          <TrainSet  onPlusClick={this.handleAddingGroupSet} workOuts = {this.state.workOuts} number={index+1}/>




        </div>
      }
    })
      return(
        <form>
          {numberOfExercises}
        </form>
      )
    }
  }

  export default TrainingSession;
